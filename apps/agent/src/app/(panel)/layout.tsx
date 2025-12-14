'use client';

import React from 'react';
import { LocationProvider } from '../../contexts/LocationContext';
import Loader from './loader';

const AdminPanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Loader>
      <LocationProvider>{children}</LocationProvider>
    </Loader>
  );
};

export default AdminPanelLayout;
