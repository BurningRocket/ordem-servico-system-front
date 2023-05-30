import { BaseDto } from './base-dto.model';
import { ClienteDto } from './cliente-dto.model';
import { ProfissionalDto } from './profissional-dto';

export interface VisitaDto extends BaseDto{
    cliente?: ClienteDto;
    dataVisita?: Date;
    observacao?: string;
    preObservacao?: string;
    formaContato?: string;
    notificarWpp?: boolean;
    endereco?: string;
    descricao?: string;
    status?: string;
    profissional?: ProfissionalDto;
}
