import {
  ArrayField,
  ChipField,
  CreateButton,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  ExportButton,
  List,
  SingleFieldList,
  TextField,
  TextInput,
  TopToolbar,
  usePermissions,
} from "react-admin";
import { PermissionsAdminEdit } from "../domine/permissions";

const ListActions = () => {
  const { permissions } = usePermissions();
  return (
    <TopToolbar>
      {permissions.includes(PermissionsAdminEdit) && <CreateButton label="Crear" />}
      <ExportButton label="Exportar" />
    </TopToolbar>
  );
};

const userFilters = [
  <TextInput key="search" label="Buscar Nombre" source="name" alwaysOn />,
];

const UserList = () => {
  const { permissions } = usePermissions();
  return (
    <List filters={userFilters} actions={<ListActions />} title="Usuarios">
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" label="Nombre" />
        <TextField source="email" label="Correo/Usuario" />
        <ArrayField source="areas" label="Areas">
          <SingleFieldList linkType={false}>
            <ChipField source="name" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="permissions" label="Permisos">
          <SingleFieldList linkType={false}>
            <ChipField source="name" />
          </SingleFieldList>
        </ArrayField>
        {permissions.includes(PermissionsAdminEdit) && (
          <EditButton label="Editar" />
        )}
        {permissions.includes(PermissionsAdminEdit) && (
          <DeleteWithConfirmButton label="Borrar" />
        )}
      </Datagrid>
    </List>
  );
};

export default UserList;
