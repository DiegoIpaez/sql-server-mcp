import { TableSchema } from '../../contracts/schemas/index.js';
import type { Tool } from '../../contracts/types/index.js';
import { generateTable } from './create-table.service.js';

const CREATE_TABLE_TOOL_COMMANDS = {
  NAME: 'create-table',
  TITLE: 'Create Table Tool',
  DESCRIPTION:
    'Esta es una herramienta para crear tablas en mi base de datos de SQL Server',
};

export const createTableTool: Tool = {
  name: CREATE_TABLE_TOOL_COMMANDS.NAME,
  title: CREATE_TABLE_TOOL_COMMANDS.TITLE,
  description: CREATE_TABLE_TOOL_COMMANDS.DESCRIPTION,
  inputSchema: TableSchema,
  toolCallback: generateTable,
};
