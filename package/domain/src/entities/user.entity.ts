export class User {
  readonly id: string;
  readonly name: string | null;
  readonly email: string | null;
  readonly emailVerified: Date | null;
  readonly image: string | null;
  readonly role: Role;
  readonly points: number;

  constructor(props: User) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.emailVerified = props.emailVerified;
    this.image = props.image;
    this.role = props.role;
    this.points = props.points;
  }
}

export type Role = 'USER' | 'COLLABORATOR' | 'ADMIN';
