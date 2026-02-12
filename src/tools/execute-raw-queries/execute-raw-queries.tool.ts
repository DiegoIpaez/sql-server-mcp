import { QuerySchema } from '../../contracts/schemas/index.js';
import type { Tool } from '../../contracts/types/index.js';
import { executeRawQueries } from './execute-raw-queries.service.js';

const EXECUTE_RAW_QUERIES_TOOL_COMMANDS = {
  NAME: 'execute-raw-queries',
  TITLE: 'Execute Raw Queries Tool',
  DESCRIPTION:
    'Esta herramienta permite ejecutar consultas SQL raw en la base de datos SQL Server, aceptando múltiples sentencias a la vez',
};

export const executeRawQueriesTool: Tool = {
  name: EXECUTE_RAW_QUERIES_TOOL_COMMANDS.NAME,
  title: EXECUTE_RAW_QUERIES_TOOL_COMMANDS.TITLE,
  description: EXECUTE_RAW_QUERIES_TOOL_COMMANDS.DESCRIPTION,
  inputSchema: QuerySchema,
  toolCallback: executeRawQueries,
  error:
    'Error al ejecutar las sentencias. Verifica que las consultas sean correctas.',
};
