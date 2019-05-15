import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-simple-grid-layout',
  templateUrl: './simple-grid-layout.component.html',
  styleUrls: ['./simple-grid-layout.component.scss']
})
export class SimpleGridLayoutComponent implements OnInit {

  items = [
    {
      label: "0",
      rect: {x: 0, y: 0, w: 3, h: 2}
    },
    {
      label: "1",
      rect: {x: 0, y: 2, w: 2, h: 2}
    },
    {
      label: "2",
      rect: {x: 4, y: 0, w: 2, h: 3}
    },
    {
      label: "3",
      rect: {x: 7, y: 0, w: 2, h: 3}
    },
    {
      label: "4",
      rect: {x: 9, y: 0, w: 2, h: 3}
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  addItem() {
    
  }
}
