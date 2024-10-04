import { db } from '@/config/prisma';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

export const syncUser = async () => {
  const user = await currentUser();

  if (!user) return;

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    if (loggedInUser) return;

    const name = `${user.firstName} ${user.lastName}`;
    const username = name.split(' ').join('-') + user.id.slice(-4);

    await clerkClient().users.updateUser(user.id, {
      username,
    });

    await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        username,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
