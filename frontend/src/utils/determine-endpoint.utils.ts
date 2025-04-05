type DetermineEndpoint = {
    defaultEndpoint: string,
    limit?: number,
    latest?: boolean
}

export const determineEndpoint = ({defaultEndpoint, limit, latest}: DetermineEndpoint): string => {
  const endpoint: string = limit ? `${defaultEndpoint}?limit=${limit}&latest=${latest}` : defaultEndpoint;
  return endpoint;
}
