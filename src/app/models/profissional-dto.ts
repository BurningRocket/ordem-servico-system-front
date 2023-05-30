import { BaseDto } from './base-dto.model';

export interface ProfissionalDto extends BaseDto{
    nome?: string
    telefone?: string;
    email?: string;
    cpf?: string;
    vistoriador?: boolean;
    instalador?: boolean;
}
