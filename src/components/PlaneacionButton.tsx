import { Button, useNotify } from "react-admin";
import SummarizeIcon from "@mui/icons-material/Summarize";

export const PlaneacionButton = () => {
  const notify = useNotify();

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const post_url =
      import.meta.env.VITE_JSON_SERVER_URL + "/generar-planeacion";

    try {
      const response = await fetch(post_url, {
        method: "POST",
        headers,
      });
      if (response.status === 200) {
        const filename = response.headers.get("X-Filename"); // Obtener el nombre del archivo desde el encabezado personalizado

        const blob = await response.blob();

        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); // Usar el nombre del archivo obtenido
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        const errorText = await response.text();
        notify(`Error: ${errorText}`, { type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button label="Generar planeación" onClick={handleClick}>
      <SummarizeIcon />
    </Button>
  );
};
