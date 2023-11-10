import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  faSearch = faSearch;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  @Output() searchValueChange: EventEmitter<string> = new EventEmitter<string>();
  public get searchValue(): string {
    return this._searchValue;
  }
  @Input()
  public set searchValue(value: string) {
    this._searchValue = value;
    this.searchValueChange.emit(value);
  }
  private _searchValue: string = "";

  search() {
    this.onSearch.emit(this.searchValue);
  }
}
