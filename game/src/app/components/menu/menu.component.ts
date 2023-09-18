import {Component, inject} from '@angular/core';
import {LobbyService} from "../../services/lobby.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public joinCode: string = '';
  private lobbyService = inject(LobbyService);

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

  createLobby() {
    this.lobbyService.createLobby();
  }

  joinLobby() {
    this.lobbyService.joinLobby(this.joinCode)
  }
}
