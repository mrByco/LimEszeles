import {inject, Injectable} from '@angular/core';
import {Game, Lobby, Ride} from "../../../../game/src/models/game";
import {AuthService} from "../../../../game/src/app/services/auth.service";
import {RideService} from "./ride.service";

@Injectable({
  providedIn: 'root'
})
export class LobbyService {


  constructor(private authService: AuthService, private rideService: RideService) {
  }

  public async createLobby() {
    if (!this.authService.user$.value){
      return;
    }
    await this.leaveLobby();
    let player = this.authService.getMeAsPlayer();
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
    if (!this.authService.user$.value || !this.rideService.ride$.value){
      return;
    }

    let players = this.rideService.ride$.value.players;
    delete players[this.authService.user$.value.uid];

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
