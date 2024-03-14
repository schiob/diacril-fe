import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { MyLayout } from "./layout/Layout";
import UserCreate from "./users/UserCreate";
import UserList from "./users/UserList";
import UserEdit from "./users/UserEdit";
import OrdenCompraList from "./OrdenesCompra/OrdenesCompraList";
import OrdenCompraCreate from "./OrdenesCompra/OrdenesCompraCreate";
import OrdenCompraEdit from "./OrdenesCompra/OrdenesCompraEdit";
import ClienteCreate from "./catalogos/clientes/ClientesCreate";
import ClienteEdit from "./catalogos/clientes/ClientesEdit";
import ClienteList from "./catalogos/clientes/ClientesList";
import { MyLoginPage } from "./Login/LoginPage";
import { defaultTheme } from 'react-admin';

const theme = {
  ...defaultTheme,
  sidebar: {
      width: 180, // The default value is 240
      closedWidth: 55, // The default value is 55
  },
};

export const App = () => (
  <Admin
    title="Diacril"
    loginPage={MyLoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
    layout={MyLayout}
    theme={theme}
    requireAuth
  >
    <CustomRoutes>
      <Route
        path="/ordenes-produccion"
        element={
          <OrdenCompraList
            statusFilters={[
              "1-RECIEN_LLEGADA",
              "2-CON_INFO",
              "3-ORDEN_PRODUCCION",
              "4-TRABAJANDO",
              "5-IMPRESION",
              "6-CORTE",
            ]}
          />
        }
      />
      <Route
        path="/ordenes-entregas"
        element={<OrdenCompraList statusFilters={["F-POR_FACTURAR"]} />}
      />
    </CustomRoutes>
    <Resource
      name="ordenes-compra"
      list={
        <OrdenCompraList
          statusFilters={[
            "1-RECIEN_LLEGADA",
            "2-CON_INFO",
            "3-ORDEN_PRODUCCION",
            "4-TRABAJANDO",
            "5-IMPRESION",
            "6-CORTE",
          ]}
        />
      }
      create={OrdenCompraCreate}
      edit={OrdenCompraEdit}
    />
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      recordRepresentation="name"
    />
    <Resource
      name="clientes"
      list={ClienteList}
      create={ClienteCreate}
      edit={ClienteEdit}
      recordRepresentation="nombre"
    />
    <Resource
      name="notificaciones"
    />
  </Admin>
);
