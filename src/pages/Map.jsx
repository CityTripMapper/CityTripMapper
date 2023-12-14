import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Map.css";
import { Drawer, Card } from "antd";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VwZXJub3ZhMjAyNCIsImEiOiJjbG5oaHFzOGsxZzhsMml3NTFudmpqY2FrIn0.6GGwWqLK729DVIuQ9R0tXQ";
const { Meta } = Card;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
  const location = useLocation();
  const { coordinates } = location.state || {};

  const mapContainer = useRef(null);
  const map = useRef(null);
  // Remove unused state variables
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
      // Initialize a map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [2.3522, 48.8566],
        zoom: 12,
      });

      map.current.on("move", () => {
        // Update state variables based on map movements
      });

      // Add Mapbox Directions control
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
  }, [coordinates]);

  const renderMonuments = () => {
    if (!coordinates || coordinates.length === 0) {
      return <p>No coordinates available</p>;
    }

    const shouldLogDetails = window.location.pathname === "/Map";

    return coordinates.map((monument, index) => {
      const name = monument.name ? monument.name.fr : "N/A";

      // Log the details only if shouldLogDetails is true
      if (shouldLogDetails) {
        console.log(`Monument ${index + 1} Details:`);
        console.log(`Name: ${name}`);
        console.log(`Latitude: ${monument.latitude}`);
        console.log(`Longitude: ${monument.longitude}`);
        console.log("----------------------------");
      }
  
      return (
        <Card
          key={index}
          style={{
            width: 300,
            marginBottom: 50,
          }}
          cover={<img alt={`Monument ${index}`} src="https://via.placeholder.com/300" />}
        >
          <Meta
            title={<span style={titleStyle}>{`Monument ${index + 1}`}</span>}
            description={
              <span style={descriptionStyle}>
                Name: {name}, Latitude: {monument.latitude}, Longitude: {monument.longitude}
              </span>
            }
          />
        </Card>
      );
    });
  };
  

  return (
    <div>
      <div className="BottomLeftButton" onClick={showDrawer}>
        {/* Remove the button */}
        {/* <Button>Show API Test</Button> */}
      </div>
      <div className="MonumentsDrawer">
        {/* Update the `visible` prop to `open` */}
        <Drawer title="Your Monuments Order" placement="right" onClose={onClose} open={open}>
          {renderMonuments()}
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