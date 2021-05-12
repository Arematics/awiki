import {SmallEntry} from './smallEntry';

export interface MenuGroup{
  id: number;
  title: string;
  orderIndex: number;
  entries: SmallEntry[];
}
