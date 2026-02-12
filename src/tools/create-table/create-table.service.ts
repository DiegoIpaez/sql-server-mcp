import { prisma } from '../../lib/db';
import type { TableSchemaDTO } from '../../contracts/schemas';

async function generateTableSQL(
  tableName: string,
  fields: { nombre: string; tipo: string }[],
): Promise<string> {
  const fieldsSQL = fields.map((f) => `[${f.nombre}] ${f.tipo}`).join(',\n  ');

  const sql = `CREATE TABLE [dbo].[${tableName}] (\n  ${fieldsSQL}\n);`;
  return sql;
}

export const generateTable = async (args: TableSchemaDTO) => {
  const { campos, nombre } = args;
  try {
    const sql = await generateTableSQL(nombre, campos);
    await prisma.$queryRawUnsafe(sql);
    return {
      content: [{ type: 'text' as const, text: 'Tabla creada exitosamente' }],
    };
  } catch (error) {
    const err = error as Error;
    return {
      content: [
        {
          type: 'text' as const,
          text: `Error al crear la tabla: ${err.message}`,
        },
      ],
      isError: true,
    };
  }
};
