'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Map,
  MapLocateControl,
  MapMarker,
  MapTileLayer,
  MapTooltip,
  MapZoomControl,
} from '@repo/ui/components/map';
import { LatLngExpression } from 'leaflet';

const DeliveryMap = () => {
  const TORONTO_COORDINATES = [23.8103, 90.4125] satisfies LatLngExpression;
  const CITIES: { name: string; coordinates: LatLngExpression }[] = [
    {
      name: 'Dhaka',
      coordinates: [23.8103, 90.4125] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Motijheel',
      coordinates: [23.7341, 90.4172] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Dhanmondi',
      coordinates: [23.7465, 90.376] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Gulshan',
      coordinates: [23.7949, 90.4147] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Banani',
      coordinates: [23.7941, 90.4094] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Uttara',
      coordinates: [23.8759, 90.3795] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Mirpur',
      coordinates: [23.8223, 90.3654] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Mohammadpur',
      coordinates: [23.7642, 90.3589] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Farmgate',
      coordinates: [23.7596, 90.3885] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Tejgaon',
      coordinates: [23.7619, 90.4081] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Shahbagh',
      coordinates: [23.7393, 90.3952] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Ramna',
      coordinates: [23.7319, 90.4041] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - New Market',
      coordinates: [23.7295, 90.3994] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Bashundhara R/A',
      coordinates: [23.8138, 90.4241] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Baridhara',
      coordinates: [23.81, 90.426] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Niketon',
      coordinates: [23.7911, 90.4165] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Badda',
      coordinates: [23.7809, 90.4272] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Rampura',
      coordinates: [23.7634, 90.4229] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Malibagh',
      coordinates: [23.7572, 90.4257] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Moghbazar',
      coordinates: [23.7523, 90.4139] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Khilgaon',
      coordinates: [23.745, 90.4295] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Shantinagar',
      coordinates: [23.7373, 90.4127] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Kakrail',
      coordinates: [23.7359, 90.4103] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Paltan',
      coordinates: [23.7344, 90.4147] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Purana Paltan',
      coordinates: [23.7311, 90.414] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Bijoynagar',
      coordinates: [23.734, 90.41] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Segunbagicha',
      coordinates: [23.7325, 90.4088] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Topkhana Road',
      coordinates: [23.7234, 90.4105] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Banglamotor',
      coordinates: [23.7473, 90.3938] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Karwan Bazar',
      coordinates: [23.751, 90.3972] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Agargaon',
      coordinates: [23.7777, 90.374] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Sher-e-Bangla Nagar',
      coordinates: [23.7782, 90.3714] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Cantonment',
      coordinates: [23.8275, 90.4089] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Airport',
      coordinates: [23.8433, 90.3978] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Kuril',
      coordinates: [23.8154, 90.4302] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Natun Bazar',
      coordinates: [23.804, 90.4275] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Gulshan 1',
      coordinates: [23.7902, 90.412] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Gulshan 2',
      coordinates: [23.7955, 90.41] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Banani DOHS',
      coordinates: [23.798, 90.4035] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Mohakhali',
      coordinates: [23.7794, 90.4056] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Wireless Gate',
      coordinates: [23.7778, 90.4019] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Eskaton',
      coordinates: [23.7432, 90.4063] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Magbazar',
      coordinates: [23.746, 90.411] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Green Road',
      coordinates: [23.749, 90.385] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Science Lab',
      coordinates: [23.7358, 90.3865] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Asad Gate',
      coordinates: [23.761, 90.381] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Shyamoli',
      coordinates: [23.771, 90.3705] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Kallyanpur',
      coordinates: [23.7785, 90.365] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Pallabi',
      coordinates: [23.826, 90.362] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Mirpur 10',
      coordinates: [23.806, 90.368] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Mirpur 1',
      coordinates: [23.8285, 90.373] satisfies LatLngExpression,
    },
    {
      name: 'Dhaka - Section 2',
      coordinates: [23.815, 90.3725] satisfies LatLngExpression,
    },
    {
      name: 'Manikganj',
      coordinates: [23.8625, 90.0391] satisfies LatLngExpression,
    },
    {
      name: 'Narsingdi',
      coordinates: [23.9167, 90.7167] satisfies LatLngExpression,
    },
    {
      name: 'Gazipur',
      coordinates: [23.9996, 90.4203] satisfies LatLngExpression,
    },
    {
      name: 'Tangail',
      coordinates: [24.25, 89.9167] satisfies LatLngExpression,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Delivery Map</CardTitle>
        <CardDescription>247 active deliveries</CardDescription>
      </CardHeader>
      <CardContent>
        <Map center={TORONTO_COORDINATES} zoom={7}>
          <MapTileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapZoomControl className="top-auto right-1 bottom-1 left-auto" />
          <MapLocateControl className="top-1" />
          {CITIES.map((city) => (
            <MapMarker key={city.name} position={city.coordinates}>
              <MapTooltip side="bottom">Say hi to {city.name}!</MapTooltip>
            </MapMarker>
          ))}
        </Map>
      </CardContent>
    </Card>
  );
};

export default DeliveryMap;
