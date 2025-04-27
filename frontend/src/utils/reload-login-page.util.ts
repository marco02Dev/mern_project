export const reloadLoginPage = (): void => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };