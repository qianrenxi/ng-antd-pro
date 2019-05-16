import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'demo-drag-drop-demo',
  templateUrl: './drag-drop-demo.component.html',
  styleUrls: ['./drag-drop-demo.component.scss']
})
export class DragDropDemoComponent implements OnInit {

  tabs = [
    {label: 'Draggable', link: "draggable"},
    {label: 'Droppable', link: "droppable"},
    // {label: 'Resizable', link: "resizable"},
    // {label: 'Selectable', link: "selectable"},
    {label: 'Sortable', link: "sortable"},
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  tabChange({index, tab, tabItem}) {
    this.router.navigate([tabItem.link], {relativeTo: this.route})
  }

}
