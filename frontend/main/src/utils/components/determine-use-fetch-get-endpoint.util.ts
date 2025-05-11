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

  let productsIdQuery: string[] | null = null;

  if (Array.isArray(productsId) && productsId.length > 0) {
    productsIdQuery = productsId.map((productId) => `productsId[]=${productId}`);
  }

  const isLatest = latest ? "true" : "false";
  let endpoint: string;

  if (limit && !category && !productsId) {
    endpoint = `${defaultEndpoint}?limit=${limit}&latest=${isLatest}`;
  } else if (category && !_id && !productsId) {
    endpoint = `${defaultEndpoint}/${category}?limit=${limit}`;
  } else if (_id && !productsId) {
    endpoint = `${defaultEndpoint}/${category}/${_id}`;
  } else if (Array.isArray(productsId) && productsId.length > 0 && productsIdQuery !== null) {
    endpoint = `${defaultEndpoint}/?${productsIdQuery.join("&")}`;
  } else {
    endpoint = `${defaultEndpoint}?latest=${isLatest}`;
  }
  return endpoint;
}
