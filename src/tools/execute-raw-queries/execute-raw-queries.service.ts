import { prisma } from '../../lib/db.js';
import type { QuerySchemaDTO } from '../../schemas.js';

export const executeRawQueries = async ({ queries }: QuerySchemaDTO) => {
  try {
    const results = [];
    for (const query of queries) {
      if (query.trim()) {
        await prisma.$queryRawUnsafe(query);
        results.push(`Sentencia ejecutada: ${query}`);
      }
    }
    return {
      content: [{ type: 'text' as const, text: results.join('\n') }],
    };
  } catch (error) {
    const err = error as Error;
    return {
      content: [
        {
          type: 'text' as const,
          text: `Error al ejecutar las sentencias: ${err.message}`,
        },
      ],
      isError: true,
    };
  }
};
