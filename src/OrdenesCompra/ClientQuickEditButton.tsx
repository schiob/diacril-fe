import { useState } from "react";
import {
  ArrayInput,
  Button,
  CreateBase,
  EditBase,
  SaveButton,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  Toolbar,
  required,
  useNotify,
  useUpdate,
} from "react-admin";
import IconContentAdd from "@mui/icons-material/Add";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { TransformarAMayusculas } from "../components/FormsUtils";
import { useFormContext } from "react-hook-form";

const ClientEditToolbar = () => {
  return (
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
      <SaveButton label="Guardar" />
    </Toolbar>
  );
};

function ClientQuickEditButton({ onChange, clientID, disabled }: any) {
  const [showDialog, setShowDialog] = useState(false);
  const [update, { isLoading }] = useUpdate();

  const notify = useNotify();

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const handleSubmit = (data: any) => {
    update(
      "clientes",
      { id: clientID, data: data },
      {
        onSettled: (data) => {
          setShowDialog(false);
          // Update the comment form to target the newly created post
          // Updating the ReferenceInput value will force it to reload the available posts
          // form.change('post_id', data.id);
          onChange();
        },
        onError: ({ error }) => {
          notify(error.message, "error");
        },
      }
    );
  };

  return (
    <>
      <Button onClick={handleClick} label="Agregar Usuario" disabled={disabled}>
        <IconContentAdd />
      </Button>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        aria-label="Editar cliente"
      >
        <DialogTitle>Editar Cliente</DialogTitle>

        <EditBase resource="clientes" id={clientID} redirect={false}>
          <SimpleForm onSubmit={handleSubmit} toolbar={<ClientEditToolbar />}>
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
        </EditBase>
      </Dialog>
    </>
  );
}

export default ClientQuickEditButton;
