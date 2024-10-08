'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import EventForm from './forms/EventForm';

export default function CreateEventDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createEvent = searchParams.get('create');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (createEvent === 'true') setIsOpen(true);
  }, [createEvent]);

  const onClose = () => {
    setIsOpen(false);
    if (createEvent === 'true') router.replace(pathname);
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DrawerHeader>
          <DrawerTitle>Create New Event</DrawerTitle>
        </DrawerHeader>
        <EventForm onClose={onClose} />
      </DrawerContent>
    </Drawer>
  );
}
