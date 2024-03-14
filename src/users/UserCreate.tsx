import {
  CheckboxGroupInput,
  Create,
  PasswordInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { AreaChoices, PermissionsChoices } from "./Permissions";
import { Box } from "@mui/material";
import { SectionTitle } from "../components/FormsUtils";

const validateForm = (values: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!values.name) {
    errors.name = "ra.validation.required";
  }
  if (values.pass && values.pass !== values.confirm_pass) {
    errors.confirm_pass = "contraseña diferente";
  }
  return errors;
};

const UserCreate = () => (
  <Create redirect="list" title="Crear Usuario">
    <SimpleForm validate={validateForm}>
      <SectionTitle label="Datos Usuario" />
      <TextInput
        source="name"
        label="Nombre Completo"
        sx={{ maxWidth: 500 }}
        isRequired
        fullWidth
      />
      <SectionTitle label="Acceso Sistema" />
      <TextInput
        source="email"
        label="Correo/Usuario"
        sx={{ maxWidth: 500 }}
        isRequired
        fullWidth
      />
      <Box
        display={{ xs: "block", sm: "flex", width: "100%" }}
        sx={{ maxWidth: 500 }}
      >
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <PasswordInput source="pass" label="Contraseña" isRequired />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <PasswordInput
            source="confirm_pass"
            label="Confirmar Contraseña"
            isRequired
          />
        </Box>
      </Box>
      <CheckboxGroupInput
        source="areas"
        label="Areas de Trabajo"
        choices={AreaChoices}
      />
      <CheckboxGroupInput
        source="permissions"
        label="Permisos"
        choices={PermissionsChoices}
      />
    </SimpleForm>
  </Create>
);

export default UserCreate;
