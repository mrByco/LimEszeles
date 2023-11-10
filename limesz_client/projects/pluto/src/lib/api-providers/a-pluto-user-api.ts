import { Observable } from 'rxjs';
import { UserProfileDto } from '../../../../../src/app/api/models/user-profile-dto';

export abstract class APlutoUserApi {

  abstract userDelete(): Observable<void>;
  abstract userGet$Json(): Observable<UserProfileDto>
}
