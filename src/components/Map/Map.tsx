import { FC } from "react";

import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

import style from "./styles/map.module.scss";

import { selectCurrentList } from "selectors/formList";

export const Map: FC = () => {
  const currentFormList = useSelector(selectCurrentList);

  console.log(currentFormList);

  return (
    <MapContainer
      center={[64.6863136, 97.7453061]}
      zoom={2}
      className={style.map}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={currentFormList.sending.locate as LatLngExpression}>
        <Popup>{currentFormList.sending.name}</Popup>
      </Marker>
      <Marker position={currentFormList.arrival.locate as LatLngExpression}>
        <Popup>{currentFormList.arrival.name}</Popup>
      </Marker>
    </MapContainer>
  );
};
