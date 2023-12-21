import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Divider, Drawer, Image } from "antd";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "./Map.css";
mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_API_KEY;

const Map = () => {
  const location = useLocation();
  const { coordinates, selectedMonumentsData } = location.state || {};

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const titleStyle = {
    color: "#1677ff",
    fontSize: 20,
    fontWeight: 600,
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addMarkers = (map, coordinates, colors) => {
    coordinates.forEach((coord, index) => {
      const color = colors[index] || "#58b4e3"; // Use the provided color or a default one
      const existingMarker = map.getLayer(`marker-${index}`);
      if (!existingMarker) {
        new mapboxgl.Marker({ color })
          .setLngLat([coord.longitude, coord.latitude])
          .addTo(map)
          .setPopup(new mapboxgl.Popup().setHTML(`<p>Marker ${index + 1}</p>`));
      }
    });
  };

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: import.meta.env.VITE_MAPBOX_STYLES_PATH,
        center: [2.3522, 48.8566],
        zoom: 12,
      });

      map.current.on("move", () => {});

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: "mapbox/walking",
      });

      map.current.addControl(directions, "top-left");

      if (coordinates && coordinates.length >= 2) {
        const markerColors = Array.from({ length: coordinates.length }, () =>
          generateRandomColor()
        );
        addMarkers(map.current, coordinates, markerColors);

        const origin = [coordinates[0].longitude, coordinates[0].latitude];
        const waypoints = coordinates
          .slice(1, -1)
          .map((coord) => [coord.longitude, coord.latitude]);

        const destination = [
          coordinates[coordinates.length - 1].longitude,
          coordinates[coordinates.length - 1].latitude,
        ];

        directions.setOrigin(origin);
        waypoints.forEach((waypoint, index) => {
          directions.addWaypoint(index, waypoint);
        });
        directions.setDestination(destination);
      }

      return () => {
        map.current.remove();
      };
    }
  }, [coordinates]);

  return (
    <div>
      <div className="BottomLeftButton" onClick={showDrawer}>
        <Button>Click to view Informations</Button>
      </div>
      <div className="MonumentsDrawer">
        <Drawer title="Your Monuments Order" placement="right" onClose={onClose} open={open}>
          <div>
            {coordinates.map((monument, index) => {
              const currentMonumentData = selectedMonumentsData[index] || {};
              const {
                name: { fr: name = "N/A" } = {},
                description: { fr: description = "N/A" } = {},
                creationDate: creationdate,
                category: image = "",
              } = currentMonumentData;

              const imageName = `${image.toLowerCase()}.jpg`;
              const imagePath = import.meta.env.VITE_IMAGES_PATH + imageName;
              const dateFormat = import.meta.env.REACT_APP_DATE_FORMAT || {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              // Function to handle special case for "19th century"
              const formatSpecialDate = (date) => {
                if (date.toLowerCase().includes("century")) {
                  return date;
                } else {
                  return Intl.DateTimeFormat("fr-FR", dateFormat).format(new Date(date));
                }
              };
              return (
                <div key={index} >
                  <Divider style={titleStyle} >{name}</Divider>
                  <Image
                    className="description-image"
                    wrapperClassName="description-image-w"
                    width={300}
                    src={imagePath}
                  />
                  <h1 className="date-creation">
                    {" "}
                    Date de Création :{" "}
                    {formatSpecialDate(creationdate)}
                  </h1>
                  <p className="monument-description">{description}</p>
                </div>
              );
            })}
          </div>
        </Drawer>
      </div>
      <div ref={mapContainer} data-testid="map-element" className="map-container" />
    </div>
  );
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

AnyReactComponent.propTypes = {
  text: PropTypes.any,
};

export { Map };
