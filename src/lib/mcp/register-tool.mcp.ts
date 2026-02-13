import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { toolErrorHandler } from './error-handler.mcp';
import logger from '../logger.util';
import * as tools from '../../tools';

export const registerTools = (server: McpServer) => {
  for (const tool of Object.values(tools)) {
    const toolCb = async (args: z.infer<typeof tool.inputSchema>) => {
      logger.info(`Executing tool: ${tool.name}`);
      logger.info(`Input: ${JSON.stringify(args, null, 2)}`);

      try {
        const result = await tool.toolCallback(args);
        logger.info(`Output: ${JSON.stringify(result, null, 2)}`);
        logger.info(`Tool "${tool.name}" executed successfully.`);
        return result;
      } catch (error) {
        return toolErrorHandler({
          error: error as Error,
          fallbackMsg: tool.error,
        });
      }
    };

    const toolConfig = {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
    };
    server.registerTool(tool.name, toolConfig, toolCb);
    logger.info(`Tool "${tool.name}" loaded successfully.`);
  }
};
