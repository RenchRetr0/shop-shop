export interface IAuthRequest {
  accessToken: string;
  user: TUser;
}

export interface TUser {
  createdAt: string;
  email: string;
  id: number;
  role: string;
  updatedAt: string;
  profile: TProfile | null;
}

export type TProfile = {
  id: number;
  firstName: string;
  lastName: string;
  patronym?: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TProfileResponse = {
  firstName: string;
  lastName: string;
  patronym: string;
  address: string;
  phone: string;
};

export type TCartSlice = {
  id: number;
  price: string;
  isOrder: boolean;
  isStatus: string;
  user: {
    id: number;
    email: string;
    role: string;
    createdAt: string;
    updateAt: string;
  };
  orderItems: {
    id: number;
    count: string;
    price: string;
    total: string;
    product: {
      id: number;
      name: string;
      countre: string;
      description: string;
      count: string;
      price: string;
      link: string;
    };
  }[];
};
