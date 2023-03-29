import { BaseDto } from './base-dto.model';

export interface StatusSolicitacaoDto extends BaseDto{
    descricao?: string;
    selected?: boolean;
}
