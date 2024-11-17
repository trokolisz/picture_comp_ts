import { z } from 'zod';

const schema = z.object({
    username: z.string().min(3),
    full_name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['admin' , 'judge' , 'competitor']).optional(),
});

export default schema;

