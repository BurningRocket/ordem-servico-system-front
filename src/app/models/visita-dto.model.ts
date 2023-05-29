import { BaseDto } from './base-dto.model';
import { ClienteDto } from './cliente-dto.model';

export interface VisitaDto extends BaseDto{
    cliente?: ClienteDto;
    dataVisita?: Date;
    observacao?: string;
    formaContato?: string;
    notificarWpp?: boolean;
    endereco?: string;
    descricao?: string;
    status?: string;
}
