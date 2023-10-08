import "./App.css";
import {
  Menu,
  Button,
  ConfigProvider,
  Avatar,
  Col,
  Row,
  Image,
  Select,
  FloatButton,
  Form,
} from "antd";
import React, { useState } from "react";
import {
  HomeTwoTone,
  BulbTwoTone,
  BankTwoTone,
  AlertTwoTone,
} from "@ant-design/icons";
import { color } from "@mui/system";
const url = "https://cdn-icons-png.flaticon.com/512/9805/9805356.png";
const items = [
  {
    label: (
      <div className="logo">
        <Avatar
          src={url}
          size={{
            xs: 24,
            sm: 24,
            md: 30,
            lg: 30,
            xl: 40,
            xxl: 50,
          }}
        />
        <span style={{ color: "#75BF7A" }}>CITYMAPER</span>
      </div>
    ),
    key: "Logo",
    disabled: true,
  },
  {
    label: "HOME",
    key: "home",
    icon: <HomeTwoTone style={{ fontSize: "24px" }} />,
  },
  {
    label: "HOW IT WORKS",
    key: "how",
    icon: <BulbTwoTone style={{ fontSize: "24px" }} />,
  },
  {
    label: "MONUMENTS",
    key: "monuments",
    icon: <BankTwoTone style={{ fontSize: "24px" }} />,
  },
  {
    label: (
      <Button
        type="primary"
        icon={
          <AlertTwoTone twoToneColor="white" style={{ fontSize: "24px" }} />
        }
        size="large"
        style={{ backgroundColor: "#75BF7A", color: "white" }}
      >
        HELP CENTER
      </Button>
    ),
    key: "Help",
  },
];
function App() {
  const [current, setCurrent] = useState("home");
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

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const [selectedMonuments, setSelectedMonuments] = useState([]);
  const handleSubmit = (values) => {
    const { selectedMonuments } = values;
    // Handle the selected monuments here
    console.log("Selected Monuments:", selectedMonuments);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            horizontalItemHoverColor: "#75BF7A",
            horizontalItemSelectedColor: "#75BF7A",
          },
          Select: {
            multipleItemBorderColor: "#FFFFFF",
            selectorBg: "#75BF7A",
            optionSelectedColor: "#75BF7A",
            optionSelectedBg: "#f1f1f1",
            clearBg: "#75BF7A",
          },
          Button:{
            defaultBg:"#75BF7A",
            defaultColor:"#FFFFFF",
          }
        },
      }}
    >
      <div className="App">
        <div className="header">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </div>
        <div className="content">
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
                  />{" "}
                </Form.Item>
                <Form.Item>
                  <Button  htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <h3>
                Our app helps you effortlessly navigate to the city's most
                renowned monuments and landmarks, ensuring you make the most of
                your urban exploration
              </h3>
            </Col>
            <Col span={12}>
              <Image src="/plan.png" preview={false} />
            </Col>
          </Row>
        </div>
        <FloatButton.BackTop />
      </div>
    </ConfigProvider>
  );
}

export default App;
