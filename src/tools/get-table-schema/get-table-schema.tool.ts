import { GetTableSchemaInputSchema } from '../../contracts/schemas/index.js';
import type { Tool } from '../../contracts/types/index.js';
import { getTableSchema } from './get-table-schema.service.js';

const GET_TABLE_SCHEMA_TOOL_COMMANDS = {
  NAME: 'get-table-schema',
  TITLE: 'Get Table Schema Tool',
  DESCRIPTION:
    'Esta herramienta obtiene la estructura de una tabla existente, incluyendo nombres de columnas y tipos de datos',
};

export const getTableSchemaTool: Tool = {
  name: GET_TABLE_SCHEMA_TOOL_COMMANDS.NAME,
  title: GET_TABLE_SCHEMA_TOOL_COMMANDS.TITLE,
  description: GET_TABLE_SCHEMA_TOOL_COMMANDS.DESCRIPTION,
  inputSchema: GetTableSchemaInputSchema,
  toolCallback: getTableSchema,
};
