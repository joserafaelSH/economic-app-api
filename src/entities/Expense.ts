export class Expense {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public amount: number,
    public date: Date,
    public category: string,
    public user_id: string,
    public updated_at: Date,
    public created_at: Date
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      amount: this.amount,
      date: this.date,
      category: this.category,
      user_id: this.user_id,
      updated_at: this.updated_at,
      created_at: this.created_at,
    };
  }
}

export type ExpenseProps = {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  user_id: string;
  updated_at: Date;
  created_at: Date;
};
