'use client';

import useUser from '@/store/useUser';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Field, FieldGroup, FieldLabel } from '@repo/ui/components/field';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@repo/ui/components/input-group';
import { authSchema } from '@repo/ui/validations/authSchema';
import { Phone, User } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface ProfilePersonalInfoCardProps {
  form: UseFormReturn<z.infer<typeof authSchema.updateProfile>>;
  isEditing: boolean;
}

const ProfilePersonalInfoCard: React.FC<ProfilePersonalInfoCardProps> = ({
  form,
  isEditing,
}) => {
  const user = useUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Your basic personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="displayName">Display Name</FieldLabel>
            <InputGroup>
              <InputGroupInput
                value={user?.personalInfo.displayName}
                readOnly
                disabled
              />
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FormField
              control={form.control}
              name="personalInfo.familyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput {...field} disabled={!isEditing} />
                      <InputGroupAddon>
                        <User />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.givenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput {...field} disabled={!isEditing} />
                      <InputGroupAddon>
                        <User />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <FormField
              control={form.control}
              name="personalInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        type="number"
                        {...field}
                        disabled={!isEditing}
                      />
                      <InputGroupAddon>
                        <Phone />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <FormField
            control={form.control}
            name="personalInfo.address.street"
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
            name="personalInfo.address.city"
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
            name="personalInfo.address.state"
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
            name="personalInfo.address.postalCode"
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
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default ProfilePersonalInfoCard;
