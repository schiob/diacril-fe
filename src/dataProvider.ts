import jsonServerProvider from "./jsonDataProvider";
import {
  addRefreshAuthToDataProvider,
  DataProvider,
  fetchUtils,
  withLifecycleCallbacks,
} from "react-admin";
import { refreshAuth } from "./authProvider";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const customHeaders = (options.headers ||
    new Headers({
      Accept: "application/json",
    })) as Headers;
  const token = localStorage.getItem("token");
  customHeaders.set("Authorization", `Bearer ${token}`);
  options.headers = customHeaders;
  return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = addRefreshAuthToDataProvider(
  jsonServerProvider(import.meta.env.VITE_JSON_SERVER_URL, httpClient),
  refreshAuth
);

const filesHandle = (fileFields: string[]) => {
  return async (params: Partial<any>, dataProvider: DataProvider<string>) => {
      for (let i = 0; i < fileFields.length; i++) {
        const field = fileFields[i];
        if (params[field]) {
          const newPictures = params[field].filter(
            (p: any) => p.rawFile instanceof File
          );
          const formerPictures = params[field].filter(
            (p: any) => !(p.rawFile instanceof File)
          );

          if (newPictures && newPictures.length > 0) {
            let base64Files = await Promise.all(
              newPictures.map(convertFileToBase64)
            );
            let transformedNewPictures = base64Files.map((file: any) => ({
              src: file.data,
              title: file.title,
            }));

            params[field] = [...transformedNewPictures, ...formerPictures];
          }
        }
      }
      return params;
    };
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        data: reader.result,
        title: file.title,
      });
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

export const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  {
    resource: "ordenes-compra",
    beforeSave: filesHandle(["docs_orden", "docs_produccion", "docs_presupuesto", "docs_apoyo"]),
  },
]);
