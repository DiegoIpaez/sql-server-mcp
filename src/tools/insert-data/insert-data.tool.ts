import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { InsertDataInputSchema } from '../../schemas.js';
import { insertData } from './insert-data.service.js';

const TOOL_COMMAND_NAME = 'insert-data';
const TOOL_COMMAND_TITLE = 'Insert Data Tool';
const TOOL_COMMAND_DESCRIPTION =
  'Esta herramienta permite insertar datos en una tabla existente de la base de datos SQL Server';

export function registerInsertDataTool(server: McpServer) {
  const config = {
    title: TOOL_COMMAND_TITLE,
    description: TOOL_COMMAND_DESCRIPTION,
    inputSchema: InsertDataInputSchema,
  };
  server.registerTool(TOOL_COMMAND_NAME, config, insertData);
}
