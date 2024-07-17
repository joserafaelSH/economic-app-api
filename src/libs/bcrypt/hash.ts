export interface Hash {
  make(textPassword: string): Promise<string>;
  compare(textPassword: string, hashedPassword: string): Promise<boolean>;
}
