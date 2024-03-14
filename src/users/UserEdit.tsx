import {
  CheckboxGroupInput,
  Edit,
  PasswordInput,
  SimpleForm,
  TextInput,
  usePermissions,
  useRecordContext,
} from "react-admin";
import { SectionTitle } from "../components/FormsUtils";
import { AreaChoices, PermissionsChoices } from "./Permissions";
import { Box } from "@mui/material";
import {
  PermissionsAdminEdit,
  PermissionsAdminGet,
} from "../domine/permissions";

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Editar Usuario {record ? `${record.name}` : ""}</span>;
};

const validateForm = (values: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (values.pass && values.pass !== values.confirm_pass) {
    errors.confirm_pass = "contraseña diferente";
  }
  return errors;
};

const UserEdit = () => {
  const { permissions } = usePermissions();
  const transform = (data: any) => {
    let permiss = data.permissions;
    if (Array.isArray(permiss)) {
      if (permiss.length > 0) {
        if (typeof permiss[0] === "object") {
          permiss = permiss.map((i: any) => i.id);
        }
      }
    }
    let areas = data.areas;
    if (Array.isArray(areas)) {
      if (areas.length > 0) {
        if (typeof areas[0] === "object") {
          areas = areas.map((i: any) => i.id);
        }
      }
    }
    return {
      ...data,
      permissions: permiss,
      areas: areas,
    };
  };

  return (
    <Edit
      transform={transform}
      title={<PostTitle />}
      redirect={permissions.includes(PermissionsAdminGet) ? "list" : false}
    >
      <SimpleForm validate={validateForm}>
        <SectionTitle label="Datos Usuario" />
        <TextInput
          source="name"
          label="Nombre Completo"
          sx={{ maxWidth: 500 }}
          fullWidth
        />
        <SectionTitle label="Acceso Sistema" />
        <TextInput
          source="email"
          label="Correo/Usuario"
          sx={{ maxWidth: 500 }}
          fullWidth
        />
        <SectionTitle label="Cambiar Contraseña" />
        <Box
          display={{ xs: "block", sm: "flex", width: "100%" }}
          sx={{ maxWidth: 500 }}
        >
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <PasswordInput source="pass" label="Contraseña" />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <PasswordInput source="confirm_pass" label="Confirmar Contraseña" />
          </Box>
        </Box>
        {permissions.includes(PermissionsAdminEdit) && (
          <>
            <CheckboxGroupInput
              source="areas"
              format={(v) => {
                if (Array.isArray(v)) {
                  // Si es un arreglo, verificamos el tipo de sus elementos
                  if (v.length > 0) {
                    if (typeof v[0] === "string") {
                      return v;
                    } else if (typeof v[0] === "object") {
                      return v.map((i: any) => i.id);
                    }
                  }
                }
                return [];
              }}
              label="Areas de Trabajo"
              choices={AreaChoices}
            />
            <CheckboxGroupInput
              source="permissions"
              format={(v) => {
                if (Array.isArray(v)) {
                  // Si es un arreglo, verificamos el tipo de sus elementos
                  if (v.length > 0) {
                    if (typeof v[0] === "string") {
                      return v;
                    } else if (typeof v[0] === "object") {
                      return v.map((i: any) => i.id);
                    }
                  }
                }
                return [];
              }}
              label="Permisos"
              choices={PermissionsChoices}
            />
          </>
        )}
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
