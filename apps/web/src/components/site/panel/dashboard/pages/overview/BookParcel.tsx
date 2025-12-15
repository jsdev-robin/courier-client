'use client';

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
import { Input } from '@repo/ui/components/input';
import SelectInput from '@repo/ui/components/select-input';
import { Textarea } from '@repo/ui/components/textarea';
import { useForm } from 'react-hook-form';
import z from 'zod';
import CoordsMap from './particles/CoordsMap';

const BookParcel = () => {
  const form = useForm<z.infer<typeof parcelSchema.create>>({
    resolver: zodResolver(parcelSchema.create),
    mode: 'onChange',
    defaultValues: {
      deliveryAddress: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        coordinates: [],
        contactName: '',
        contactPhone: '',
      },
      parcelDetails: {
        size: '',
        weight: '',
        type: '',
        description: '',
      },
      payment: {
        type: '',
        amount: '',
        codAmount: '',
        status: '',
      },
    },
  });

  async function onSubmit(data: z.infer<typeof parcelSchema.create>) {}

  return (
    <section>
      <div className="container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 grid-cols-3">
              <div className="col-span-2">
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
                            name="parcelDetails.type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Parcel Type</FormLabel>
                                <FormControl>
                                  <SelectInput
                                    {...field}
                                    options={[
                                      { value: 'Document', label: 'Document' },
                                      {
                                        value: 'Electronics',
                                        label: 'Electronics',
                                      },
                                      { value: 'Clothes', label: 'Clothes' },
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
              <div className="col-span-1">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="payment.type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Type</FormLabel>
                              <FormControl>
                                <SelectInput
                                  {...field}
                                  options={[
                                    { value: 'Prepaid', label: 'Prepaid' },
                                    { value: 'COD', label: 'Cash on Delivery' },
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
              <Button>Schedule Pickup</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default BookParcel;
