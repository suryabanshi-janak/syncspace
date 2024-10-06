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

interface EventProps {
  event: Event & { _count: { bookings: number } };
  username: string | null;
  isPublic?: boolean;
}

export default function Event({
  event,
  username,
  isPublic = false,
}: EventProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

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
        <p>
          {event?.description
            ? event.description.substring(0, event.description.indexOf('.'))
            : ''}
        </p>
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
          <Button variant='destructive'>
            <Trash2 className='mr-2 h-4 w-4' />
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
