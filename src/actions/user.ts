'use server';

import { db } from '@/config/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function updateUserName(username: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const existingUser = await db.user.findUnique({
    where: { username },
  });

  if (existingUser && existingUser.clerkUserId !== userId) {
    throw new Error('Username already in use');
  }

  // update username in db
  await db.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  // update username in clerk
  await clerkClient.users.updateUser(userId, { username });

  return { sucess: true };
}
