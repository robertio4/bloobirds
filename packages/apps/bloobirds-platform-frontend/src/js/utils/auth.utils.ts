export function isAuth(hostname: string): boolean {
  //If the page is: localhost:5173, auth.bloobirds.com or auth.dev-bloobirds.com do not inject the app
  if (
    hostname === 'localhost' ||
    hostname === 'auth.bloobirds.com' ||
    hostname === 'auth.dev-bloobirds.com'
  ) {
    return true;
  }
  return false;
}
