import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { QuerySchema } from '../../schemas.js';
import { executeRawQueries } from './execute-raw-queries.service.js';

const TOOL_COMMAND_NAME = 'execute-raw-queries';
const TOOL_COMMAND_TITLE = 'Execute Raw Queries Tool';
const TOOL_COMMAND_DESCRIPTION =
  'Esta herramienta permite ejecutar consultas SQL raw en la base de datos SQL Server, aceptando múltiples sentencias a la vez';

export function registerExecuteRawQueriesTool(server: McpServer) {
  const config = {
    title: TOOL_COMMAND_TITLE,
    description: TOOL_COMMAND_DESCRIPTION,
    inputSchema: QuerySchema,
  };

  server.registerTool(TOOL_COMMAND_NAME, config, executeRawQueries);
}
