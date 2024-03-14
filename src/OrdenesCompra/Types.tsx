import {
  ChipField,
  ReferenceField,
  TextField,
  useRecordContext,
} from "react-admin";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const OrdenStatusChoice = [
  { id: "1-RECIEN_LLEGADA", name: "1 - Orden Nueva", color: "color1" },
  { id: "2-CON_INFO", name: "2 - Sin OP", color: "color2" },
  {
    id: "3-ORDEN_PRODUCCION",
    name: "3 - Con OP",
    color: "color3",
  },
  { id: "4-TRABAJANDO", name: "4 - En produccion", color: "color4" },
  { id: "5-IMPRESION", name: "5 - Diseño", color: "color5" },
  { id: "6-CORTE", name: "6 - Corte", color: "color6" },
  { id: "F-POR_FACTURAR", name: "F - Por Facturar", color: "color7" },
  { id: "0-ORDEN_ABIERTA", name: "0 - Orden Abierta", color: "color8" },
  { id: "A-ANUALIZADO", name: "A - Anualizado", color: "color9" },
  { id: "C-CANCELADA", name: "C - Cancelada", color: "color10" },
];

export const OrdenStatusChoiceSimple = [
  { id: "1-RECIEN_LLEGADA", name: "1", color: "color1" },
  { id: "2-CON_INFO", name: "2", color: "color2" },
  {
    id: "3-ORDEN_PRODUCCION",
    name: "3",
    color: "color3",
  },
  { id: "4-TRABAJANDO", name: "4", color: "color4" },
  { id: "5-IMPRESION", name: "5", color: "color5" },
  { id: "6-CORTE", name: "6", color: "color6" },
  { id: "F-POR_FACTURAR", name: "F", color: "color7" },
  { id: "0-ORDEN_ABIERTA", name: "0", color: "color8" },
  { id: "A-ANUALIZADO", name: "A", color: "color9" },
  { id: "C-CANCELADA", name: "C", color: "color10" },
];

export const PrioridadChoice = [
  { id: 1, name: "Normal" },
  { id: 2, name: "Alta" },
  { id: 3, name: "Urgente" },
];

export interface ChipProps {
  source: string;
  label: string;
}

export const PriorodadChip = ({ source, label }: ChipProps) => {
  const record = useRecordContext();
  let value = record[source];
  const registro = PrioridadChoice.find((item) => item.id === value);
  record["prioridad_field_rendered"] = registro ? registro.name : undefined;

  let color = "default";

  switch (value) {
    case 1:
      color = "success";
      break;
    case 2:
      color = "warning";
      break;
    case 3:
      color = "error";
      break;
    default:
      color = "default"; // Puedes personalizar el valor predeterminado
      break;
  }

  return (
    <ChipField source="prioridad_field_rendered" label={label} color={color} />
  );
};

export const ProductoField = () => {
  const record = useRecordContext();
  return (
    <Link
      to={`/ordenes-compra/${record.id}/1`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <TextField source="producto" label="Producto" />
    </Link>
  );
};

export const ClienteField = () => {
  const record = useRecordContext();
  return (
    <ReferenceField
      label="Cliente/Usuario"
      reference="clientes"
      source="cliente"
      link={false}
    >
      <TextField source="nombre" sx={{ fontWeight: "bold" }} />
      <Typography variant="body2" color="textSecondary">
        {record.usuario}
      </Typography>
    </ReferenceField>
  );
};
