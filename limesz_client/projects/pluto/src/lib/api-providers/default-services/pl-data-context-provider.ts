import { Injectable } from '@angular/core';
import { DataContextProvider } from '../data-context-provider';
import { DataContext } from '../data-context';

@Injectable()
export class PlDataContextProvider implements DataContextProvider {
  private dataContext: DataContext = {};

  getDataContext(): DataContext {
    return this.dataContext;
  }

  setDataContext(value: DataContext) {
    this.dataContext = value;
  }



}
