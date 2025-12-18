'use client';

import { useCreateParcelMutation } from '@/libs/features/services/parcel/parcelApi';
import useUser from '@/store/useUser';
import { parcelSchema } from '@/validations/parcelSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import Heading from '@repo/ui/components/heading';
import { Input } from '@repo/ui/components/input';
import SelectInput from '@repo/ui/components/select-input';
import { Spinner } from '@repo/ui/components/spinner';
import { Textarea } from '@repo/ui/components/textarea';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import BookParcelWarning from './BookParcelWarning';
import CoordsMap from './particles/CoordsMap';

const BookParcel = () => {
  const [createParcel, { isLoading, isSuccess }] = useCreateParcelMutation();
  const user = useUser();
  const form = useForm<z.infer<typeof parcelSchema.create>>({
    resolver: zodResolver(parcelSchema.create),
    mode: 'onChange',
    defaultValues: {
      deliveryAddress: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        location: {
          coordinates: [],
        },
        contactName: '',
        contactPhone: '',
      },
      parcelDetails: {
        size: '',
        weight: '',
        category: '',
        description: '',
      },
      payment: {
        method: '',
        amount: '',
        codAmount: '',
      },
    },
  });

  async function onSubmit(data: z.infer<typeof parcelSchema.create>) {
    await toast.promise(createParcel(data).unwrap(), {
      loading: 'Creating product...',
      success: (res) => res.message || DEFAULT_SUCCESS_MESSAGE,
      error: (err) => err.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  }

  if (!user?.personalInfo?.address?.coordinates.length) {
    return <BookParcelWarning />;
  }

  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <Heading as="h4" className="text-center">
            Book a Parcel Pickup
          </Heading>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Delivery Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6 grid-cols-2">
                            <FormField
                              control={form.control}
                              name="deliveryAddress.contactName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="deliveryAddress.contactPhone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Phone</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="deliveryAddress.street"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Street</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="deliveryAddress.city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="deliveryAddress.state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="deliveryAddress.postalCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Postal Code</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Parcel Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="grid gap-6 grid-cols-2">
                              <FormField
                                control={form.control}
                                name="parcelDetails.size"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Parcel Size</FormLabel>
                                    <FormControl>
                                      <SelectInput
                                        {...field}
                                        options={[
                                          { value: 'Small', label: 'Small' },
                                          { value: 'Medium', label: 'Medium' },
                                          { value: 'Large', label: 'Large' },
                                        ]}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="parcelDetails.category"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Parcel Category</FormLabel>
                                    <FormControl>
                                      <SelectInput
                                        {...field}
                                        options={[
                                          {
                                            value: 'Document',
                                            label: 'Document',
                                          },
                                          {
                                            value: 'Electronics',
                                            label: 'Electronics',
                                          },
                                          {
                                            value: 'Clothes',
                                            label: 'Clothes',
                                          },
                                          { value: 'Food', label: 'Food' },
                                          { value: 'Others', label: 'Others' },
                                        ]}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name="parcelDetails.weight"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Parcel Weight</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="parcelDetails.description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Parcel Description</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Payment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="payment.method"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Payment Method</FormLabel>
                                  <FormControl>
                                    <SelectInput
                                      {...field}
                                      options={[
                                        { value: 'Prepaid', label: 'Prepaid' },
                                        {
                                          value: 'COD',
                                          label: 'Cash on Delivery',
                                        },
                                      ]}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="payment.amount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Amount</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="payment.codAmount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>COD Amount</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      <CoordsMap form={form} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Button disabled={isLoading} type="submit">
                    {isLoading && <Spinner />}
                    Schedule Pickup
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default BookParcel;
