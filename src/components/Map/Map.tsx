import { FC } from "react";

import { createControlComponent } from "@react-leaflet/core";
import L, { LatLngExpression } from "leaflet";
import "leaflet-routing-machine";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useSelector } from "react-redux";

import "./styles/map.css";

import { selectCurrentList } from "selectors/formList";
import { CurrentFormType } from "store/reducers/location";

const createRoutineMachineLayer = () => {
  // @ts-ignore
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(currentFormList.sending.locate as LatLngExpression),
      L.latLng(currentFormList.arrival.locate as LatLngExpression),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    // show: false,
    // addWaypoints: false,
    // routeWhileDragging: true,
    // draggableWaypoints: true,
    // fitSelectedRoutes: true,
    // showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export const Map: FC = () => {
  const currentFormList = useSelector(selectCurrentList);

  const polyline = [
    currentFormList.sending.locate as LatLngExpression,
    currentFormList.arrival.locate as LatLngExpression,
  ];

  return (
    <MapContainer className="map" center={[64.6863136, 97.7453061]} zoom={2}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* <Marker position={currentFormList.sending.locate as LatLngExpression}>
        <Popup>{currentFormList.sending.name}</Popup>
      </Marker>
      <Marker position={currentFormList.arrival.locate as LatLngExpression}>
        <Popup>{currentFormList.arrival.name}</Popup>
      </Marker> */}
      <RoutingMachine currentFormList={currentFormList} />
      {/* <Polyline positions={polyline} /> */}
    </MapContainer>
  );
};
