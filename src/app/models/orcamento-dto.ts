import { BaseDto } from './base-dto.model';
import { ClienteDto } from './cliente-dto.model';
import { VisitaDto } from './visita-dto.model';

export interface OrcamentoDto extends BaseDto{
    cliente?: ClienteDto;
    visita?: VisitaDto
    status?: string;
    observacao?: string;
    endereco?: string;
    valor?: number;
    descricao?: string;
    tipoPagamento?: string;
}
