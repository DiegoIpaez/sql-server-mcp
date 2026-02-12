import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  registerCreateTableTool,
  registerExecuteRawQueriesTool,
  registerGetTableSchemaTool,
  registerInsertDataTool,
} from './tools';

const server = new McpServer(
  { name: 'sql-server-mcp', version: '0.0.1' },
  { capabilities: { tools: {} } },
);

registerCreateTableTool(server);
registerInsertDataTool(server);
registerGetTableSchemaTool(server);
registerExecuteRawQueriesTool(server);

const transport = new StdioServerTransport();
await server.connect(transport);
