export interface UsernameType {
  username: string;
}

export interface IUser extends UsernameType {
  _id?: string;
  password: string;
  isAdmin?: boolean;
  profile_picture?: string;
  save?: () => Promise<void>;
}

export interface UsernameAdmin extends IUser {
  isAdmin: boolean;
}

export interface MongoUser {
  _id: string;
}

export type UserPicture = Omit<
  IUser,
  "username" | "password" | "save" | "isAdmin"
>;
