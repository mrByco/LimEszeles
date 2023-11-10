import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { getPropertyByJsPath } from '../../../helpers/apollo-resource-utils';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() rowClicked = new EventEmitter<any>()

  @Input() set input(input: GenericTableInput) {
    this._input = input;
    this.loadData();
    this.displayedColumns = input.displayedColumns;
  }

  protected _input: GenericTableInput = {
    displayedColumns: [],
    allColumns: [],
    loadDataPaginated: async (pageNumber: number, pageSize: number, orderByFilterData?: OrderFilterData) => {
      return {
        data: [],
        total: 0,
      }
    },
  };

  async loadData(){
    const data = await this._input.loadDataPaginated(0, 10);
    this.dataSource.data = data.data;
    this.dataSource.paginator.length = data.total;
    this.initialLoadDone = true;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    setTimeout(() => {
      this.loadSortAndFilterSettings();


      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.dataSource.connect().subscribe(d => {

      });

      this.paginator.page.subscribe(() => {
        this.loadData();
      });
      this.sort.sortChange.subscribe(() => {
        this.loadData();
      })
      this.loadData();
    }, 0)

  }

  public getFilter() {
    return {
      pageSize: this.paginator?.pageSize??5,
      skipPages: this.paginator?.pageIndex??0,
      sortBy: this.sort?.active,
      sortDescending: this.sort?.direction == 'desc'
    }
  }

  private saveSortAndFilterSettings() {
    const settings: any = this.getFilter();
    localStorage.setItem(
      `${'someprefix123'}-sort-filter`,
      JSON.stringify(settings)
    );
  }

  private loadSortAndFilterSettings() {
    const settingsString = localStorage.getItem(
      `${'someprefix123'}-sort-filter`
    );

    if (settingsString) {
      const settings: any = JSON.parse(settingsString);
      this.paginator.pageSize = settings.pageSize;
      this.paginator.pageIndex = settings.skipPages;
      this.sort.active = settings.sortByEmail ? 'email' : 'date';
      this.sort.direction = settings.sortDescending ? 'desc' : 'asc';
    }
  }

  initialLoadDone = false;
  protected readonly getPropertyByJsPath = getPropertyByJsPath;
}

export interface GenericTableInput {
  displayedColumns: string[];
  allColumns: {
    name: string;
    displayName: string;
    canSortBy?: boolean;
    accessor: (value: any) => any;
  }[];
  loadDataPaginated: (pageNumber: number, pageSize: number, orderByFilterData?: OrderFilterData) => Promise<{data: any[], total: number}>;
}

export interface OrderFilterData {
  orderByColumn: string;
  orderDirection: 'asc' | 'desc';
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
