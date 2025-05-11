export const capitalizeFirstLetter = (element: string): string => {
    return element
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' '); 
};
  