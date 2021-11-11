import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number;
  username: string;
  password: string;
  email: string;
  roles: number[] = [];
  firstname: string;
  lastname: string;

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.username = user.username || '';
    this.password = user.password || '';
    this.email = user.email || '';
    this.roles = user.roles || [];
  }
}
