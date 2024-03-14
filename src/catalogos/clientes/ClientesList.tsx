import {
  ArrayField,
  CreateButton,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  ExportButton,
  List,
  Pagination,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
  usePermissions,
} from "react-admin";
import { PermissionsAdminEdit } from "../../domine/permissions";

const ListActions = () => {
  const { permissions } = usePermissions();
  return (
    <TopToolbar>
      {permissions.includes(PermissionsAdminEdit) && (
        <CreateButton label="Crear" />
      )}
      <ExportButton label="Exportar" />
    </TopToolbar>
  );
};

export const ClientesFilters = [
  <TextInput key="nombre" label="Nombre" source="nombre" alwaysOn/>,
];

const ClienteShow = () => (
  <SimpleShowLayout>
    <TextField source="comentarios" label="Comentarios" multiline />
    <ArrayField source="usuarios">
      <Datagrid bulkActionButtons={false}>
        <TextField source="nombre" />
        <TextField source="correo" />
        <TextField source="telefono" />
      </Datagrid>
    </ArrayField>
  </SimpleShowLayout>
);

const ClienteList = () => {
  const { permissions } = usePermissions();
  return (
    <List
      actions={<ListActions />}
      title="Clientes"
      filters={ClientesFilters}
      pagination={<ClientePagination />}
      perPage={500}
    >
      <Datagrid bulkActionButtons={false} expand={<ClienteShow />}>
        <TextField source="nombre" label="Nombre" />
        {permissions.includes(PermissionsAdminEdit) && (
          <EditButton key="editar" label="Editar" />
        )}
        {permissions.includes(PermissionsAdminEdit) && (
          <DeleteWithConfirmButton key="borrar" label="Borrar" />
        )}
      </Datagrid>
    </List>
  );
};

const ClientePagination = () => (
  <Pagination rowsPerPageOptions={[50, 100, 200, 500]} />
);

export default ClienteList;
