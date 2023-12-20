import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Drawer } from "antd";
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
    color: "#75BF7A",
    fontSize: 20,
    fontWeight: 600,
  };

  const descriptionStyle = {
    fontStyle: "italic",
    fontWeight: 700,
    fontSize: 14,
    color: "blue",
    textTransform: "uppercase",
  };

  const imageStyle = {
    width: 300,
    marginBottom: 50,
  }

  useEffect(() => {
    console.log("Map component is rendered!");
    // Resto del código...
  }, []);

  useEffect(() => {
    try {
      if (!map.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [2.3522, 48.8566],
          zoom: 12,
        });

        map.current.on("move", () => { });

        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          profile: "mapbox/walking",
        });

        map.current.addControl(directions, "top-left");

        if (coordinates && coordinates.length >= 2) {
          const origin = [coordinates[0].longitude, coordinates[0].latitude];
          const waypoints = coordinates.slice(1, -1).map((coord) => [
            coord.longitude,
            coord.latitude,
          ]);

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
    } catch (error) {
      console.log(error)
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
              const name = currentMonumentData.name && currentMonumentData.name.fr ? currentMonumentData.name.fr : "N/A";
              const description =
                currentMonumentData.description && currentMonumentData.description.fr
                  ? currentMonumentData.description.fr
                  : "N/A";

              const image = currentMonumentData.category || "";
              const imageName = `${image.toLowerCase()}.jpg`;
              const imagePath = `src/assets/${imageName}`;
              console.log('Complete Image Path:', imagePath);


              return (
                <div key={index} style={{ marginBottom: 50 }}>
                  <img src={imagePath} alt={image} style={imageStyle} />
                  <h1 style={titleStyle}>{name}</h1>
                  <p style={descriptionStyle}>{description}</p>
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
