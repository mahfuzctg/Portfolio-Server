export type TUser = {
  _id?: string;
  name: string;
  password?: string;
  email: string;
  role: string;
  image: string;
  coverImg?: string;
  memberShip: null | {
    takenDate: string;
    exp: string;
    package: object;
  };
  followers?: string[];
  following?: string[];
  iat?: number;
  exp?: number;
  isBlocked?: boolean;
};
