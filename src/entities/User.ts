export type UserProps = {
  id: string;
  name: string;
  email: string | null;
  monthly_budget: number;
  password: string | null;
  role: string;
  status: string;
  avatar: string | null;
  external_id: string | null;
  updated_at: Date;
  created_at: Date;
};

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string | null,
    public monthly_budget: number,
    public password: string | null,
    public role: string,
    public status: string,
    public avatar: string | null,
    public external_id: string | null,
    public updated_at: Date,
    public created_at: Date
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      monthly_budget: this.monthly_budget,
      password: this.password,
      role: this.role,
      status: this.status,
      avatar: this.avatar,
      external_id: this.external_id,
      updated_at: this.updated_at,
      created_at: this.created_at,
    };
  }
}
