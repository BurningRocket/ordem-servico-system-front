import { roleDto } from './role-dto.model';

export interface TokenPayloadDto {
    id: number;
    exp: number;
    permissions: string[];
    role: roleDto;
    sub: string;
}
