import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Button, Drawer, Card } from "antd";
import "./Map.css";
import louvreImg from "../assets/louvre.jpg";
import eiffelImg from "../assets/eiffel.png";
import PropTypes from "prop-types";

const { Meta } = Card;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
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
  return (
    <div>
      <div className="MapContainer">
        <div className="GoogleMap" style={{ height: "93vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent lat={48.8566} lng={2.3522} text="Paris" />
          </GoogleMapReact>
        </div>
        <Button className="BottomLeftButton" onClick={showDrawer}>
          Your Button
        </Button>
      </div>
      <div className="MonumentsDrawer">
        <Drawer
          title="Your Monuments Order"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <p>
            <Card
              style={{
                width: 300,
                marginBottom: 50,
              }}
              cover={<img alt="eiffel tower" src={eiffelImg} />}
            >
              <Meta
                title={<span style={titleStyle}>EIFFEL TOWER</span>}
                description={
                  <span style={descriptionStyle}>
                    The Popular EIFFEL TOWER built by Gustave Eiffel
                  </span>
                }
              />
            </Card>
            <Card
              style={{
                width: 300,
                marginBottom: 50,
              }}
              cover={<img alt="Louvre" src={louvreImg} />}
            >
              <Meta
                title={<span style={titleStyle}>LOUVRE</span>}
                description={
                  <span style={descriptionStyle}>
                    The Louvre, or the Louvre Museum, is a national art museum
                    in Paris, France.
                  </span>
                }
              />
            </Card>
          </p>
        </Drawer>
      </div>
    </div>
  );
};

AnyReactComponent.propTypes = {
  text: PropTypes.any,
};

export { Map };
