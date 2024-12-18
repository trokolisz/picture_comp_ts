import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    start_date: z.string().min(3),
    end_date: z.string().min(3),
});

export default schema;

