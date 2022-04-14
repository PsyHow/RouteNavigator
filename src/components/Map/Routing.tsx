import { FC, useEffect } from "react";

import L, { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";

import { selectCurrentList } from "selectors/formList";

export const Routing: FC = () => {
  const map = useMap();

  const currentFormList = useSelector(selectCurrentList);

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(currentFormList.sending.locate as LatLngExpression),
        L.latLng(currentFormList.arrival.locate as LatLngExpression),
      ],
      // @ts-ignore
      draggableWaypoints: false,
      addWaypoints: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [currentFormList]);

  return null;
};
