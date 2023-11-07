import { Menu, Avatar, Button } from "antd";
import {
  HomeTwoTone,
  BulbTwoTone,
  BankTwoTone,
  AlertTwoTone,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const url = "https://cdn-icons-png.flaticon.com/512/9805/9805356.png";

const MenuComponent = ({ current, onClick }) => {
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

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

MenuComponent.propTypes = {
  current: PropTypes.any,
  onClick: PropTypes.func,
};

export default MenuComponent;
