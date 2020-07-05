import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  isBasket: boolean;

  constructor(
  private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.isBasket = params.isBasket; });
  }

}
