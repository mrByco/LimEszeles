// This services manages users data

import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Player, UserProfileDto } from '../api/models';
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { UserService as UserApi } from "../api/services";
import {LoadingService} from "./loading.service";
import { getRandomPlayerName } from '../helper/get-random-player-name';

@Injectable()
export class UserService {

    public currentUser$: BehaviorSubject<UserProfileDto | undefined> = new BehaviorSubject<UserProfileDto | undefined>(undefined);
    public currentUser: UserProfileDto | undefined = undefined;
    public get userId(){
        return this.currentUser?.id ?? localStorage.getItem("anonymous-user-id");
    }

    public get userName(){
        return this.currentUser?.name ?? localStorage.getItem("anonymous-user-name");
    }

    constructor(private authService: AuthService, private userApi: UserApi, private loadingService: LoadingService) {
        this.currentUser$.subscribe(user => this.currentUser = user);
        authService.Authenticated$.subscribe(auth => {
            if (!auth) {
                this.currentUser$.next(undefined);
                this.AuthenticateAnonymous();
                return;
            }
            this.RefreshCurrentUser();
        });
    }

    private AuthenticateAnonymous() {
      let userId = localStorage.getItem("anonymous-user-id")
      if (!userId) {
        userId = "Anonymous_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("anonymous-user-id", userId);
      }
      let userName = localStorage.getItem("anonymous-user-name")
      if (!userName) {
        userName = getRandomPlayerName();
        localStorage.setItem("anonymous-user-name", userName);
      }

      console.log("Anonymous user id: ", userId);
      console.log("Anonymous user name: ", userName);
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
      userId: this.currentUser$.value?.id ?? "",
      name: this.currentUser$.value?.name ?? "",
    }
  }
}
