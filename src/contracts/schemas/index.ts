import { z } from 'zod';

export const QuerySchema = z.object({
  queries: z.array(z.string()),
});
export type QuerySchemaDTO = z.infer<typeof QuerySchema>;

export const TableSchema = z.object({
  nombre: z.string(),
  campos: z.array(
    z.object({
      nombre: z.string(),
      tipo: z.string(),
    }),
  ),
});
export type TableSchemaDTO = z.infer<typeof TableSchema>;

export const GetTableSchemaInputSchema = z.object({
  tableName: z.string(),
});

export type GetTableSchemaInputDTO = z.infer<typeof GetTableSchemaInputSchema>;

export const InsertDataInputSchema = z.object({
  tableName: z.string(),
  data: z.array(z.record(z.string(), z.any())),
});

export type InsertDataInputDTO = z.infer<typeof InsertDataInputSchema>;
