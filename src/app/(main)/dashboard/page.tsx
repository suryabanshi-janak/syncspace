'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { BarLoader } from 'react-spinners';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usernameSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateUserName } from '@/actions/user';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  const form = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  });

  useEffect(() => {
    form.setValue('username', user?.username ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserName,
  });

  function onSubmit(values: z.infer<typeof usernameSchema>) {
    mutate(values.username);
  }

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}!</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex items-center gap-2'>
                        <span>
                          {process.env.NEXT_PUBLIC_APP_URL ||
                            window?.location.origin}
                          /
                        </span>
                        <Input placeholder='username' {...field} />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {isPending && (
                <BarLoader className='mb-4' width='100%' color='#36d7b7' />
              )}
              <Button type='submit' disabled={isPending}>
                Update Username
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
