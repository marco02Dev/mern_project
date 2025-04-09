type DetermineEndpoint = {
  defaultEndpoint: string,
  limit?: number,
  latest?: boolean,
  category?: string,
  _id?: string
}

export const determineEndpoint = ({defaultEndpoint, limit, latest, category, _id}: DetermineEndpoint): string => {
  const isLatest: string = latest ? "true" : "false";
  const endpoint: string = limit && !category 
  ? `${defaultEndpoint}?limit=${limit}&latest=${isLatest}` : 
  category && !_id ? `${defaultEndpoint}/${category}?limit=${limit}` : 
  _id ? `${defaultEndpoint}/${category}/${_id}` : defaultEndpoint;

  return endpoint;
}
