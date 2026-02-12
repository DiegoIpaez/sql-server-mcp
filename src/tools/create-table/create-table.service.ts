import { prisma } from '../../lib/db';
import type { TableSchemaDTO } from '../../contracts/schemas';

async function generateTableSQL(
  tableName: string,
  fields: { nombre: string; tipo: string }[],
): Promise<string> {
  const fieldsSQL = fields
    .map((field) => `[${field.nombre}] ${field.tipo}`)
    .join(',\n  ');

  const sql = `CREATE TABLE [dbo].[${tableName}] (\n  ${fieldsSQL}\n);`;
  return sql;
}

export const generateTable = async ({ campos, nombre }: TableSchemaDTO) => {
  const sql = await generateTableSQL(nombre, campos);
  await prisma.$queryRawUnsafe(sql);
  return {
    content: [{ type: 'text' as const, text: 'Tabla creada exitosamente' }],
  };
};
