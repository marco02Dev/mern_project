type DetermineEndpoint = {
  defaultEndpoint: string,
  limit?: number,
  latest?: boolean,
  category?: string
}

export const determineEndpoint = ({defaultEndpoint, limit, latest, category}: DetermineEndpoint): string => {
  const isLatest: string = latest ? "true" : "false";
  const endpoint: string = limit && !category ? `${defaultEndpoint}?limit=${limit}&latest=${isLatest}` : category ? `${defaultEndpoint}/${category}?limit=${limit}` : defaultEndpoint;

  return endpoint;
}
