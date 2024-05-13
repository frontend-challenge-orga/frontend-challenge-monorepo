export class Session {
  readonly id: string;
  readonly sessionToken: string;
  readonly userId: string;
  readonly expires: Date;

  constructor(id: string, sessionToken: string, userId: string, expires: Date) {
    this.id = id;
    this.sessionToken = sessionToken;
    this.userId = userId;
    this.expires = expires;
  }
}
