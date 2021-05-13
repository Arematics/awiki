import {SmallEntry} from './smallEntry';
import {MenuGroup} from './menu.group';

export interface FullEntry extends SmallEntry {
  image: string;
  content: string;
  calls: number;
}
