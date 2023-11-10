import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { APlutoAuthApi } from '../a-pluto-auth-api';
import { APlutoAlertService } from '../a-pluto-alert-service';
import { RegistrationData } from '../generated-api/models/RegistrationData';
import { LoginCredentials } from '../generated-api/models/login-credentials';
import { AuthResult } from '../generated-api/models/auth-result';
import { APlutoAuthService } from '../a-pluto-auth-service';


@Injectable()
export class PlAuthService implements APlutoAuthService {
    private token?: string;
    private tokenValidity?: number;
    private currentTokenRefresh?: Promise<void>;
    public get Authenticated(): boolean {
        return this.token !== undefined;
    }

    public Authenticated$ = new BehaviorSubject<boolean>(false);
    public PermissionCheckCache: { [restaurantId_permission: string]: boolean | Promise<boolean> } = {};

    public get Token() {
        if (this.tokenValidity && this.tokenValidity < Date.now()) {
            return undefined;
        }
        return this.token;
    }

    public get RefreshToken() {
        if (!localStorage.getItem("refresh-token") || !localStorage.getItem("refresh-token-validity")) return undefined;
        let refreshTokenValidity = +localStorage.getItem("refresh-token-validity")!;
        if (this.tokenValidity && refreshTokenValidity < Date.now()) {
            return undefined;
        }
        return localStorage.getItem("refresh-token");
    }

    constructor(private authApi: APlutoAuthApi) {
        this.token = localStorage.getItem("token") ?? undefined;
        this.tokenValidity = parseInt(localStorage.getItem("token-validity") ?? "0") ?? undefined;
        this.Authenticated$.next(this.Authenticated);
    }

    public async Register(data: RegistrationData): Promise<boolean> {
        try {
            let result = await firstValueFrom(this.authApi.authRegisterPost$Json({ body: data }));
            this.UseAuthResult(result);

            APlutoAlertService.instance.success("Sikeres regisztráció");
            return true;
        }
        catch {
            APlutoAlertService.instance.error("Sikertelen regisztráció");
            return false;
        }
    };

    public async RegisterInvit(data: RegistrationData, invit: string): Promise<boolean> {
        try {
            /*let result = await firstValueFrom(this.authApi.authRegisterInvitePost$Json({ body: data, invite: invit }));
            this.UseAuthResult(result);*/

            APlutoAlertService.instance.success("Bejelentkezve");
            return true;
        }
        catch {
            APlutoAlertService.instance.error("Sikertelen bejelentkezés");
            return false;
        }
    }

    public async Login(email: string, password: string): Promise<boolean> {
        try {
            const user: LoginCredentials = {
                email: email,
                password: password,
            };
            console.log(user);
            let result = await firstValueFrom(this.authApi.authLoginPost$Json({ body: user }));
            this.UseAuthResult(result);

            APlutoAlertService.instance.success("Bejelentkezve");
            return true;
        }
        catch {
            APlutoAlertService.instance.error("Sikertelen bejelentkezés");
            return false;
        }
    }

    async ResetPassword(password: string, token: string) {
        let result = await firstValueFrom(this.authApi.authResetPasswordPost$Json({ body: { password: password, token: token } }));
        this.UseAuthResult(result);
        APlutoAlertService.instance.success("Sikeres jelszó visszaállítás");
    }

    async MakeTokenRefresh() {
        // Prevent multiple refreshes at the same time
        if (this.currentTokenRefresh) return this.currentTokenRefresh

        this.PermissionCheckCache = {};
        let resolveCurrentTokenRefresh: any = undefined;
        let rejectCurrentTokenRefresh: any = undefined;
        if (this.RefreshToken) {
            try {
                let refreshRequest = firstValueFrom(this.authApi.authRefreshTokenPost$Json({ body: { token: this.RefreshToken } as any }));
                this.currentTokenRefresh = new Promise((resolve, reject) => {
                    resolveCurrentTokenRefresh = resolve;
                    rejectCurrentTokenRefresh = reject;
                });
                this.UseAuthResult(await refreshRequest);
                resolveCurrentTokenRefresh?.();
                this.currentTokenRefresh = undefined;
            }
            catch {
                this.Logout(true);
                rejectCurrentTokenRefresh?.();
                this.currentTokenRefresh = undefined;
            }
        }
        else {
            this.Logout(true);
        }
    }

    async GetValidToken() {
        if (this.Token) {
            return this.Token;
        }
        else {
            await this.MakeTokenRefresh();
            return this.Token;
        }
    }

    private UseAuthResult(result: AuthResult) {
        this.PermissionCheckCache = {};
        this.token = result.accessToken;

        this.tokenValidity = new Date(result.accessTokenValidty).getTime();
        let refreshToken = result.refreshToken;
        let refreshTokenValidity = new Date(result.refreshTokenValidity).getTime();

        localStorage.setItem("token", this.token!);
        localStorage.setItem("token-validity", this.tokenValidity!.toString());
        localStorage.setItem("refresh-token", refreshToken);
        localStorage.setItem("refresh-token-validity", refreshTokenValidity.toString());
        this.Authenticated$.next(this.Authenticated);
    }

    public async Logout(reload: boolean = true) {
        this.PermissionCheckCache = {};
        this.token = undefined;
        localStorage.removeItem("token");
        this.Authenticated$.next(this.Authenticated);
        if (reload) {
            location.href = "/";
            location.reload();
        }
    }

    public async checkPermission(permission: string, restaurantId: string | undefined): Promise<boolean> {
        if (!this.PermissionCheckCache[restaurantId + "_" + permission]) {
            try {
                //@ts-ignore
                this.PermissionCheckCache[restaurantId + "_" + permission] = firstValueFrom(this.authApi.authHasPermissionPermissionRestaurantIdGet$Json({ restaurantId: restaurantId, permission: permission }));
            }
            catch {
                return false;
            }
        }
        return await this.PermissionCheckCache[restaurantId + "_" + permission];
    }
}
