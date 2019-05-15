import { Component, OnInit, Input, ContentChildren, QueryList } from '@angular/core';
import { DescriptionComponent } from '../description/description.component';
import { NzListGrid } from 'ng-zorro-antd';

@Component({
  selector: 'np-description-list, np-desc-list',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.scss']
})
export class DescriptionListComponent implements OnInit {
  
  @Input() title: string;
  @Input() nzGrid: NzListGrid;
  
  @ContentChildren(DescriptionComponent) children: QueryList<DescriptionComponent>;

  constructor() { }

  ngOnInit() {
  }

}
