export interface TokenPayloadDto {
    id: number;
    exp: number;
    permissions: string[];
    roles: number[];
    sub: string;
}
