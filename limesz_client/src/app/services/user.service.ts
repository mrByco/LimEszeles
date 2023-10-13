// This services manages users data

import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { UserProfileDto } from "../api/models";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { UserService as UserApi } from "../api/services";
import {LoadingService} from "./loading.service";
import { Player } from '../ride';

@Injectable()
export class UserService {

    public currentUser$: BehaviorSubject<UserProfileDto | undefined> = new BehaviorSubject<UserProfileDto | undefined>(undefined);
    public currentUser: UserProfileDto | undefined = undefined;

    constructor(private authService: AuthService, private userApi: UserApi, private loadingService: LoadingService) {
        this.currentUser$.subscribe(user => this.currentUser = user);
        authService.Authenticated$.subscribe(auth => {
            if (!auth) {
                this.currentUser$.next(undefined);
                return;
            }
            this.RefreshCurrentUser();
        });
    }

    public async RefreshCurrentUser() {
        if (!this.authService.Authenticated) {
            this.currentUser$.next(undefined);
            return;
        }
        try {
            let user = await this.loadingService.waitFirstValueFrom(this.userApi.userGet$Json());
            this.currentUser$.next(user);
        }
        catch {
            console.error("Error while refreshing current user");
            this.currentUser$.next(undefined);
        }
    }

  public async deleteUser() {
    await firstValueFrom(this.userApi.userDelete());
    this.authService.Logout();


  }

  getMeAsPlayer(): Player {
    return {
      id: this.currentUser$.value?.id ?? "",
      name: this.currentUser$.value?.name ?? "",
    }
  }
}
