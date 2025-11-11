export interface IUser {
  _id: string;
  username: string;
  email: string;
  onBoarding_done: boolean;
  preferences?: {
    assets: string[];
    investorType: string[];
    contentTypes: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}