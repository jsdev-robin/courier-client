'use client';

import { useEffect, useRef, useState } from 'react';

interface UseRealTimeLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface UseRealTimeLocationReturn {
  location: Location | null;
  speed: number | null;
  error: string | null;
  isLoading: boolean;
}

export const useRealTimeLocation = (
  options: UseRealTimeLocationOptions = {},
): UseRealTimeLocationReturn => {
  const [location, setLocation] = useState<Location | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const watchId = useRef<number | null>(null);
  const prevPosition = useRef<GeolocationCoordinates | null>(null);
  const prevTimestamp = useRef<number | null>(null);

  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 30000,
  } = options;

  const calculateSpeedKmh = (
    prev: GeolocationCoordinates,
    current: GeolocationCoordinates,
    timeDiffMs: number,
  ) => {
    const R = 6371000;
    const toRad = (deg: number) => deg * (Math.PI / 180);

    const dLat = toRad(current.latitude - prev.latitude);
    const dLon = toRad(current.longitude - prev.longitude);

    const lat1 = toRad(prev.latitude);
    const lat2 = toRad(current.latitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceMeters = R * c;
    const speedMps = distanceMeters / (timeDiffMs / 1000);
    return speedMps * 3.6;
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      let currentSpeed = null;
      if (prevPosition.current && prevTimestamp.current) {
        const timeDiff = position.timestamp - prevTimestamp.current;
        currentSpeed = calculateSpeedKmh(
          prevPosition.current,
          position.coords,
          timeDiff,
        );
      }

      prevPosition.current = position.coords;
      prevTimestamp.current = position.timestamp;

      setLocation({ latitude, longitude });
      setSpeed(currentSpeed);
      setError(null);
      setIsLoading(false);
    };

    const onError = (err: GeolocationPositionError) => {
      let errorMessage = 'Unable to retrieve your location';
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = 'Location access denied by user';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable';
          break;
        case err.TIMEOUT:
          errorMessage = 'Location request timed out';
          break;
        default:
          errorMessage = `Unknown error: ${err.message}`;
      }
      setError(errorMessage);
      setIsLoading(false);
    };

    watchId.current = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    });

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [enableHighAccuracy, timeout, maximumAge]);

  return { location, speed, error, isLoading };
};
