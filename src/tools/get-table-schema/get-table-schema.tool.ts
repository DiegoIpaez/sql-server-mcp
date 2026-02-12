import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GetTableSchemaInputSchema } from '../../schemas.js';
import { getTableSchema } from './get-table-schema.service.js';

const SCHEMA_TOOL_COMMAND_NAME = 'get-table-schema';
const SCHEMA_TOOL_COMMAND_TITLE = 'Get Table Schema Tool';
const SCHEMA_TOOL_COMMAND_DESCRIPTION =
  'Esta herramienta obtiene la estructura de una tabla existente, incluyendo nombres de columnas y tipos de datos';

export function registerGetTableSchemaTool(server: McpServer) {
  const config = {
    title: SCHEMA_TOOL_COMMAND_TITLE,
    description: SCHEMA_TOOL_COMMAND_DESCRIPTION,
    inputSchema: GetTableSchemaInputSchema,
  };
  server.registerTool(SCHEMA_TOOL_COMMAND_NAME, config, getTableSchema);
}
