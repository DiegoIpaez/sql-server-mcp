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

## Using with VS Code MCP Client

1. Open VS Code and install the "Model Context Protocol Client" extension.
2. Connect the extension to this MCP server (usually via stdio or TCP, depending on your setup).
3. Use the extension to interact with your SQL Server through the registered tools (create table, insert data, get schema, execute raw queries).
