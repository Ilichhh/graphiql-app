export enum Tab {
  Variables = 'variables',
  Headers = 'headers',
}

export enum FormMode {
  Login = 'login',
  Register = 'register',
}

export enum SidebarTabs {
  Templates = 'templates',
  History = 'history',
}

export interface queryTemplateData {
  endpoint: string;
  name: string;
  query: string;
  variables: string;
  headers: string;
}
