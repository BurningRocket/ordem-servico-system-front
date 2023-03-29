import { BaseDto } from './base-dto.model';
import { InstalacaoDto } from './instalacao-dto.model';
import { MedicaoOrdemServicoDto } from './medicao-ordem-servico-dto.model';

export interface MedicaoDto extends BaseDto{
    instalacao?: InstalacaoDto;
    valorBase?: number;
    dataMedicao?: Date;
    diasMedicao?: number;
    valorMedido?: number;
    valorInstalacao?: number;
    valorRemocao?: number;
    dataFechamentoMedicao?: Date;
    valorTotal?: number;
    valorOrdemServico?: number;
    listMedicaoServico?: MedicaoOrdemServicoDto[];
}
