import React from 'react';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { authSchema } from '@repo/ui/validations/authSchema';
import { Card, CardContent } from '@repo/ui/components/card';
import useUser from '@/store/useUser';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import { Camera, Globe, Mail, Phone, X } from 'lucide-react';
import { useMuntahaDrop } from 'react-muntaha-uploader';
import { FormField, FormItem, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import Image from 'next/image';
import Heading from '@repo/ui/components/heading';
import { Badge } from '@repo/ui/components/badge';
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from '@repo/ui/components/item';

interface ProfileHeaderCardProps {
  form: UseFormReturn<z.infer<typeof authSchema.updateProfile>>;
  isEditing: boolean;
}

const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  form,
  isEditing,
}) => {
  const user = useUser();
  const { getRootProps, getInputProps, onDelete, error } = useMuntahaDrop({
    accept: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'image/avif',
      'image/heic',
    ],
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop: (file: File | null) => {
      if (file) {
        form.setValue('img', file);
      }
    },
  });

  const imgFile = form.watch('img');

  return (
    <div>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <FormField
                control={form.control}
                name="img"
                render={() => (
                  <FormItem>
                    <div className="flex items-start">
                      <div className="relative shrink-0">
                        <div className="rounded-full ring-3 ring-primary ring-offset-0 p-1">
                          {imgFile ? (
                            <>
                              <Image
                                src={URL.createObjectURL(imgFile)}
                                alt="Profile image"
                                width={160}
                                height={160}
                                className="h-30 w-30 rounded-full object-cover"
                                priority
                              />
                              <Button
                                onClick={() => {
                                  onDelete();
                                  form.setValue('img', undefined, {
                                    shouldValidate: true,
                                  });
                                }}
                                size="icon"
                                variant="destructive"
                                className="absolute top-1 right-2 size-6 rounded-full"
                                type="button"
                              >
                                <X />
                              </Button>
                            </>
                          ) : (
                            <Avatar className="h-30 w-30">
                              <AvatarImage
                                src={user?.personalInfo.avatar?.url}
                                alt={user?.personalInfo.displayName}
                                className="object-cover"
                              />
                              <AvatarFallback>
                                {user?.personalInfo.displayName.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>

                        {isEditing && (
                          <>
                            <Button
                              size="icon"
                              className="absolute rounded-full bottom-0 right-0"
                              onClick={() => getRootProps().onClick()}
                              type="button"
                            >
                              <Camera />
                            </Button>
                            <Input {...getInputProps()} />
                          </>
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2 self-start lg:self-end">
                <Heading as="h3">{user?.personalInfo.displayName}</Heading>
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge>
                    <Mail />
                    {user?.personalInfo.email}
                  </Badge>
                  {user?.personalInfo.phone && (
                    <Badge>
                      <Phone />
                      {user?.personalInfo?.phone}
                    </Badge>
                  )}
                  {user?.personalInfo.address && (
                    <Badge>
                      <Globe />
                      {user?.personalInfo?.address}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <ItemGroup>
              {error && (
                <Item
                  variant="outline"
                  className="bg-destructive text-destructive"
                >
                  <ItemContent>
                    <ItemTitle>{error}</ItemTitle>
                  </ItemContent>
                </Item>
              )}
              {isEditing && (
                <Item
                  variant="outline"
                  className="bg-yellow-500/5 text-yellow-500"
                >
                  <ItemContent>
                    <ItemTitle>
                      Must be a .jpg, .gif or .png file smaller than 10 MB and
                      at least 400px by 400px.
                    </ItemTitle>
                  </ItemContent>
                </Item>
              )}
            </ItemGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileHeaderCard;
