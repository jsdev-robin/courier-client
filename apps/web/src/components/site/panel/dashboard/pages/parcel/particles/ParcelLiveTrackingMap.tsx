import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Map,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from '@repo/ui/components/map';

const ParcelLiveTrackingMap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Tracking Map</CardTitle>
      </CardHeader>
      <CardContent>
        <Map center={[43.6532, -79.3832]}>
          <MapTileLayer />
          <MapZoomControl />
          <MapMarker position={[43.6532, -79.3832]}>
            <MapPopup>A map component for shadcn/ui.</MapPopup>
          </MapMarker>
        </Map>
      </CardContent>
    </Card>
  );
};

export default ParcelLiveTrackingMap;
