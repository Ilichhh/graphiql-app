import { DocumentData } from '@firebase/firestore';

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

export interface QueryTemplateData {
  id: string;
  data: DocumentData;
}
