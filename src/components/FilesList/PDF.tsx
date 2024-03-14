import React, { useEffect, useState } from "react";
import { Loading } from "react-admin";

export interface PDFProps {
  uuid: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDownload: (fileURL: string) => void;
}

export const PDF = ({ uuid, loading, setLoading, setDownload }: PDFProps) => {
  const [blob, setBlob] = useState("");
  const [error, setError] = useState<string | null>(null);

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
      setDownload(pdfURL);
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
      title="Vizualizador"
      src={blob}
      width="100%"
      height="1000px" // Establece la altura y el ancho según tus necesidades
      frameBorder="0" // ! Esta deprecado prueba si no hay XD
    />
  );
};
