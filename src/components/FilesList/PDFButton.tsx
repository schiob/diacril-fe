import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Button } from "react-admin";
import { PDF } from "./PDF";

export interface PDFButtonProps {
  title: string;
  uuid: string;
}

export function PDFButton({ title, uuid }: PDFButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [a, setA] = useState(document.createElement("a")); //! Es recomendable usar useRef modificar el estado puede generar renders no deseados

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const setDownload = (fileURL: string) => {
    let copya = a;
    copya.download = title;
    copya.href = fileURL;
    setA(copya);
  };

  const handleDownload = () => {
    console.log(a);
    a.click();
  };

  return (
    <>
      <Button onClick={handleClick} label={title}>
        <PictureAsPdfIcon />
      </Button>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={showDialog}
        onClose={handleCloseClick}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        {!loading && (
          <Button
            label="Descargar"
            aria-label="Descargar"
            onClick={handleDownload}
            sx={{
              position: "absolute",
              right: "44px", // Cambia el valor "44px" para ajustar la posición del botón Descargar
              top: 15,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <DownloadIcon />
          </Button>
        )}
        <IconButton
          aria-label="close"
          onClick={handleCloseClick}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <PDF
            uuid={uuid}
            loading={loading}
            setLoading={setLoading}
            setDownload={setDownload}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
