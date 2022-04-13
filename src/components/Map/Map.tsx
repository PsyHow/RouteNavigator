import { FC } from "react";

import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

import style from "./styles/map.module.scss";

import { CurrentFormType, LocationType } from "store/reducers/location";
import { AppRootStoreType } from "store/store";

export const Map: FC = () => {
  const sending = useSelector<AppRootStoreType, LocationType>(
    (state) => state.locationReducer.sending
  );
  const arrival = useSelector<AppRootStoreType, LocationType>(
    (state) => state.locationReducer.arrival
  );

  const currentForm = useSelector<AppRootStoreType, CurrentFormType>(
    (state) => state.locationReducer.currentForm
  );

  console.log(currentForm);

  return (
    <MapContainer
      center={[64.6863136, 97.7453061]}
      zoom={2}
      className={style.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={
          currentForm.arrival.locate.length > 0
            ? (currentForm.arrival.locate as LatLngExpression)
            : (sending.locate as LatLngExpression)
        }
      >
        <Popup>{sending.name}</Popup>
      </Marker>
      <Marker
        position={
          currentForm.sending.locate.length > 0
            ? (currentForm.sending.locate as LatLngExpression)
            : (sending.locate as LatLngExpression)
        }
      >
        <Popup>{currentForm.sending.name}</Popup>
      </Marker>
    </MapContainer>
  );
};
