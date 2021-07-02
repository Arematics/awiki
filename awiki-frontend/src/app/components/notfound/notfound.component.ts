import { Component, OnInit } from '@angular/core';
import {SeoService} from '../../_service/seo.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateTitle('Error Page - Arematics Wiki');
  }

}
