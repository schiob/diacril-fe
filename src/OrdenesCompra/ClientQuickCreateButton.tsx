import { useState } from "react";
import {
  ArrayInput,
  Button,
  CreateBase,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  required,
  useCreate,
  useNotify,
} from "react-admin";
import IconContentAdd from "@mui/icons-material/Add";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { TransformarAMayusculas } from "../components/FormsUtils";
import { useFormContext } from "react-hook-form";

function ClientQuickCreateButton({ onChange }: any) {
  const [showDialog, setShowDialog] = useState(false);
  const [create, { loading }] = useCreate();
  const { setValue } = useFormContext();

  const notify = useNotify();

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const handleSubmit = (data: any) => {
    create(
      "clientes",
      { data },
      {
        onSettled: (data) => {
          setShowDialog(false);
          // Update the comment form to target the newly created post
          // Updating the ReferenceInput value will force it to reload the available posts
          // form.change('post_id', data.id);
          onChange();
          setValue("cliente", data.id);
        },
        onError: ({ error }) => {
          notify(error.message, "error");
        },
      }
    );
  };

  return (
    <>
      <Button onClick={handleClick} label="Agregar Cliente">
        <IconContentAdd />
      </Button>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        aria-label="Crear cliente"
      >
        <DialogTitle>Crear Cliente</DialogTitle>

        <CreateBase resource="clientes" redirect={false}>
          <SimpleForm onSubmit={handleSubmit}>
            <DialogContent>
              <TextInput
                source="nombre"
                label="Nombre"
                fullWidth
                isRequired
                validate={required()}
                format={TransformarAMayusculas}
              />
              <TextInput
                source="rfc"
                label="RFC"
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
                </SimpleFormIterator>
              </ArrayInput>
            </DialogContent>
          </SimpleForm>
        </CreateBase>
      </Dialog>
    </>
  );
}

export default ClientQuickCreateButton;
