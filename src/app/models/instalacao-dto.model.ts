import { ContratoDto } from './contrato-dto.model';
import { DispositivoDto } from './dispositivo-dto.model';
import { EquipamentoDto } from './equipamento-dto.model';
import { InstalacaoContratoDto } from './instalacao-contrato-dto.model';

export interface InstalacaoDto{
    id?: number;
    token?: string;
    status?: string;
    numero?: string;
    dataCadastro?: Date;
    dataInstalado?: Date;
    dataRemocaoSolicitada?: Date;
    dataRemovido?: Date;
    contrato?: ContratoDto;
    instalacaoContrato?: InstalacaoContratoDto;
    equipamento?: EquipamentoDto
    dispositivo?: DispositivoDto
    valorBase?: number;
    valorRemocao?: number;
}
