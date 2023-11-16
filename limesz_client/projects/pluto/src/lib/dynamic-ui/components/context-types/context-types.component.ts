import { Component, inject } from '@angular/core';
import { UserService } from '../../../api-providers/user-service';

@Component({
  selector: 'pl-context-types',
  templateUrl: './context-types.component.html',
  styleUrls: ['./context-types.component.css']
})
export class ContextTypesComponent {

  private userService = inject(UserService)

}
