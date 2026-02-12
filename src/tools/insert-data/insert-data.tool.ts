import { InsertDataInputSchema } from '../../contracts/schemas/index.js';
import type { Tool } from '../../contracts/types/index.js';
import { insertData } from './insert-data.service.js';

const INSERT_DATA_TOOL_COMMANDS = {
  NAME: 'insert-data',
  TITLE: 'Insert Data Tool',
  DESCRIPTION:
    'Esta herramienta permite insertar datos en una tabla existente de la base de datos SQL Server',
};

export const insertDataTool: Tool = {
  name: INSERT_DATA_TOOL_COMMANDS.NAME,
  title: INSERT_DATA_TOOL_COMMANDS.TITLE,
  description: INSERT_DATA_TOOL_COMMANDS.DESCRIPTION,
  inputSchema: InsertDataInputSchema,
  toolCallback: insertData,
};
