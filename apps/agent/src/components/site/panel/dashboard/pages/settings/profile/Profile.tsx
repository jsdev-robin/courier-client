'use client';

import { useUpdateProfileMutation } from '@/libs/features/services/auth/authApi';
import useUser from '@/store/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { Form } from '@repo/ui/components/form';
import Heading from '@repo/ui/components/heading';
import { Spinner } from '@repo/ui/components/spinner';
import Typography from '@repo/ui/components/typography';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { obj2Form } from '@repo/ui/utils/obj2Form';
import { authSchema } from '@repo/ui/validations/authSchema';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import ProfileHeaderCard from './particles/ProfileHeaderCard';
import ProfilePersonalInfoCard from './particles/ProfilePersonalInfoCard';

const Profile = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const user = useUser();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const form = useForm<z.infer<typeof authSchema.updateProfile>>({
    resolver: zodResolver(authSchema.updateProfile),
    mode: 'onChange',
    defaultValues: {
      img: undefined,
      personalInfo: {
        familyName: user?.personalInfo.familyName ?? '',
        givenName: user?.personalInfo.givenName ?? '',
        phone: user?.personalInfo.phone ?? '',
      },
    },
  });

  async function onSubmit(data: z.infer<typeof authSchema.updateProfile>) {
    await toast.promise(updateProfile(obj2Form(data)).unwrap(), {
      loading: 'Updating your profile...',
      success: (res) => {
        setIsEditing(false);
        form.reset();
        window.location.href = '/account/dashboard/overview';
        return res?.message || DEFAULT_SUCCESS_MESSAGE;
      },
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  }

  return (
    <section>
      <div className="wrapper">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <Heading as="h5">Profile Settings</Heading>
                  <Typography textColor="muted">
                    Manage your personal information and preferences
                  </Typography>
                </div>
                {isEditing && (
                  <div className="flex items-center gap-4">
                    <Button
                      variant="destructive"
                      disabled={isLoading}
                      type="button"
                      onClick={() => {
                        form.reset();
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                      {isLoading && <Spinner />}
                      Save
                    </Button>
                  </div>
                )}
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    type="button"
                  >
                    <Edit />
                    Edit
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                <ProfileHeaderCard form={form} isEditing={isEditing} />
                <ProfilePersonalInfoCard form={form} isEditing={isEditing} />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Profile;
