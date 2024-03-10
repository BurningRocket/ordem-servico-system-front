import { BaseDto } from './base-dto.model';

export interface IUser extends BaseDto {
  name?: string;
  email?: string;
  role?: string;
}
