import { BaseDto } from './base-dto.model';
import { TipoAtividadeDto } from './tipo-atividade-dto.model';

export interface AtividadeDto extends BaseDto{
    nome?: string;
    valorReferencia?: string;
    token?: string;
    tipoAtividade?: TipoAtividadeDto;
}
