export interface Add {
  title: string;
  school: string;
  description: string;
  spotify?: string;
  youtube?: string;
}
export interface Creation {
  id: string;
  title: string;
  school: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  spotify: string;
  youtube: string;
  files: string[];
  fileURLS: string[];
}
