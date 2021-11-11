import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/_metronic/layout/core/page-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pageInfo: PageInfoService) {
  }

  ngOnInit(): void {
    this.pageInfo.setTitle('Home');
    this.pageInfo.setDescription('This is the home page');
  }

}
