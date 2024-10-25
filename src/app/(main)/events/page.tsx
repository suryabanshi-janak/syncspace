import { Suspense } from 'react';
import Event from '@/components/EventCard';
import { getUserEvents } from '@/actions/event';

export default async function EventsPage() {
  const { events, username } = await getUserEvents();

  if (events?.length === 0) {
    return <p>You haven&apos;t created any events yet.</p>;
  }

  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
        {events?.map((event) => (
          <Event key={event.id} event={event} username={username} />
        ))}
      </div>
    </Suspense>
  );
}
