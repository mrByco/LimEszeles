import { Component, inject } from '@angular/core';
import { LobbyApi } from '../../../api/services/lobby-api';
import { UserService } from '../../../services/user.service';
import { RideService } from '../../../services/ride.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.scss']
})
export class JoinScreenComponent {
  public joinCode: string = '';
  private lobbyApi = inject(LobbyApi);
  private userService = inject(UserService);
  private rideService: RideService = inject(RideService);


  forceKeyPressUppercase = (e: any) => {

    let el = e.target;
    if (el.value.length > 4) {
      e.preventDefault();
      return;
    }
    let charInput = e.keyCode;
    if((charInput >= 97) && (charInput <= 122)) { // lowercase
      if(!e.ctrlKey && !e.metaKey && !e.altKey) { // no modifier key
        let newChar = charInput - 32;
        let start = el.selectionStart;
        let end = el.selectionEnd;
        el.value = el.value.substring(0, start) + String.fromCharCode(newChar) + el.value.substring(end);
        el.setSelectionRange(start+1, start+1);
        e.preventDefault();
      }
    }
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      return;
    }
    else {
      e.preventDefault();
    }
  };

  async joinLobby() {
    await firstValueFrom(this.lobbyApi.joinLobby({ userName: this.userService.userName, userId: this.userService.userId, connectionToken: this.rideService.connectionToken, lobbyId: this.joinCode }))
  }
}
