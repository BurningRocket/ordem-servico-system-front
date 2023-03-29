import { BaseDto } from './base-dto.model';
import { ContratoDto } from './contrato-dto.model';
import { MedicaoDto } from './medicao-dto.model';

export interface medicaoFechamentoDto extends BaseDto{
    contrato?: ContratoDto;
    dataMedicao?: Date;
    dataFechamentoMedicao?: Date;
    valorTotal?: number;
    itensSemInstalacao?: number;
    status?: string;
    medicoes?: MedicaoDto[];
}
