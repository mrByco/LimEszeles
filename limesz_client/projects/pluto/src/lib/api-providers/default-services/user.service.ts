// This services manages users data

import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import {LoadingService} from "./loading.service";
import { APlutoAuthService } from '../a-pluto-auth-service';
import { UserProfileDto } from '../../../../../../src/app/api/models/user-profile-dto';
import { APlutoUserApi } from '../a-pluto-user-api';

// TODO implement base userservice from elsewhere
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

    constructor(private authService: APlutoAuthService, private userApi: APlutoUserApi, private loadingService: LoadingService) {
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
}
