import { BaseDto } from './base-dto.model';
import { ClienteDto } from './cliente-dto.model';

export interface VisitaDto extends BaseDto{
    cliente?: ClienteDto;
    dataVisita?: Date;
    observacao?: string;
    chegouSite?: boolean;
    notificarWpp?: boolean;
    endereco?: string;
}
