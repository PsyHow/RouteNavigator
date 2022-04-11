import { FC } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import style from "./styles/map.module.scss";

export const Map: FC = () => (
  <MapContainer
    center={[52.28764395, 76.9501752]}
    zoom={13}
    className={style.map}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[52.28764395, 76.9501752]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    <Marker position={[52.29107, 76.94846519580838]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
);
