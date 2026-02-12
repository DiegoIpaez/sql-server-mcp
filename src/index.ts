import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './lib/mcp/register-tool.mcp';

const server = new McpServer(
  { name: 'sql-server-mcp', version: '0.0.1' },
  { capabilities: { tools: {} } },
);

registerTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
console.log('[MCP] Server is ready and listening for requests.');
