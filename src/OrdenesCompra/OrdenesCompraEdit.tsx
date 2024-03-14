import {
  ArrayInput,
  DateInput,
  Edit,
  FileInput,
  NumberInput,
  ReferenceInput,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
  useRecordContext,
  required,
  CheckboxGroupInput,
  SelectInput,
  usePermissions,
  SaveButton,
  Toolbar,
  DeleteButton,
  FormDataConsumer,
} from "react-admin";
import { Grid, Divider } from "@mui/material";
import {
  SectionTitle,
  Separator,
  TransformarAMayusculas,
} from "../components/FormsUtils";
import { FilesList } from "../components/FilesList";
import { AreaChoices } from "../users/Permissions";
import { PartidaConnector, SelectUserClientInput } from "./CustomInputs";
import { OrdenStatusChoice } from "./Types";
import {
  PermissionsAdminEdit,
  PermissionsOrdersDelete,
  PermissionsPricesGet,
} from "../domine/permissions";
import ClientQuickCreateButton from "./ClientQuickCreateButton";
import { useState, useCallback } from "react";
import { OrderAside } from "./OrdenesCompraCreate";
import ClientQuickEditButton from "./ClientQuickEditButton";

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Editar Orden {record ? `${record.numero_orden}` : ""}</span>;
};

export const TransformOrdersEdit = (data: any) => {
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
    areas: areas,
  };
};
const OrderEditToolbar = () => {
  const { permissions } = usePermissions();
  return (
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
      <SaveButton label="Guardar y Salir" />
      {permissions.includes(PermissionsOrdersDelete) && (
        <DeleteButton label="Eliminar" />
      )}
    </Toolbar>
  );
};

const OrdenCompraEdit = () => {
  const { permissions } = usePermissions();
  const [version, setVersion] = useState(0);
  const handleChange = useCallback(() => setVersion(version + 1), [version]);
  return (
    <Edit title={<PostTitle />} transform={TransformOrdersEdit}>
      <TabbedForm toolbar={<OrderEditToolbar />}>
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
          {permissions.includes(PermissionsPricesGet) && (
            <FileInput source="docs_orden" label="Orden Compra" multiple>
              <FilesList source="docs_orden" />
            </FileInput>
          )}
          <Divider />
          {permissions.includes(PermissionsPricesGet) && (
            <FileInput source="docs_presupuesto" label="Presupuesto" multiple>
              <FilesList source="docs_presupuesto" />
            </FileInput>
          )}
          <Divider />
          <FileInput source="docs_produccion" label="Orden Producción" multiple>
            <FilesList source="docs_produccion" />
          </FileInput>
          <Divider />
          <FileInput
            source="docs_apoyo"
            label="Documentos Extra de Apoyo"
            multiple
          >
            <FilesList source="docs_apoyo" />
          </FileInput>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Datos Producto">
          <SectionTitle label="Completa los campos del producto" />
          {permissions.includes(PermissionsPricesGet) && (
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
          )}
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
              {permissions.includes(PermissionsPricesGet) && (
                <NumberInput
                  source="precio_unitario"
                  label="Precio Unitario"
                  options={{
                    style: "currency",
                    currency: "MXN",
                    maximumFractionDigits: 2,
                  }}
                />
              )}
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
    </Edit>
  );
};

export default OrdenCompraEdit;
