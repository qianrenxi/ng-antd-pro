import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'demo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  tabs = [
    {label: '文章', link: "articles"},
    {label: '项目', link: "projects"},
    {label: '应用', link: "applications"},
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  tabChange({index, tab, tabItem}) {
    this.router.navigate([tabItem.link], {relativeTo: this.route})
  }
}
