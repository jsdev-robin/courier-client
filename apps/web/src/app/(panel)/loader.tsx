'use client';

import { userAuthApi } from '@/libs/features/services/auth/authApi';
import React from 'react';
import Loading from '../loading';

const Loader = ({ children }: { children: React.ReactNode }) => {
  const profile = userAuthApi.endpoints.getProfile.useQuery();

  if (profile.isError) {
    window.location.href = '/sign-in';
    return null;
  }

  return profile.isLoading ? <Loading /> : children;
};

export default Loader;
