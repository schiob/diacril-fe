import { useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import HardwareIcon from "@mui/icons-material/Hardware";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HailIcon from "@mui/icons-material/Hail";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

import {
  MenuItemLink,
  MenuProps,
  usePermissions,
  useSidebarState,
} from "react-admin";

import {
  PermissionsAdminGet,
  PermissionsOrdersEdit,
} from "../domine/permissions";
import SubMenu from "./SubMenu";

type MenuName = "menuCatalogo" | "menuConfig";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuConfig: false,
    menuCatalogo: false,
  });
  const [open] = useSidebarState();
  const { permissions } = usePermissions();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 180 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      {permissions.includes(PermissionsOrdersEdit) && (
        <MenuItemLink
          to="/ordenes-compra/create"
          state={{ _scrollToTop: true }}
          primaryText={"Nueva Orden"}
          leftIcon={<AddIcon color="primary" />}
          dense={dense}
        />
      )}
      <MenuItemLink
        to="/ordenes-produccion"
        state={{ _scrollToTop: true }}
        primaryText={"Producción"}
        leftIcon={<HardwareIcon color="primary" />}
        dense={dense}
      />
      <MenuItemLink
        to="/ordenes-entregas"
        state={{ _scrollToTop: true }}
        primaryText={"Entregas"}
        leftIcon={<LocalShippingIcon color="primary" />}
        dense={dense}
      />
      <SubMenu
        handleToggle={() => handleToggle("menuCatalogo")}
        isOpen={state.menuCatalogo}
        name="Catálogos"
        icon={<CollectionsBookmarkIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/clientes"
          state={{ _scrollToTop: true }}
          primaryText={"Clientes"}
          leftIcon={<HailIcon />}
          dense={dense}
        />
      </SubMenu>
      {permissions.includes(PermissionsAdminGet) && (
        <MenuItemLink
          to="/users"
          state={{ _scrollToTop: true }}
          primaryText={"Usuarios"}
          leftIcon={<ManageAccountsIcon />}
          dense={dense}
        />
      )}
    </Box>
  );
};

export default Menu;
