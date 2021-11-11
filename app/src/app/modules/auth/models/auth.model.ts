import { UserModel } from "..";

export class AuthModel {
  jwt: string;

  setAuth(auth: AuthModel) {
    this.jwt = auth.jwt;
  }
}
