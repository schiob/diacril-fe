import {
  ArrayInput,
  Edit,
  required,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useRecordContext,
} from "react-admin";
import {
  FormEditToolbar,
  SectionTitle,
  TransformarAMayusculas,
} from "../../components/FormsUtils";

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Editar Cliente {record ? `${record.nombre}` : ""}</span>;
};

const ClienteEdit = () => {
  return (
    <Edit title={<PostTitle />}>
      <SimpleForm toolbar={<FormEditToolbar />}>
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
    </Edit>
  );
};

export default ClienteEdit;
