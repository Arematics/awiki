import {WikiEntry} from './wiki.entry';

export interface MenuGroup{
  id: number;
  title: string;
  orderIndex: number;
  entries: WikiEntry[];
}
