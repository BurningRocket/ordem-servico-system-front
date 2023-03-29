import { AtividadeDto } from './atividade-dto.model';
import { BaseDto } from './base-dto.model';
import { EquipamentoDto } from './equipamento-dto.model';
import { InstaladorDto } from './instalador-dto.model';
import { ObraDto } from './obra-dto.model';
import { StatusSolicitacaoDto } from './status-solicitacao.model';

export interface SolicitacaoServicoFilterDto extends BaseDto{
    dataHoraInicio?: Date;
    dataHoraFim?: Date;
    obra?: ObraDto;
    atividade?: AtividadeDto;
    equipamento?: EquipamentoDto;
    instalador?: InstaladorDto;
    statusSolicitacao?: StatusSolicitacaoDto;
    faturada?: boolean;
}
