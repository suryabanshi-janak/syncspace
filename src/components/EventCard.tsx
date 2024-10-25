'use client';

import { type Event } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Link, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteEvent } from '@/actions/event';
import { useRouter } from 'next/navigation';

interface EventProps {
  event: Event & { _count: { bookings: number } };
  username: string | null;
  isPublic?: boolean;
}

export default function EventCard({
  event,
  username,
  isPublic = false,
}: EventProps) {
  const router = useRouter();

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      router.refresh();
    },
  });

  const onClick = () => {};

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };

  const onDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      mutate(event.id);
    }
  };

  return (
    <Card
      className='flex flex-col justify-between cursor-pointer'
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className='text-2xl'>{event.title}</CardTitle>
        <CardDescription className='flex justify-between'>
          <span>
            {event.duration} mins | {event.isPrivate ? 'Private' : 'Public'}
          </span>
          <span>{event._count.bookings} Bookings</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event?.description ? event.description : ''}</p>
      </CardContent>
      {!isPublic && (
        <CardFooter className='flex gap-2'>
          <Button
            variant='outline'
            onClick={onCopy}
            className='flex items-center'
          >
            <Link className='mr-2 h-4 w-4' />
            {isCopied ? 'Copied!' : 'Copy Link'}
          </Button>
          <Button variant='destructive' onClick={onDelete} disabled={isPending}>
            <Trash2 className='mr-2 h-4 w-4' />
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
