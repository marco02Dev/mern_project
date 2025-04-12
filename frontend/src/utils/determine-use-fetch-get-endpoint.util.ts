type DetermineUseFetchGetEndpoint = {
  defaultEndpoint: string,
  limit?: number,
  latest?: boolean,
  category?: string,
  _id?: string,
  productsId?: string[] | false | null
}

export const determineUseFetchGetEndpoint = ({defaultEndpoint, limit, latest, category, _id, productsId}: DetermineUseFetchGetEndpoint): string => {

  let productsIdQuery: string[] | null = null;

  if(productsId && !productsId !== null ) {
    productsIdQuery = productsId.map((productId) => {
      return `productsId[]=${productId}`
    })
  }

  const isLatest: string = latest ? "true" : "false";
  const endpoint: string = limit && !category && !productsId
  ? `${defaultEndpoint}?limit=${limit}&latest=${isLatest}` : 
  category && !_id && !productsId ? `${defaultEndpoint}/${category}?limit=${limit}` : 
  _id && !productsId ? `${defaultEndpoint}/${category}/${_id}` : 
  productsId && productsIdQuery !== null ? `${defaultEndpoint}/?${productsIdQuery?.join("&")}` : defaultEndpoint;

  return endpoint;
}
