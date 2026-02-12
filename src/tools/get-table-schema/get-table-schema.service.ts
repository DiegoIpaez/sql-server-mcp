import { prisma } from '../../lib/db.js';
import type { GetTableSchemaInputDTO } from '../../schemas.js';

export const getTableSchema = async (args: GetTableSchemaInputDTO) => {
  const { tableName } = args;
  try {
    const schema = (await prisma.$queryRaw`
          SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME = ${tableName} AND TABLE_SCHEMA = 'dbo'
          ORDER BY ORDINAL_POSITION
        `) as Array<{
      COLUMN_NAME: string;
      DATA_TYPE: string;
      IS_NULLABLE: string;
      COLUMN_DEFAULT: string | null;
    }>;

    if (schema.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `La '${tableName}' no ha sido encontrada o no tiene columnas.`,
          },
        ],
        isError: true,
      };
    }

    const formattedSchema = schema.map((col) => ({
      name: col.COLUMN_NAME,
      type: col.DATA_TYPE,
      nullable: col.IS_NULLABLE === 'YES',
      default: col.COLUMN_DEFAULT,
    }));

    return {
      content: [
        {
          type: 'text' as const,
          text: `Esquema de la tabla '${tableName}':\n${JSON.stringify(formattedSchema, null, 2)}`,
        },
      ],
    };
  } catch (error) {
    const err = error as Error;
    return {
      content: [
        {
          type: 'text' as const,
          text: `Error al obtener el esquema de la tabla: ${err.message}`,
        },
      ],
      isError: true,
    };
  }
};
