import {
  ArrayField,
  CreateButton,
  Datagrid,
  DateField,
  DateInput,
  DeleteWithConfirmButton,
  EditButton,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  usePermissions,
} from "react-admin";
import LongMenu from "../components/LongMenu";
import { PermissionsOrdersEdit } from "../domine/permissions";
import { Grid } from "@mui/material";
import { TransitoChip } from "../components/ListFields";
import { FilesList } from "../components/FilesList";
import SetSemanaButton from "../OrdenesCompra/CustomButtons";
import { ConvertDateToString } from "../utils/parsers";
import { startOfWeek, parseISO } from "date-fns";

const ListActions = () => {
  const { permissions } = usePermissions();
  return (
    <TopToolbar>
      <FilterButton />
      {permissions.includes(PermissionsOrdersEdit) && (
        <CreateButton label="Crear" />
      )}
      <ExportButton label="Exportar" />
    </TopToolbar>
  );
};

export const OrdenCompraFilters = [
  <DateInput
    key="semana_planeacion"
    source="semana_planeacion"
    label="Semana Planeación"
    parse={(v) =>
      ConvertDateToString(startOfWeek(parseISO(v), { weekStartsOn: 1 }))
    }
    alwaysOn
  />,
  <ReferenceInput
    key="cliente"
    label="Cliente"
    reference="clientes"
    source="cliente"
  />,
  <SelectInput
    key="status"
    source="status_entrega"
    label="Status"
    choices={[
      { id: "RECIBIDO", name: "Recibido" },
      { id: "TRÁNSITO", name: "Tránsito" },
    ]}
    isRequired
  />,
  <DateInput key="fecha_inicio" source="fecha_inicio" label="Fecha Inicio" />,
  <DateInput key="fecha_fin" source="fecha_fin" label="Fecha Fin" />,
];

const OrdenCompraShow = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <SimpleShowLayout>
        <ArrayField source="partidas">
          <Datagrid bulkActionButtons={false}>
            <TextField source="descripcion" />
            <NumberField source="cantidad" />
            <NumberField source="precio_unitario" />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Grid>
  </Grid>
);

const OrdersBulkActionButtons = () => (
  <>
    <SetSemanaButton label="Asignar Semana Actual" />
  </>
);

const PlaneacionList = () => {
  const { permissions } = usePermissions();
  return (
    <List
      resource="ordenes-compra"
      filters={OrdenCompraFilters}
      filterDefaultValues={{
        semana_planeacion: ConvertDateToString(
          startOfWeek(new Date(), { weekStartsOn: 1 })
        ),
      }}
      actions={<ListActions />}
      title="Transporte Cliente"
    >
      <Datagrid
        expand={OrdenCompraShow}
        bulkActionButtons={<OrdersBulkActionButtons />}
      >
        <DateField source="fecha" label="Fecha" locales="es-MX" />
        <DateField source="fecha_programacion" label="Semana" locales="es-MX" />
        <TextField source="numero_orden" label="Numero Orden" />
        <FilesList source="docs_produccion" label="Orden Producción" />
        <TextField source="producto" label="Producto" />
        <FilesList source="docs_orden" label="Orden Compra" />
        <TextField source="prioridad" label="Prioridad" />
        <ReferenceField label="Cliente" reference="clientes" source="cliente" />
        <TransitoChip source="status" label="Status" />
        {permissions.includes(PermissionsOrdersEdit) && (
          <LongMenu
            options={[
              <EditButton key="editar" label="Editar" fullWidth />,
              <DeleteWithConfirmButton key="borrar" label="Borrar" fullWidth />,
            ]}
          />
        )}
      </Datagrid>
    </List>
  );
};

export default PlaneacionList;
