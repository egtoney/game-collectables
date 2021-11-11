import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  navSections: any = [
    {
      name: 'Pages',
      subnav: [
        {
          name: 'Reports',
          icon: './assets/media/icons/duotune/text/txt001.svg',
          subnav: [
            {
              name: '835',
              link: '/reports/835',
            }
          ]
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {

  }
}
