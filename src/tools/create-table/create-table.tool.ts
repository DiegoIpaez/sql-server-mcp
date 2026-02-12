import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { TableSchema } from '../../schemas.js';
import { generateTable } from './create-table.service.js';

const TOOL_COMMAND_NAME = 'create-table';
const TOOL_COMMAND_TITLE = 'Create Table Tool';
const TOOL_COMMAND_DESCRIPTION =
  'Esta es una herramienta para crear tablas en mi base de datos de SQL Server';

export function registerCreateTableTool(server: McpServer) {
  const config = {
    title: TOOL_COMMAND_TITLE,
    description: TOOL_COMMAND_DESCRIPTION,
    inputSchema: TableSchema,
  };

  server.registerTool(TOOL_COMMAND_NAME, config, generateTable);
}
