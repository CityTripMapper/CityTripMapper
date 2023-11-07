import { Button, Col, Row, Image, Select, Form } from "antd";
import { useNavigate } from "react-router-dom";

import planImg from "../assets/plan.png";

function Home() {
  const monumentOptions = [
    {
      label: "Eiffel Tower",
      value: "eiffel",
    },
    {
      label: "Louvre",
      value: "louvre",
    },
    {
      label: "Notre-Dame Cathedral",
      value: "notre-dame",
    },
    {
      label: "Arc de Triomphe",
      value: "arc-de-triomphe",
    },
    {
      label: "Montmartre",
      value: "montmartre",
    },
    {
      label: "Palace of Versailles",
      value: "versailles",
    },
    {
      label: "Seine River Cruise",
      value: "seine-cruise",
    },
    {
      label: "Moulin Rouge",
      value: "moulin-rouge",
    },
    {
      label: "Pantheon",
      value: "pantheon",
    },
    {
      label: "Sainte-Chapelle",
      value: "sainte-chapelle",
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { selectedMonuments } = values;
    // Handle the selected monuments here
    console.log("Selected Monuments:", selectedMonuments);

    // Route to "./pages/Map" when the form is submitted
    navigate("/Map");
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
                width: "100%",
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
