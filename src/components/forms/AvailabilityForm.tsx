'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { availabilitySchema } from '@/lib/validators';
import { Checkbox } from '../ui/checkbox';
import { timeSlots } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

type AvailabilityData = z.infer<typeof availabilitySchema>;

export default function AvailabilityForm({
  initialData,
}: {
  initialData: AvailabilityData;
}) {
  const form = useForm<AvailabilityData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  function onSubmit(values: AvailabilityData) {
    console.log('🚀 ~ onSubmit ~ values:', values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 px-8 pb-8'
      >
        {(
          [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
          ] as Weekday[]
        ).map((day) => {
          const isAvailable = form.watch(`${day}.isAvailable`);

          return (
            <div key={day} className='flex items-center space-x-4 mb-4'>
              <FormField
                control={form.control}
                name={`${day}.isAvailable`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        {...field}
                        value={undefined}
                        checked={field.value}
                        onCheckedChange={(checked: boolean) => {
                          form.setValue(`${day}.isAvailable`, checked);
                          if (!checked) {
                            form.setValue(`${day}.startTime`, '09:00');
                            form.setValue(`${day}.endTime`, '17:00');
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span className='w-24'>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>

              {isAvailable && (
                <>
                  <FormField
                    control={form.control}
                    name={`${day}.startTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className='w-32'>
                              <SelectValue placeholder='Start Time' />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span>to</span>
                  <FormField
                    control={form.control}
                    name={`${day}.endTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className='w-32'>
                              <SelectValue placeholder='End Time' />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          );
        })}

        <FormField
          control={form.control}
          name='timeGap'
          render={({ field }) => (
            <FormItem className='flex items-center gap-x-4'>
              <FormLabel>Minimum gap before booking (minutes):</FormLabel>
              <FormControl>
                <Input {...field} type='number' className='w-32' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Update Availability</Button>
      </form>
    </Form>
  );
}
