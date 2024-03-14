import { useState } from "react";
import {
  ChipField,
  EditBase,
  SaveButton,
  SelectInput,
  SimpleForm,
  Toolbar,
  Button,
  useRecordContext,
  usePermissions,
} from "react-admin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ChipProps, OrdenStatusChoice, OrdenStatusChoiceSimple } from "./Types";
import CloseIcon from "@mui/icons-material/Close";
import { TransformOrdersEdit } from "./OrdenesCompraEdit";
import {
  PermissionsOrdersEdit,
  PermissionsOrdersStatusEdit,
} from "../domine/permissions";
import EditIcon from "@mui/icons-material/Edit";

interface ToolbarProps {
  setState: () => void;
}

const PostToolbar = ({ setState }: ToolbarProps) => {
  return (
    <Toolbar>
      <Button label="Salir" onClick={() => setState()}>
        <CloseIcon />
      </Button>
      <SaveButton
        label="Guardar"
        onClick={() => setState()}
        type="button"
        variant="text"
      />
    </Toolbar>
  );
};

const theme = createTheme({
  palette: {
    color1: {
      main: "#9EB3C2",
      contrastText: "#000000",
    },
    color2: {
      main: "#1C7293",
      contrastText: "#FFFFFF",
    },
    color3: {
      main: "#065A82",
      contrastText: "#FFFFFF",
    },
    color4: {
      main: "#1B3B6F",
      contrastText: "#FFFFFF",
    },
    color5: {
      main: "#21295C",
      contrastText: "#FFFFFF",
    },
    color6: {
      main: "#181C38",
      contrastText: "#FFFFFF",
    },
    color7: {
      main: "#F19A3E",
      contrastText: "#000000",
    },
    color8: {
      main: "#3CBD96",
      contrastText: "#000000",
    },
    color9: {
      main: "#60AE6E",
      contrastText: "#000000",
    },
    color10: {
      main: "#F45B69",
      contrastText: "#000000",
    },
  },
});

export const SimpleStatusChip = ({ source, label }: ChipProps) => {
  const record = useRecordContext();
  record["satus_field_rendered"] = record[source];
  let value = record[source];

  let color = "default";
  for (let choice of OrdenStatusChoiceSimple) {
    if (choice.id == value) {
      color = choice.color;
      record["satus_field_rendered"] = choice.name;
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <ChipField source="satus_field_rendered" label={label} color={color} />
    </ThemeProvider>
  );
};

export const StatusChip = ({ source, label }: ChipProps) => {
  const record = useRecordContext();
  const { permissions } = usePermissions();
  const [mostrarForm, setMostrarForm] = useState(false);
  record["satus_field_rendered"] = record[source];
  let value = record[source];

  let color = "default";
  for (let choice of OrdenStatusChoiceSimple) {
    if (choice.id == value) {
      color = choice.color;
      record["satus_field_rendered"] = choice.name;
    }
  }

  const handleClick = () => {
    // Modifica el estado del mensaje y lo imprime en la consola
    setMostrarForm(!mostrarForm);
  };

  return (
    <ThemeProvider theme={theme}>
      {(permissions.includes(PermissionsOrdersEdit) ||
        permissions.includes(PermissionsOrdersStatusEdit)) && (
        <>
          {!mostrarForm && (
            <ChipField
              source="satus_field_rendered"
              label={label}
              color={color}
              onClick={handleClick}
              onDelete={handleClick}
              deleteIcon={<EditIcon fontSize="small" />}
            />
          )}

          {mostrarForm && (
            <EditBase
              resource="ordenes-compra"
              id={record.id}
              transform={TransformOrdersEdit}
              redirect={false}
            >
              <SimpleForm toolbar={<PostToolbar setState={handleClick} />}>
                <SelectInput
                  source="status"
                  choices={OrdenStatusChoice}
                  isRequired
                />
              </SimpleForm>
            </EditBase>
          )}
        </>
      )}
      {!(
        permissions.includes(PermissionsOrdersEdit) ||
        permissions.includes(PermissionsOrdersStatusEdit)
      ) && (
        <ChipField source="satus_field_rendered" label={label} color={color} />
      )}
    </ThemeProvider>
  );
};
