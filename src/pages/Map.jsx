import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Map.css";
import { Button, Drawer, Card } from "antd";
import louvreImg from "../assets/louvre.jpg";
import eiffelImg from "../assets/eiffel.png";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VwZXJub3ZhMjAyNCIsImEiOiJjbG5oaHFzOGsxZzhsMml3NTFudmpqY2FrIn0.6GGwWqLK729DVIuQ9R0tXQ";
const { Meta } = Card;

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const monuments = [
  {
    name: "EIFFEL TOWER",
    // image: eiffelImg,
    description: "The Popular EIFFEL TOWER built by Gustave Eiffel",
  },
  {
    name: "LOUVRE",
    // image: louvreImg,
    description: "The Louvre, or the Louvre Museum, is a national art museum in Paris, France.",
  },
  
];
const Map = () => {
  const location = useLocation();
  const { coordinates } = location.state || {};

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

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [2.3522, 48.8566],
        zoom: 12,
      });

      map.current.on("move", () => {
        // Update state variables based on map movements
      });

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: "mapbox/walking",
      });

      map.current.addControl(directions, "top-left");

      if (coordinates && coordinates.length >= 2) {
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
        <Button>Informations</Button>
      </div>
      <div className="MonumentsDrawer">
        <Drawer
          title="Your Monuments Order"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <div>
            {monuments.map((monument, index) => (
              <div key={index} style={{ marginBottom: 50 }}>
                {/* <img alt={monument.name} src={monument.image} /> */}
                <h1 style={titleStyle}>{monument.name}</h1>
                <p style={descriptionStyle}>{monument.description}</p>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

AnyReactComponent.propTypes = {
  text: PropTypes.any,
};

export { Map };
