import {SmallEntry} from './smallEntry';

export interface FullEntry extends SmallEntry {
  menuGroup: number;
  image: string;
  content: string;
  published: boolean;
  calls: number;
}
