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
			name: 'Public',
			subnav: [
				{
					name: 'Group',
					icon: './assets/media/icons/duotune/communication/com014.svg',
					link: '/group/new',
				}
			]
		},
		{
			name: 'Private',
			subnav: [
				{
					name: 'My Group',
					icon: './assets/media/icons/duotune/communication/com014.svg',
					subnav: [
						{
							name: 'Summary',
							icon: '',
							link: ''
						},
						{
							name: 'Skills',
							icon: '',
							link: ''
						},
						{
							name: 'Bosses',
							icon: '',
							link: ''
						},
						{
							name: 'Items',
							icon: '',
							link: ''
						},
						{
							name: 'Quests',
							icon: '',
							link: ''
						}
					]
				},
				{
					name: 'Item Catelog',
					icon: './assets/media/icons/duotune/general/gen017.svg',
					link: '/item'
				}
			]
		}
	];

	constructor(){}

	ngOnInit(): void {

	}
}
