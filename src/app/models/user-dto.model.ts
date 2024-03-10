import { BaseDto } from './base-dto.model';

export interface UserDto extends BaseDto {
  name?: string;
  email?: string;
  role?: string;
  password?: string;
}
