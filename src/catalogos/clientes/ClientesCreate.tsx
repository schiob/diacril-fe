import {
  ArrayInput,
  Create,
  required,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";
import {
  SectionTitle,
  TransformarAMayusculas,
} from "../../components/FormsUtils";

const ClienteCreate = () => (
  <Create redirect="list" title="Crear Cliente">
    <SimpleForm>
      <SectionTitle label="Datos Cliente" />
      <TextInput
        source="nombre"
        label="Nombre"
        fullWidth
        isRequired
        validate={required()}
        format={TransformarAMayusculas}
      />
      <TextInput
        source="comentarios"
        label="Comentarios"
        multiline
        fullWidth
        format={TransformarAMayusculas}
      />
      <ArrayInput source="usuarios">
        <SimpleFormIterator inline fullWidth>
          <TextInput
            source="nombre"
            helperText={false}
            format={TransformarAMayusculas}
            style={{ width: "45%" }}
          />
          <TextInput
            source="correo"
            helperText={false}
            format={TransformarAMayusculas}
            style={{ width: "45%" }}
          />
          <TextInput
            source="telefono"
            helperText={false}
            format={TransformarAMayusculas}
            style={{ width: "45%" }}
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default ClienteCreate;
