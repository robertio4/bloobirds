export const webApis: Record<string, string> = {
  localhost: 'http://localhost:8081',
  development: 'https://gateway.dev-bloobirds.com',
  production: 'https://gateway.bloobirds.com',
};

export const getWebApiUrl = () => webApis[import.meta.env.MODE];
