import { z } from 'zod';

export type Tool = {
  name: string;
  title: string;
  description: string;
  inputSchema: z.ZodObject<any>;
  toolCallback: (...args: any[]) => any;
  error?: string;
};
