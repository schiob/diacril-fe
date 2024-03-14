import { useEffect } from "react";
import { Loading, SelectInput, useGetOne } from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";

export const PartidaConnector = () => {
  const { setValue } = useFormContext();
  const partidas = useWatch({ name: "partidas" });

  useEffect(() => {
    if (partidas) {
      const total: number = partidas.reduce(
        (acumulador: number, elemento: any) =>
          acumulador + elemento.precio_unitario * elemento.cantidad,
        0
      );
      setValue("importe_total", total);
    }
  }, [partidas, setValue]);

  return <></>;
};

export const SelectUserClientInput = ({ formData, ...rest }) => {
  if (formData.cliente === undefined) {
    return <SelectInput source="usuario" choices={[]} {...rest} />;
  }

  const { data, isLoading, error, refetch } = useGetOne("clientes", {
    id: formData.cliente,
  });

  let choices = [];
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>error</p>;
  }
  if (data.usuarios != undefined) {
    choices = data.usuarios.map((value) => ({
      id: value.nombre,
      name: value.nombre,
    }));
  }

  return <SelectInput source="usuario" choices={choices} {...rest} />;
};
