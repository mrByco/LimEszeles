import { DataContext } from './data-context';

export abstract class DataContextProvider {
  public static instance: DataContextProvider;

  constructor() {
    if (DataContextProvider.instance) {
      throw new Error("DataContextProvider created multiple times");
    }
    DataContextProvider.instance = this;
  }

  abstract getDataContext(): DataContext;
  abstract setDataContext(value: DataContext);

}
