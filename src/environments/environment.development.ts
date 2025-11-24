export interface EnvConfig {
  production: boolean;
  apiUrl: string;
}

export const environment: EnvConfig = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
