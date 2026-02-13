# SQL Server MCP PoC

This is a proof of concept (PoC) for a SQL Server backend using the Model Context Protocol (MCP).

## Prerequisites

- [Bun](https://bun.sh/) installed
- [Docker](https://www.docker.com/) installed
- [VS Code](https://code.visualstudio.com/) with the [Model Context Protocol Client extension](https://marketplace.visualstudio.com/items?itemName=modelcontextprotocol.client) installed

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/DiegoIpaez/sql-server-mcp
   cd sql-server-mcp
   ```

2. **Install dependencies:**

   ```
   bun install
   ```

3. **Copy and configure environment variables:**

   ```
   cp .env.example .env
   # Edit .env with your SQL Server credentials if needed
   ```

4. **Start SQL Server with Docker:**

   ```
   docker-compose up -d
   ```

5. **Generate Prisma client:**

   ```
   bun run prisma generate
   ```

## Running the MCP Server

Start the server in development mode:

```
bun run dev
```

Or, build and run:

```
bun run build
bun run start
```

## Scripts

En el archivo `package.json` se definen los siguientes scripts para automatizar tareas comunes del proyecto:

| Script         | Comando                                         | Descripción                                                                                 |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------- |
| dev            | bun run --watch ./src/index.ts                  | Inicia el servidor MCP en modo desarrollo con recarga automática al guardar cambios.         |
| build          | bun build ./src/index.ts --outdir ./build --minify --target node | Compila y minifica el código fuente TypeScript a JavaScript listo para producción.           |
| start          | bun run ./build/index.js                        | Ejecuta el servidor MCP compilado en modo producción.                                        |
| format         | biome format --write .                          | Formatea todo el código fuente del proyecto usando Biome.                                    |
| lint           | biome lint --write .                            | Aplica y corrige automáticamente los problemas de linting detectados por Biome.              |
| check          | biome check .                                   | Realiza un chequeo estático del código fuente usando Biome.                                  |
| postinstall    | prisma generate                                 | Genera el cliente Prisma automáticamente después de instalar dependencias.                   |
| test:mcp       | npx @modelcontextprotocol/inspector node ./build/index.js | Ejecuta el inspector MCP para pruebas sobre el servidor MCP compilado.                      |

Puedes ejecutar estos scripts con `bun run <script>` (por ejemplo, `bun run dev`).

## Tools Architecture

The `tools` folder is designed for modular and scalable integration of MCP tools for SQL Server operations. Each tool is organized in its own subdirectory, following this pattern:

- `<tool-name>.service.ts`: Business logic and database access.
- `<tool-name>.tool.ts`: MCP tool definition, registration, and input/output schema.

The `tools/index.ts` centralizes the registration of all available tools.

### Current Structure

```
tools/
   index.ts
   create-table/
      create-table.service.ts
      create-table.tool.ts
   execute-raw-queries/
      execute-raw-queries.service.ts
      execute-raw-queries.tool.ts
   get-table-schema/
      get-table-schema.service.ts
      get-table-schema.tool.ts
   insert-data/
      insert-data.service.ts
      insert-data.tool.ts
```

### Architectural Principles

- **Modularity:** Each tool is isolated in its own subdirectory for easy maintenance and extension.
- **Separation of concerns:** `.service.ts` handles data access logic, `.tool.ts` defines the MCP contract and integration.
- **Scalability:** New tools can be added by following the same folder and file pattern.
- **Centralization:** `tools/index.ts` registers and exposes all tools to the MCP server.

### Integration

Tools are registered and exposed via the MCP server, allowing clients (such as the VS Code extension) to interact with SQL Server through operations like create table, execute queries, get schema, and insert data.
