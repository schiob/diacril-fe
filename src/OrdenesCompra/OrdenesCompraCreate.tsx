import {
  Create,
  DateInput,
  FileField,
  FileInput,
  NumberInput,
  TextInput,
  TabbedForm,
  ArrayInput,
  SimpleFormIterator,
  required,
  CheckboxGroupInput,
  ReferenceInput,
  SelectInput,
  Toolbar,
  SaveButton,
  ReferenceField,
  FormDataConsumer,
  usePermissions,
} from "react-admin";
import { ConvertDateToString } from "../utils/parsers";
import { Grid, Divider } from "@mui/material";
import {
  SectionTitle,
  Separator,
  TransformarAMayusculas,
} from "../components/FormsUtils";
import { AreaChoices } from "../users/Permissions";
import { PartidaConnector, SelectUserClientInput } from "./CustomInputs";
import { OrdenStatusChoice } from "./Types";
import ClientQuickCreateButton from "./ClientQuickCreateButton";
import { useState, useCallback } from "react";
import { Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ClientQuickEditButton from "./ClientQuickEditButton";
import { PermissionsAdminEdit } from "../domine/permissions";

const ordenDefaultValue = () => {
  return {
    fecha_programacion: ConvertDateToString(new Date()),
    status: "1-RECIEN_LLEGADA",
    prioridad: 1,
  };
};

const OrderCreateToolbar = () => {
  return (
    <Toolbar>
      <SaveButton label="Guardar y Salir" />
    </Toolbar>
  );
};

export const OrderAside = () => {
  const methods = useFormContext();
  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Typography variant="h6">Cliente</Typography>
          <ReferenceField
            label="Cliente/Usuario"
            reference="clientes"
            source="cliente"
            link={false}
            record={{ cliente: methods.getValues("cliente") }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">Orden Compra</Typography>
          <Typography variant="body2">
            {methods.getValues("numero_orden")}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const OrdenCompraCreate = () => {
  const [version, setVersion] = useState(0);
  const { permissions } = usePermissions();
  const handleChange = useCallback(() => setVersion(version + 1), [version]);

  return (
    <Create redirect="list" title="Crear Orden Compra">
      <TabbedForm
        defaultValues={ordenDefaultValue}
        toolbar={<OrderCreateToolbar />}
      >
        <TabbedForm.Tab label="Datos Cliente">
          <SectionTitle label="Completa los campos del cliente" />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <DateInput
                source="fecha_programacion"
                label="Fecha Ingreso"
                isRequired
                validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectInput
                source="status"
                choices={OrdenStatusChoice}
                isRequired
                validate={required()}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectInput
                source="prioridad"
                choices={[
                  { id: 1, name: "1 - Normal" },
                  { id: 2, name: "2 - Alta" },
                  { id: 3, name: "3 - Urgente" },
                ]}
                isRequired
                validate={required()}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ReferenceInput
                key={version}
                label="Cliente"
                source="cliente"
                reference="clientes"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              {permissions.includes(PermissionsAdminEdit) && (
                <ClientQuickCreateButton onChange={handleChange} />
              )}
            </Grid>
            <FormDataConsumer>
              {({ formData, ...rest }) => {
                return (
                  <>
                    <Grid item xs={4}>
                      {formData.cliente && (
                        <SelectUserClientInput
                          formData={formData}
                          {...rest}
                          fullWidth
                        />
                      )}
                      {!formData.cliente && (
                        <SelectUserClientInput
                          formData={formData}
                          {...rest}
                          fullWidth
                          disabled
                        />
                      )}
                    </Grid>
                    {permissions.includes(PermissionsAdminEdit) && (
                      <Grid item xs={2}>
                        {formData.cliente && (
                          <ClientQuickEditButton
                            onChange={handleChange}
                            clientID={formData.cliente}
                          />
                        )}
                        {!formData.cliente && (
                          <ClientQuickEditButton
                            onChange={handleChange}
                            clientID={formData.cliente}
                            disabled={true}
                          />
                        )}
                      </Grid>
                    )}
                  </>
                );
              }}
            </FormDataConsumer>
          </Grid>
          <Grid container spacing={1}>
            <Grid item>
              <TextInput
                source="numero_orden"
                label="Número Orden de Compra"
                fullWidth
                format={TransformarAMayusculas}
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Adjunta Archivos">
          <SectionTitle label="Adjunta archivos necesarios" />
          <Separator />
          <OrderAside />
          <Separator />
          <SectionTitle label="Contenido" />
          <FileInput source="docs_orden" label="Orden Compra" multiple>
            <FileField source="src" title="title" target="_blank" />
          </FileInput>
          <Divider />
          <FileInput source="docs_presupuesto" label="Presupuesto" multiple>
            <FileField source="src" title="title" target="_blank" />
          </FileInput>
          <Divider />
          <FileInput source="docs_produccion" label="Orden Producción" multiple>
            <FileField source="src" title="title" target="_blank" />
          </FileInput>
          <Divider />
          <FileInput
            source="docs_apoyo"
            label="Documentos Extra de Apoyo"
            multiple
          >
            <FileField source="src" title="title" target="_blank" />
          </FileInput>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Datos Producto">
          <SectionTitle label="Completa los campos del producto" />
          <NumberInput
            source="importe_total"
            label="Importe Total"
            options={{
              style: "currency",
              currency: "MXN",
              maximumFractionDigits: 2,
            }}
            disabled
          />
          <PartidaConnector />
          <ArrayInput source="partidas">
            <SimpleFormIterator inline>
              <TextInput
                source="descripcion"
                fullWidth
                multiline
                label="Descripción Producto"
                format={TransformarAMayusculas}
              />
              <NumberInput source="cantidad" label="Cantidad" />
              <NumberInput
                source="precio_unitario"
                label="Precio Unitario"
                options={{
                  style: "currency",
                  currency: "MXN",
                  maximumFractionDigits: 2,
                }}
              />
            </SimpleFormIterator>
          </ArrayInput>
          <Separator />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Asignación">
          <SectionTitle label="Completa los campos asignación" />
          <CheckboxGroupInput
            source="areas"
            label="Areas de Trabajo"
            choices={AreaChoices}
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Comentarios">
          <TextInput
            source="comentarios"
            fullWidth
            multiline
            label="Comentarios"
            format={TransformarAMayusculas}
          />
          <TextInput
            source="mensaje_notificacion"
            fullWidth
            multiline
            label="Mensaje Notificación (modifica para enviar notificación)"
            format={TransformarAMayusculas}
          />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

export default OrdenCompraCreate;
