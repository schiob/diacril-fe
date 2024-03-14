import {
  ArrayField,
  CheckboxGroupInput,
  ChipField,
  Datagrid,
  DateField,
  DateInput,
  DeleteWithConfirmButton,
  EditButton,
  FilterButton,
  List,
  NumberField,
  ReferenceInput,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
  TopToolbar,
  usePermissions,
  Button,
  useListContext,
  Pagination,
  ReferenceField,
  SelectArrayInput,
} from "react-admin";
import LongMenu from "../components/LongMenu";
import {
  PermissionsOrdersDelete,
  PermissionsOrdersEdit,
  PermissionsPricesGet,
} from "../domine/permissions";
import { Grid } from "@mui/material";
import { FilesList } from "../components/FilesList";
import {
  ClienteField,
  OrdenStatusChoiceSimple,
  PriorodadChip,
  ProductoField,
} from "./Types";
import { SimpleStatusChip, StatusChip } from "./ChipField";
import { PlaneacionButton } from "../components/PlaneacionButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { AreaChoices } from "../users/Permissions";

const ListActions = () => {
  const { setFilters } = useListContext();
  return (
    <TopToolbar>
      <Button
        label="Limpiar Filtro"
        onClick={() => {
          setFilters({}, {}, false);
        }}
      >
        <RemoveCircleIcon />
      </Button>
      <Button
        label="S.P."
        onClick={() => {
          setFilters(
            {
              status: [
                "2-CON_INFO",
                "3-ORDEN_PRODUCCION",
                "4-TRABAJANDO",
                "5-IMPRESION",
                "6-CORTE",
              ],
            },
            {
              status: [
                "2-CON_INFO",
                "3-ORDEN_PRODUCCION",
                "4-TRABAJANDO",
                "5-IMPRESION",
                "6-CORTE",
              ],
            },
            false
          );
        }}
      >
        <EngineeringIcon />
      </Button>
      <PlaneacionButton />
      <FilterButton />
    </TopToolbar>
  );
};

export const OrdenCompraFilters = [
  <TextInput key="search" label="No. Orden" source="q" />,
  <ReferenceInput
    key="cliente"
    label="Cliente"
    reference="clientes"
    source="cliente"
    alwaysOn
  />,
  <CheckboxGroupInput
    key="status"
    source="status"
    label="Status"
    choices={OrdenStatusChoiceSimple}
    labelPlacement="bottom"
    isRequired
    alwaysOn
  />,
  <TextInput key="diacril_id" label="ID Diacril" source="diacril_id" />,
  <SelectArrayInput key="areas" source="areas" choices={AreaChoices} />,
  <DateInput key="fecha_inicio" source="fecha_inicio" label="Fecha Inicio" />,
  <DateInput key="fecha_fin" source="fecha_fin" label="Fecha Fin" />,
];

const OrdenCompraShow = () => {
  const { permissions } = usePermissions();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SimpleShowLayout>
            <TextField source="comentarios" />
          </SimpleShowLayout>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SimpleShowLayout>
            <ArrayField source="partidas">
              <Datagrid bulkActionButtons={false}>
                <TextField source="descripcion" />
                <NumberField source="cantidad" />
                {permissions.includes(PermissionsPricesGet) && (
                  <NumberField
                    source="precio_unitario"
                    options={{
                      style: "currency",
                      currency: "MXN",
                      minimumFractionDigits: 2,
                    }}
                  />
                )}
              </Datagrid>
            </ArrayField>
          </SimpleShowLayout>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SimpleShowLayout>
            <ArrayField source="history" label="Historico Estatus">
              <Datagrid bulkActionButtons={false}>
                <DateField
                  source="date"
                  label="Fecha"
                  locales="es-MX"
                  showTime
                />
                <SimpleStatusChip source="status" label="Estatus" />
                <ReferenceField
                  label="Usuario"
                  reference="users"
                  source="user_id"
                  link={false}
                />
              </Datagrid>
            </ArrayField>
          </SimpleShowLayout>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={6}>
              <SimpleShowLayout>
                <ArrayField source="areas" label="Areas">
                  <SingleFieldList linkType={false}>
                    <ChipField source="name" size="small" label="Areas" />
                  </SingleFieldList>
                </ArrayField>
              </SimpleShowLayout>
            </Grid>
            <Grid item xs={6}>
              <SimpleShowLayout>
                <FilesList source="docs_apoyo" label="Documentos de Apoyo" />
              </SimpleShowLayout>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

interface OrdenCompraListProps {
  statusFilters: string[];
}

const OrdenCompraList = ({ statusFilters }: OrdenCompraListProps) => {
  const { permissions } = usePermissions();
  const buttons = [];
  if (permissions.includes(PermissionsOrdersEdit)) {
    buttons.push(<EditButton key="editar" label="Editar" fullWidth />);
  }
  if (permissions.includes(PermissionsOrdersDelete)) {
    buttons.push(
      <DeleteWithConfirmButton key="borrar" label="Borrar" fullWidth />
    );
  }
  return (
    <List
      storeKey={false}
      resource="ordenes-compra"
      filters={OrdenCompraFilters}
      filterDefaultValues={{
        status: statusFilters,
      }}
      actions={<ListActions />}
      title="Ordenes de Compra"
      empty={false}
      pagination={<OrdersPagination />}
      perPage={500}
    >
      <Datagrid
        expand={OrdenCompraShow}
        bulkActionButtons={false}
        sx={{
          "& .column-producto": {
            maxWidth: "18em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
          "& .column-docs_produccion": {
            maxWidth: "18em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
          "& .column-docs_orden": {
            maxWidth: "18em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
          "& .column-docs_presupuesto": {
            maxWidth: "18em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
          "& .column-cliente": {
            maxWidth: "18em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      >
        <TextField source="diacril_id" label="Id" />
        <DateField
          source="fecha_programacion"
          label="Fecha Ingreso"
          locales="es-MX"
        />
        <TextField source="numero_orden" label="Numero Orden" />
        <ClienteField
          label="Cliente/Usuario"
          reference="clientes"
          source="cliente"
          link={false}
        />
        {permissions.includes(PermissionsPricesGet) && (
          <FilesList source="docs_orden" label="Orden Compra" />
        )}

        {permissions.includes(PermissionsPricesGet) ? (
          <ProductoField source="producto" label="Producto" />
        ) : (
          <TextField source="producto" label="Producto" />
        )}

        {permissions.includes(PermissionsPricesGet) && (
          <FilesList source="docs_presupuesto" label="Presupuesto" />
        )}
        <FilesList source="docs_produccion" label="Orden Producción" />
        <PriorodadChip source="prioridad" label="Prioridad" />
        <StatusChip source="status" label="Status" />
        {permissions.includes(PermissionsPricesGet) && (
          <NumberField
            source="importe_total"
            options={{
              style: "currency",
              currency: "MXN",
              minimumFractionDigits: 2,
            }}
          />
        )}
        {(permissions.includes(PermissionsOrdersEdit) ||
          permissions.includes(PermissionsOrdersDelete)) && (
          <LongMenu options={buttons} />
        )}
      </Datagrid>
    </List>
  );
};

const OrdersPagination = () => (
  <Pagination rowsPerPageOptions={[50, 100, 200, 500]} />
);

export default OrdenCompraList;
