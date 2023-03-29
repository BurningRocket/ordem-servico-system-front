import { BaseDto } from './base-dto.model';

export interface InstaladorDto extends BaseDto{
    nome?: string;
    cpf?: string;
    email?: string;
    telefonePrimario?: string;
    telefoneSecundario?: string;
    municipio?: string;
    estado?: string;
    observacoes?: string;
    dataCadastro?: Date;
}
