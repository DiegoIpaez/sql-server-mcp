import { prisma } from '../../lib/db.js';
import type { InsertDataInputDTO } from '../../contracts/schemas/index.js';

export const insertData = async (args: InsertDataInputDTO) => {
  const { tableName, data } = args;
  if (data.length === 0) {
    return {
      content: [{ type: 'text' as const, text: 'No hay datos para procesar' }],
    };
  }

  const columns = Object.keys(data[0]!);
  if (columns.length === 0) {
    return {
      content: [
        {
          type: 'text' as const,
          text: 'No se encontraron columnas en la informacion proporcionada',
        },
      ],
    };
  }

  const columnList = columns.map((col) => `[${col}]`).join(', ');
  const valuePlaceholders = data
    .map(
      (_, rowIndex) =>
        `(${columns.map((_, colIndex) => `@P${rowIndex * columns.length + colIndex + 1}`).join(', ')})`,
    )
    .join(', ');

  const sql = `INSERT INTO [dbo].[${tableName}] (${columnList}) VALUES ${valuePlaceholders}`;

  const values = data.flatMap((row) => columns.map((col) => row[col]));

  await prisma.$queryRawUnsafe(sql, ...values);

  return {
    content: [
      {
        type: 'text' as const,
        text: `${tableName}: ${data.length} filas insertadas.`,
      },
    ],
  };
};
