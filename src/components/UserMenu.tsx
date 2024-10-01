'use client';

import { UserButton } from '@clerk/nextjs';
import { ChartNoAxesGantt } from 'lucide-react';

export default function UserMenu() {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: 'size-9',
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          href='/events'
          label='My Events'
          labelIcon={<ChartNoAxesGantt className='size-4' />}
        />
        <UserButton.Action label='manageAccount' />
      </UserButton.MenuItems>
    </UserButton>
  );
}
