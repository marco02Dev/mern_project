type DetermineUseFetchGetEndpoint = {
  defaultEndpoint: string,
  limit?: number,
  latest?: boolean,
  category?: string,
  _id?: string,
  productsId?: string[] | false | null
}

export const determineUseFetchGetEndpoint = ({
  defaultEndpoint,
  limit,
  latest,
  category,
  _id,
  productsId
}: DetermineUseFetchGetEndpoint): string => {

  console.log("== Parametri ricevuti ==");
  console.log("defaultEndpoint:", defaultEndpoint);
  console.log("limit:", limit);
  console.log("latest:", latest);
  console.log("category:", category);
  console.log("_id:", _id);
  console.log("productsId:", productsId);

  let productsIdQuery: string[] | null = null;

  if (Array.isArray(productsId) && productsId.length > 0) {
    productsIdQuery = productsId.map((productId) => `productsId[]=${productId}`);
    console.log("productsIdQuery costruito:", productsIdQuery);
  }

  const isLatest = latest ? "true" : "false";
  let endpoint: string;

  if (limit && !category && !productsId) {
    console.log("-> Usato ramo: limit + latest senza category/productsId");
    endpoint = `${defaultEndpoint}?limit=${limit}&latest=${isLatest}`;
  } else if (category && !_id && !productsId) {
    console.log("-> Usato ramo: category senza ID o productsId");
    endpoint = `${defaultEndpoint}/${category}?limit=${limit}`;
  } else if (_id && !productsId) {
    console.log("-> Usato ramo: _id presente, senza productsId");
    endpoint = `${defaultEndpoint}/${category}/${_id}`;
  } else if (Array.isArray(productsId) && productsId.length > 0 && productsIdQuery !== null) {
    console.log("-> Usato ramo: productsId presenti");
    endpoint = `${defaultEndpoint}/?${productsIdQuery.join("&")}`;
  } else {
    console.log("-> Usato ramo: default con latest");
    endpoint = `${defaultEndpoint}?latest=${isLatest}`;
  }

  console.log("== Endpoint finale generato ==", endpoint);
  return endpoint;
}
