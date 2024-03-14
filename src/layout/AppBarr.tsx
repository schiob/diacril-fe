import {
  AppBar,
  Logout,
  MenuItemLink,
  TitlePortal,
  useGetIdentity,
  UserMenu,
  useUserMenu,
} from "react-admin";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionAlerts from "../components/NotificationCenter";

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const ConfigurationMenu = () => {
  const { onClose } = useUserMenu();
  const { data } = useGetIdentity();
  return (
    <MenuItemLink
      to={data !== undefined ? "/users/" + data.id : ""}
      primaryText="Conf. Usuario"
      leftIcon={<SettingsIcon />}
      sidebarIsOpen
      onClick={onClose}
    />
  );
};

export const MyAppBar = () => (
  <AppBar
    color="default"
    userMenu={
      <UserMenu>
        <ConfigurationMenu />
        <Logout />
      </UserMenu>
    }
  >
    <Logo />
    <TitlePortal />
    <DescriptionAlerts />
  </AppBar>
);

const Logo = () => {
  return (
    <Box
      sx={{
        width: 135,
        height: 30,
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <img height="100%" src="./logo.png" />
    </Box>
  );
};
