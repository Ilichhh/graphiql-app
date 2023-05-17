export enum Tab {
  Variables = 'variables',
  Headers = 'headers',
}

export enum FormMode {
  Login = 'login',
  Register = 'register',
}

export interface queryTemplateData {
  name: string;
  query: string;
  variables: string;
  headers: string;
}
