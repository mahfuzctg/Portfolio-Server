export interface IUser {
  _id?: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
