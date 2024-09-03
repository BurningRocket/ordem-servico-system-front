import { BaseDto } from './base-dto.model';
import { ClienteDto } from './cliente-dto.model';
import { OrcamentoDto } from './orcamento-dto';
import { ProfissionalDto } from './profissional-dto';

export interface InstalacaoDto extends BaseDto{
    cliente?: ClienteDto;
    orcamento?: OrcamentoDto;
    dataInstalacao?: [Date | string, Date | string];
    status?: string;
    observacao?: string;
    endereco?: string;
    descricao?: string;
    quantidadeCaixas?: number;
    statusPagamento?: string;
    profissional?: ProfissionalDto;
}
