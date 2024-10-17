import { getUserAvailability } from '@/actions/availability';
import AvailabilityForm from '@/components/forms/AvailabilityForm';
import { defaultAvailability } from './data';

export default async function AvailabilityPage() {
  const availability = await getUserAvailability();

  return <AvailabilityForm initialData={availability || defaultAvailability} />;
}
