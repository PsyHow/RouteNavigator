import { FC } from "react";

import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "./styles/map.css";
import "leaflet-routing-machine";
import { Routing } from "components/Map";

export const Map: FC = () => (
  <MapContainer className="map" center={[64.6863136, 97.7453061]} zoom={1}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Routing />
  </MapContainer>
);
