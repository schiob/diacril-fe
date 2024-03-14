import { FileField, useRecordContext } from "react-admin";

import { PDFButton } from "./PDFButton";

export interface FilesListProps {
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
