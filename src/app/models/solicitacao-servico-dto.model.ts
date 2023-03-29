import { AtividadeDto } from './atividade-dto.model';
import { BaseDto } from './base-dto.model';
import { DispositivoDto } from './dispositivo-dto.model';
import { EquipamentoDto } from './equipamento-dto.model';
import { InstaladorDto } from './instalador-dto.model';
import { ObraDto } from './obra-dto.model';
import { StatusSolicitacaoDto } from './status-solicitacao.model';

export interface SolicitacaoServicoDto extends BaseDto{
    valorServico?: number;
    valorKm?: number;
    valorDesconto?: number;
    valorTotal?: number;
    observacao?: string;
    endereco?: string;
    dataSolicitacao?: Date;
    dataAgendamento?: Date;
    dataExecucao?: Date;
    dataCancelamento?: Date;
    obra?: ObraDto;
    equipamento?: EquipamentoDto;
    atividade?: AtividadeDto;
    instalador?: InstaladorDto;
    usuario?: String;
    statusSolicitacao?: StatusSolicitacaoDto;
    horaSoliciacao?: string;
    horaAgendamento?: string;
    horaExecucao?: string;
    horaCancelamento?: string;
    valorPecao?: number;
    dispositivo?: DispositivoDto;
}
