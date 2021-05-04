import { Component, OnInit, ViewChild } from '@angular/core';

import { BasicAuthenticaitonService } from './../core/services/basic-authenticaiton.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  user: string;

  constructor(
    private basicAuthenticaitonService: BasicAuthenticaitonService,
  ) { }

  ngOnInit(): void {
    this.user = this.basicAuthenticaitonService.getAuthenticatedUser();
  }

  logout(): void {
    this.basicAuthenticaitonService.logout();
  }

}
