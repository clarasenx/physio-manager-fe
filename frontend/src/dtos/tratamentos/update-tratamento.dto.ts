import { z } from 'zod';
import { CreateTratamentoSchema } from './create-tratamento.dto';

export const UpdateTratamentoSchema = CreateTratamentoSchema.partial();

export type UpdateTratamentoType = z.infer<typeof UpdateTratamentoSchema>;

