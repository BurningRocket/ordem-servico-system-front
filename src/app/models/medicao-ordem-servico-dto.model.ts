import { BaseDto } from './base-dto.model';
import { SolicitacaoServicoDto } from './solicitacao-servico-dto.model';

export interface MedicaoOrdemServicoDto extends BaseDto{
    solicitacaoSeevico?: SolicitacaoServicoDto;
}
