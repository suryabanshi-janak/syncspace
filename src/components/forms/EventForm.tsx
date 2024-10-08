import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { eventSchema } from '@/lib/validators';
import { createEvent } from '@/actions/event';
import { useRouter } from 'next/navigation';

export default function EventForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: 30,
      isPrivate: true,
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      onClose();
      router.refresh();
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 px-8 pb-8'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='duration'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='isPrivate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Privacy</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === 'true')}
                  value={field.value ? 'true' : 'false'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select privacy' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='true'>Private</SelectItem>
                    <SelectItem value='false'>Public</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-x-4'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Submitting...' : 'Create Event'}
          </Button>
          <Button variant='outline' onClick={onClose} type='button'>
            Close
          </Button>
        </div>
      </form>
    </Form>
  );
}
