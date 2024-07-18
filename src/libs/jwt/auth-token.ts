export interface AuthToken {
  generate(userId: string): string;
  verify(token: string): Promise<boolean>;
}
