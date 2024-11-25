import { z } from 'zod';

const schema = z.object({
  description: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  scores: z.record(z.number()),
  timestamp: z.string().optional(),
  title: z.string().min(1),
  name: z.string().min(1),
  uploaded_by: z.string().min(1),
  url: z.string().url(),
});

export default schema;
