import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, firstValueFrom } from "rxjs";

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public loading: Observable<boolean> = this.loadingSubject.asObservable();
  public initialLoading: boolean = true;
  private manualLoading: boolean = false;

  public tasks: Promise<unknown>[] = [];

  constructor() {
    this.loading.subscribe((loading) => {
      if (!loading) {
        setTimeout(() => {
          if (!this.loadingSubject.value){
            this.initialLoading = false;
          }
        }, 500);
      }
    });
  }

  private getTasksLoading() {
    return this.tasks.length > 0;
  }

  public async waitFirstValueFrom<T>(objservable: Observable<T>): Promise<T> {
    return await this.addTask(firstValueFrom(objservable));
  }

  public async addTask<T>(task: Promise<T>): Promise<T> {
    this.tasks.push(task);
    this.upadateLoading();
    let result: T | undefined;
    try {
      result = await task;
    }
    catch (e) {
      console.error(e);
    }
    finally {
      this.tasks = this.tasks.filter(t => t != task);
      this.upadateLoading();
      return result as T;
    }
  }

  private upadateLoading() {
    if (this.manualLoading) {
      this.loadingSubject.next(true);
      return;
    }

    this.loadingSubject.next(this.getTasksLoading());
  }

  loadingOn() {
    this.manualLoading = true;
    this.upadateLoading();
  }

  loadingOff() {
    this.manualLoading = false;
    this.upadateLoading();
  }

}
