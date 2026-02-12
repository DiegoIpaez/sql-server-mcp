import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as tools from '../../tools';

export const registerTools = (server: McpServer) => {
  for (const tool of Object.values(tools)) {
    const toolCb = async (args: any) => {
      console.log(`\n[MCP] Executing tool: ${tool.name}`);
      console.log('[MCP] Input:', JSON.stringify(args, null, 2));

      try {
        const result = await tool.toolCallback(args);

        console.log('[MCP] Output:', JSON.stringify(result, null, 2));
        console.log(`[MCP] Tool "${tool.name}" executed successfully.\n`);

        return result;
      } catch (error) {
        console.error(`[MCP] Tool "${tool.name}" failed:`, error);
        throw error;
      }
    };

    const config = {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
    };
    server.registerTool(tool.name, config, toolCb);
    console.log(`[MCP] Tool "${tool.name}" loaded successfully.`);
  }
};
