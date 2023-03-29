import { ObraDto } from './obra-dto.model';

export interface ContratoDto {
    id?: number;
    obra?:ObraDto
    token?: string;
    numero?: string;
    totalInstalacoes?: number;
    itensSemInstalacao?: number;
    dataCadastro?: Date;
    dataUltimaMedicao?: Date;
    status?: string;
}
