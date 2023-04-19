import { BaseDto } from './base-dto.model';
import { Endereco } from './endereco.model';

export interface ClienteDto extends BaseDto {
    nome?: string;
    cpf?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cnpj?: string;
}
