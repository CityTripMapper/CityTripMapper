import { Button, Col, Row, Image, Select, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

import planImg from "../assets/plan.png";

function Home() {
  const [monumentOptions, setMonumentOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fileRef = ref(storage, "monumentsParis.json");

    getDownloadURL(fileRef)
      .then((url) => {
        // Append a timestamp to the URL for cache-busting
        const timestampedURL = `${url}?_=${new Date().getTime()}`;
        return fetch(timestampedURL);
      })
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array directly
        setMonumentOptions(
          data.map((monument) => ({
            label: monument.name.fr,  // Assuming you want to display the French name
            value: monument.latitude + ',' + monument.longitude,
            ...monument,
          }))
        );
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = (values) => {
    const { selectedMonuments } = values;
    const coordinates = selectedMonuments.map((monument) => {
      const [latitude, longitude] = monument.split(',');
      return {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
    });
    navigate("/Map", { state: { coordinates } });
  };


  
  return (
    <Row align={"middle"} style={{ marginLeft: "30px" }}>
      <Col span={12}>
        <h2 style={{ color: "#75BF7A", textTransform: "uppercase" }}>
          SELECT MONUMENTS
        </h2>
        <Form onFinish={handleSubmit}>
          <Form.Item name="selectedMonuments">
            <Select
              className="MonumentSelect"
              size="large"
              placement="topLeft"
              mode="multiple"
              allowClear
              style={{
                width: "70%",
                marginBottom: "50px",
              }}
              placeholder="Select Monument"
              options={monumentOptions}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
        <h3>
          {
            "Our app helps you effortlessly navigate to the city's most renowned monuments and landmarks, ensuring you make the most of your urban exploration"
          }
        </h3>
      </Col>
      <Col span={12}>
        <Image src={planImg} preview={false} />
      </Col>
    </Row>
  );
}

export { Home };
