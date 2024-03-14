import { VisibilityOff } from "@mui/icons-material";
import { BulkUpdateButton } from "react-admin";
import { ConvertDateToString } from "../utils/parsers";
import { startOfWeek } from "date-fns";

const orden = {
  semana_planeacion: ConvertDateToString(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  ),
  partial: true,
};

interface SetSemanaProps {
  label: string;
}

const SetSemanaButton = ({ label }: SetSemanaProps) => (
  <BulkUpdateButton label={label} data={orden} icon={<VisibilityOff />} />
);

export default SetSemanaButton;
