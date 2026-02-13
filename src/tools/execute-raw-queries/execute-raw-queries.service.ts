import { prisma } from '../../lib/db.js';
import type { QuerySchemaDTO } from '../../contracts/schemas/index.js';

export const executeRawQueries = async ({ queries }: QuerySchemaDTO) => {
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
};
