export interface TokenPayloadDto {
    id: number;
    exp: number;
    permissions: string[];
    role: string;
    sub: string;
}
