import { Button, Col, Row, Image, Select, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import planImg from "../assets/plan.png";

function Home() {
  const [monumentOptions, setMonumentOptions] = useState([]);
  const [allMonuments, setAllMonuments] = useState([]); // New state variable
  const navigate = useNavigate();

  useEffect(() => {
    // const fileRef = ref(storage, "monumentsParis.json");
    const fileRef = ref(storage, "monumentstest.json");

    getDownloadURL(fileRef)
      .then((url) => {
        const timestampedURL = `${url}?_=${new Date().getTime()}`;
        return fetch(timestampedURL);
      })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched Monument Data:", data);
        setAllMonuments(data); // Store all monuments in state
        setMonumentOptions(
          data.map((monument) => ({
            label: monument.name.fr,
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

    const selectedMonumentsData = allMonuments.filter((monument) =>
      selectedMonuments.includes(`${monument.latitude},${monument.longitude}`)
    );

    const coordinates = selectedMonumentsData.map((monument) => ({
      latitude: parseFloat(monument.latitude),
      longitude: parseFloat(monument.longitude),
    }));

    // Pass selectedMonumentsData to Map component
    navigate("/Map", { state: { coordinates, selectedMonumentsData } });
  };

  return (
    <Row align={"middle"} style={{ marginLeft: "30px" }} data-testid="home-component">
      <Col span={12}>
        <h2 style={{ color: "#75BF7A", textTransform: "uppercase" }}>
          SELECT MONUMENTS
        </h2>
        <Form onFinish={handleSubmit}>
          <Form.Item name="selectedMonuments">
            <Select
              data-testid="monument-select"
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
