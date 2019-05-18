import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-grid-region',
  templateUrl: './grid-region.component.html',
  styleUrls: ['./grid-region.component.scss']
})
export class GridRegionComponent implements OnInit {

  rows = [1, 2];

  constructor() { }

  ngOnInit() {
  }

}
