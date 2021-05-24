import {Component, Input, OnInit} from '@angular/core';
import {FullEntry} from '../../../_model/fullEntry';
import {MenuGroup} from '../../../_model/menu.group';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-entry-box[entryGroup][entry]',
  templateUrl: './wiki-entry-box.component.html',
  styleUrls: ['./wiki-entry-box.component.scss']
})
export class WikiEntryBoxComponent implements OnInit {
  @Input() entryGroup: MenuGroup;
  @Input() entry: FullEntry;
  @Input() textStyleClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
