import {SmallEntry} from './smallEntry';

export interface FullEntry extends SmallEntry {
  image: string;
  content: string;
  calls: number;
}
