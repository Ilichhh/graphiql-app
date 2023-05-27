import { DocumentData } from '@firebase/firestore';

export enum EditorToolsTab {
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
  Settings = 'settings',
}

export enum SidebarModalMode {
  Save = 'save',
  Rename = 'rename',
  Delete = 'delete',
  ClearHistory = 'clearHistory',
}

export interface QueryTemplateData {
  id: string;
  data: DocumentData;
}

export interface RunHistoryData {
  id: string;
  timestamp: number;
  data: DocumentData;
}
