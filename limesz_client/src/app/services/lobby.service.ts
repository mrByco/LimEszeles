import {inject, Injectable} from '@angular/core';
import {RideService} from "./ride.service";
import { AuthService } from './auth.service';
import { Lobby } from '../ride';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  private rideService = inject(RideService);
  private userService = inject(UserService);

  constructor(private authService: AuthService) {
  }

  public async createLobby() {
    if (!this.userService.currentUser$.value){
      return;
    }
    await this.leaveLobby();
    let player = this.userService.getMeAsPlayer();
    let lobby: Lobby = {
      id: this.generateRandomId(5),
      state: "lobby",
      players: {
        [player.id]: player
      }
    }

    await this.rideService.startListenToLobbyChanges(lobby.id);
  }

  public async leaveLobby() {
    if (!this.userService.currentUser$.value || !this.rideService.ride$.value){
      return;
    }

    let players = this.rideService.ride$.value.players;
    delete players[this.userService.currentUser$.value.id];

    this.rideService.setListenerNoRide();
  }

  public async joinLobby(shortCode: string) {
    let lobby = await this.rideService.startListenToLobbyChanges(shortCode);
    console.log(lobby)
    if (!this.rideService.ride$.value)
      return;

  }


  generateRandomId(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      id += charset[randomIndex];
    }

    return id;
  }





}
