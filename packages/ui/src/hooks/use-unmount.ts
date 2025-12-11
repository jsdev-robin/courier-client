/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLatest } from './use-latest';

export function useUnmount(fn: () => void) {
  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
}
