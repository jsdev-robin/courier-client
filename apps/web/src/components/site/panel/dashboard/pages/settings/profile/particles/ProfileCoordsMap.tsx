'use client';

import { usePlaceSearch } from '@/hooks/usePlaceSearch';
import MapAutoMove from '@/utils/MapAutoMove';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@repo/ui/components/input-group';
import {
  Map,
  MapLocateControl,
  MapMarker,
  MapTileLayer,
  MapZoomControl,
} from '@repo/ui/components/map';
import { Spinner } from '@repo/ui/components/spinner';
import { authSchema } from '@repo/ui/validations/authSchema';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import MapClick from '../../../../../../../../utils/MapClick';

interface ProfileCoordsMapProps {
  form: UseFormReturn<z.infer<typeof authSchema.updateProfile>>;
}

const ProfileCoordsMap: React.FC<ProfileCoordsMapProps> = ({ form }) => {
  const { query, setQuery, results, loading, selectPlace, containerRef } =
    usePlaceSearch(500);
  return (
    <FormField
      control={form.control}
      name="personalInfo.address.coordinates"
      render={({ field }) => (
        <FormItem>
          <FormLabel>📍 Delivery Location</FormLabel>
          <FormControl>
            <div className="relative">
              <Map center={[23.8617, 90.0003]} zoom={7} className="min-h-81">
                <MapTileLayer />
                <MapZoomControl />
                <MapLocateControl />
                {field.value.length && (
                  <MapMarker
                    position={[Number(field.value[0]), Number(field.value[1])]}
                  />
                )}
                <MapClick
                  onSelect={(lat, lng) => {
                    field.onChange([lat.toString(), lng.toString()]);
                  }}
                />
                {field.value.length && (
                  <MapAutoMove
                    lat={Number(field.value[0])}
                    lng={Number(field.value[1])}
                    zoom={14}
                  />
                )}
              </Map>
              <div className="absolute top-0 right-0 z-9999 p-2">
                <div ref={containerRef} className="w-60">
                  <InputGroup className="bg-background">
                    <InputGroupInput
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search place..."
                    />
                    {loading && (
                      <InputGroupAddon align="inline-end">
                        <Spinner />
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                  {results.length > 0 && (
                    <ul className="overflow-auto mt-1 bg-background rounded-md max-h-60 w-full">
                      {results.map((place, idx) => (
                        <li
                          key={idx}
                          className="p-2 text-xs cursor-pointer hover:bg-muted"
                          onClick={() => {
                            field.onChange([
                              place.lat.toString(),
                              place.lon.toString(),
                            ]);
                            selectPlace(place);
                          }}
                        >
                          {place.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProfileCoordsMap;
