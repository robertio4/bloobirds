export const apis: Record<string, string> = {
  localhost: 'http://localhost:8082',
  development: 'https://jwt-api.dev-bloobirds.com',
  'development.local': 'https://jwt-api.dev-bloobirds.com',
  production: 'https://gateway.bloobirds.com/auth',
  'production.local': 'https://gateway.bloobirds.com/auth',
};

export const webApis: Record<string, string> = {
  localhost: 'http://localhost:8081',
  development: 'https://web-api.dev-bloobirds.com',
  'development.local': 'https://web-api.dev-bloobirds.com',
  production: 'https://gateway.bloobirds.com/utils',
  'production.local': 'https://gateway.bloobirds.com/utils',
};

export const appUrls: Record<string, string> = {
  localhost: 'http://localhost:3000',
  development: 'https://app.dev-bloobirds.com',
  'development.local': 'http://localhost:3000',
  production: 'https://app.bloobirds.com',
  'production.local': 'http://localhost:3000',
};

export const authUrls: Record<string, string> = {
  localhost: 'http://localhost:5173',
  development: 'https://auth.dev-bloobirds.com',
  'development.local': 'http://localhost:5173',
  production: 'https://auth.bloobirds.com',
  'production.local': 'http://localhost:5173',
};

export const getApiUrl = () => apis[import.meta.env.MODE];
export const getAppUrl = () => appUrls[import.meta.env.MODE];
export const getAuthUrl = () => authUrls[import.meta.env.MODE];
export const getWebApiUrl = () => webApis[import.meta.env.MODE];
