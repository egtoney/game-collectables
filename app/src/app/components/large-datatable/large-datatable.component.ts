import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
declare var $: JQueryStatic;

@Component({
  selector: 'app-large-datatable',
  templateUrl: './large-datatable.component.html',
  styleUrls: ['./large-datatable.component.scss']
})
export class LargeDatatableComponent implements OnInit {

  @Input()
  public dtOptions: DataTables.Settings;
  @Input()
  public dtTrigger: Subject<any>;
  public dftOptions: DataTables.Settings;
  public dispRows: any[] | undefined = [];
  public dispPages: any[];
  public totalPages: number;
  public currPage: number;
  public startIndex: number;
  public endIndex: number;
  public totalRows: number;
  public selectedSortAscCol: string | null;
  public selectedSortDesCol: string | null;
  public filterText: string;
  @ViewChild("dtable")
  public table: ElementRef;

  constructor(private ref: ChangeDetectorRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.dftOptions = {
      paging: true,
      pageLength: 10,
    }

    this.dtTrigger.subscribe(() => {
      this.selectPage(0);
      this.ref.detectChanges();
    })
  }

  afterRender() {
    // for some reason waiting 0 seconds results in the td elements being rendered
    setTimeout(() => {
      const callback = this.getOption('rowCallback')
      if (callback) {
        try {
          const htmlRows = $(this.table.nativeElement).find('tbody tr');
          for (let i=0 ; i<htmlRows.length ; i++) {
            callback(htmlRows[i], this.dispRows?.[i], i);
          }
        } catch(e) {
          console.error(e);
        }
      }
    }, 0);
  }

  getOption(name: string): any {
    return _.get(this.dtOptions, name, _.get(this.dftOptions, name));
  }

  ngOnChanges(): void {
  }

  getRowValue(row: any, column: any) {
    const data = row[column.data];
    if (column.render) {
      return column.render(data, null, row);
    } else {
      return data;
    }
  }

  trackRow(index: number, row: any) {
    return row.CheckorEFTTraceNumber;
  }
  
  updatePages() {
    let leftPage = this.currPage - 2;
    let rightPage = this.currPage + 2;
    let delta = 0;
    if (leftPage < 0) {
      delta = 0 - leftPage;
    }
    if (rightPage > this.totalPages) {
      delta = this.totalPages - rightPage;
    }
    leftPage += delta;
    rightPage += delta;

    leftPage = Math.max(leftPage, 0);
    rightPage = Math.min(rightPage, this.totalPages)

    this.dispPages = [];
    for (let i=leftPage ; i<=rightPage ; i++) {
      this.dispPages.push(i);
    }
  }

  clickPage(e: any, page: number) {
    e.preventDefault();

    this.selectPage(page);
  }

  compare(a: any, b: any): number {
    if (isNaN(a) && isNaN(b)) {
      return a < b
        ? -1
        : a > b
        ? 1
        : 0;
    } else {
      return a - b;
    }
  }

  selectPage(page: number) {
    let rows: any[] = this.getOption('data');
    const pageLength = this.getOption('pageLength');

    // filter rows
    if (this.filterText) {
      rows = rows.filter(row => Object.values(row).find(val => String(val).toLowerCase().includes(this.filterText)))
    }

    // sort rows asc
    if (this.selectedSortAscCol) {
      const ascCol = this.selectedSortAscCol;
      rows = rows.slice(0, rows.length);
      rows.sort((a, b) => this.compare(a[ascCol], b[ascCol]));
    }
    // sort rows dec
    if (this.selectedSortDesCol) {
      const desCol = this.selectedSortDesCol;
      rows = rows.slice(0, rows.length);
      rows.sort((a, b) => this.compare(b[desCol], a[desCol]));
    }

    this.totalRows = rows.length;
    this.totalPages = Math.floor(this.totalRows / this.getOption('pageLength'));
    this.startIndex = page * pageLength;
    this.endIndex = Math.min(this.totalRows, (page + 1) * pageLength);
    this.dispRows = rows.slice(this.startIndex, this.endIndex);
    this.currPage = page;

    this.updatePages();
  }

  changePageSize(e: any) {
    const pageLength = e.target.value;
    if (this.dtOptions.pageLength != pageLength) {
      this.dtOptions.pageLength = pageLength;
      this.totalPages = Math.floor(this.totalRows / pageLength);
      this.selectPage(0);
    }
  }

  changeFilter(e: any) {
    this.filterText = e.target.value.toLowerCase();
    this.selectPage(0);
  }

  sortBy(col: any) {
    if (this.selectedSortDesCol == col) {
      this.selectedSortAscCol = null;
      this.selectedSortDesCol = null;
    } else if (this.selectedSortAscCol == col) {
      this.selectedSortAscCol = null;
      this.selectedSortDesCol = col;
    } else {
      this.selectedSortAscCol = col;
      this.selectedSortDesCol = null;
    }

    this.selectPage(this.currPage);
  }

}
