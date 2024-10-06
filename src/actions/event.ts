'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { db } from '@/config/prisma';
import { eventSchema } from '@/lib/validators';

export async function createEvent(data: z.infer<typeof eventSchema>) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const validatedData = eventSchema.parse(data);

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const event = await db.event.create({
    data: {
      ...validatedData,
      userId: user.id,
    },
  });

  return event;
}
