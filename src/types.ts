import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  interlocutorIDs: z.string().array(), // IDs of interlocutors
  directMessageIDs: z.string().array(), // IDs of direct messages
});

type User = z.infer<typeof UserSchema>;

export type { User };
export { UserSchema };
