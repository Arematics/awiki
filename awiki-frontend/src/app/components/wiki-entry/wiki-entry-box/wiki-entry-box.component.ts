import {Component, Input, OnInit} from '@angular/core';
import {FullEntry} from '../../../_model/fullEntry';
import {MenuGroup} from '../../../_model/menu.group';

@Component({
  selector: 'app-entry-box[entryGroup][entry]',
  templateUrl: './wiki-entry-box.component.html',
  styleUrls: ['./wiki-entry-box.component.scss']
})
export class WikiEntryBoxComponent implements OnInit {
  @Input() entryGroup: MenuGroup;
  @Input() entry: FullEntry;
  @Input() textStyleClass: string;
  modules;

  constructor() {}

  ngOnInit(): void {
    this.modules = {
      history: {          // Enable with custom configurations
        delay: 2500,
        userOnly: true
      },
      syntax: true        // Enable with default configuration
    };
  }
}
