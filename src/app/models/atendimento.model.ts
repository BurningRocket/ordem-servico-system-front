import { BaseDto } from './base-dto.model';
import { InstaladorDto } from './instalador-dto.model';
import { SolicitacaoServicoDto } from './solicitacao-servico-dto.model';
import { StatusAtendimentoDto } from './status-atendimento';

export interface AtendimentoDto extends BaseDto{
    descricao?: string;
    endereco?: string;
    instalador?: InstaladorDto;
    valorTotal?: number;
    kmDeslocamnento?: number;
    observacaoPosExecucao?: string;
    status?: StatusAtendimentoDto;
    dataAgendamento?: Date;
    dataCancelamento?: Date;
    dataExecucao?: Date;
    solicitacoesServico?: SolicitacaoServicoDto[];
}
