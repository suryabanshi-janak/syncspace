import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PenBox } from 'lucide-react';

import { Button } from './ui/button';

async function Header() {
  return (
    <nav className='mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2'>
      <Link href='/' className='flex items-center'>
        <Image
          src='/logo.png'
          width={950}
          height={232}
          alt='Schedulrr Logo'
          className='h-9 w-auto'
        />
      </Link>

      <div className='flex items-center gap-4'>
        <Link href='/events?create=true'>
          <Button variant='default' className='flex items-center gap-2'>
            <PenBox size={18} />
            <span className='hidden sm:inline'>Create Event</span>
          </Button>
        </Link>
        <Button variant='outline'>Login</Button>
      </div>
    </nav>
  );
}

export default Header;
