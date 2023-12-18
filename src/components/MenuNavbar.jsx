import { Menu, Avatar, Button } from "antd";
import {
  HomeTwoTone,
  BulbTwoTone,
  BankTwoTone,
  AlertTwoTone,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const iconStyle = { fontSize: "24px" };
const buttonStyle = { backgroundColor: "#75BF7A", color: "white" };

const url = "https://cdn-icons-png.flaticon.com/512/9805/9805356.png";

const MenuComponent = ({ current, onClick }) => {
  const menuItems = [
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
          <span style={{ color: "#75BF7A" }}>CITYTRIPMAPPER</span>
        </div>
      ),
      key: "Logo",
      disabled: true,
    },
    {
      label: "HOME",
      key: "home",
      icon: <HomeTwoTone style={iconStyle} />,
    },
    {
      label: "HOW IT WORKS",
      key: "how",
      icon: <BulbTwoTone style={iconStyle} />,
    },
    {
      label: "MONUMENTS",
      key: "monuments",
      icon: <BankTwoTone style={iconStyle} />,
    },
    {
      label: (
        <Button
          type="primary"
          icon={<AlertTwoTone twoToneColor="white" style={iconStyle} />}
          size="large"
          style={buttonStyle}
        >
          HELP CENTER
        </Button>
      ),
      key: "Help",
    },
  ];

  return (
    <Menu
      data-testid="menu-component"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={menuItems}
    />
  );
};

MenuComponent.propTypes = {
  current: PropTypes.any,
  onClick: PropTypes.func,
};

export default MenuComponent;
