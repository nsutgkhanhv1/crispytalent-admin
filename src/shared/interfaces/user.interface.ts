export interface UserModel {
  userId: number;
  email: string;
  password: string;
  pet: any;
}

export type UserGetResponse = Omit<UserModel, 'userId' | 'password'>;
