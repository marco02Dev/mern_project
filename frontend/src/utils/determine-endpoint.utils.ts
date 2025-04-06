type DetermineEndpoint = {
    defaultEndpoint: string,
    limit?: number,
    latest?: boolean,
    category?: boolean
}

export const determineEndpoint = ({defaultEndpoint, limit, latest, category}: DetermineEndpoint): string => {

  const endpoint: string = limit ? `${defaultEndpoint}?limit=${limit}&latest=${latest}` : defaultEndpoint;

  return endpoint;
}
