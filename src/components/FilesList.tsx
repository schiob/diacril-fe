import React from "react";
import { useState, useEffect } from "react";
import { Button, FileField, Loading, useRecordContext } from "react-admin";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

interface FilesListProps {
  source: string;
  label?: string;
}

export const FilesList = ({ source }: FilesListProps) => {
  const record = useRecordContext();
  let value;
  value = record[source];

  if (Array.isArray(value)) {
    return (
      <>
        {value.map((file, index) => {
          const fileTitleValue = file.title;
          const srcValue = file.src;

          return (
            <li key={index}>
              <PDFButton title={fileTitleValue} uuid={srcValue} />
            </li>
          );
        })}
      </>
    );
  } else {
    if (record.id == undefined) {
      return <FileField source="src" title="title" target="_blank" />;
    } else {
      return <PDFButton title={record.title} uuid={record.src} />;
    }
  }
};

interface PDFButtonProps {
  title: string;
  uuid: string;
}

function PDFButton({ title, uuid }: PDFButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [a, setA] = useState(document.createElement("a"));
  
  const handleClick = () => {
    setShowDialog(true);
  };
  
  const handleCloseClick = () => {
    setShowDialog(false);
  };
  
  const setDownload = (fileURL: string) => {
    let copya = a
    copya.download = title
    copya.href = fileURL;
    setA(copya);
  }

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
          <PDF uuid={uuid} loading={loading} setLoading={setLoading} setDownload={setDownload} />
        </DialogContent>
      </Dialog>
    </>
  );
}

interface PDFProps {
  uuid: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDownload: (fileURL: string) => void;
}

const PDF = ({ uuid, loading, setLoading, setDownload }: PDFProps) => {
  const [blob, setBlob] = useState("");
  const [error, setError] = useState(null);

  const handlePDF = async () => {
    setBlob("");
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(uuid, {
        method: "GET",
        headers,
      });
      const blob = await response.blob();
      const pdfURL = URL.createObjectURL(blob);
      setBlob(pdfURL);
      setDownload(pdfURL)
    } catch (e) {
      setError("error al descargar archivo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await handlePDF();
    })();
  }, [uuid]);

  if (error) return <>error</>;
  if (loading) return <Loading />;

  return (
    <iframe
      title="Visualizador"
      src={blob}
      width="100%"
      height="1000px" // Establece la altura y el ancho según tus necesidades
      frameBorder="0"
    />
  );
};
