import {Component, Input, OnInit} from '@angular/core';
import {MenuGroup} from '../../../_model/menu.group';
import {ActivatedRoute} from '@angular/router';
import {FullEntry} from '../../../_model/fullEntry';

@Component({
  selector: 'app-group[group]',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() group: MenuGroup;
  open = true;
  activeEntry: FullEntry = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.activeEntry = data.entry;
    });
  }
}
