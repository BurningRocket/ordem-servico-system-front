import { ContratoDto } from './contrato-dto.model';
import { InstalacaoContratoTipoServicoDispositivoDto } from './instalacao-contrato-tipo-servico-dispositivo.model';

export interface InstalacaoContratoDto {
    id?: number;
    tokenContrato?: string;
    contrato?: ContratoDto;
    valorMensal?: number;
    valorInstalacao?: number;
    valorReferencia?: number;
    valorRemocao?: number;
    sigla?: string;
    name?: string;
    token?: string;
    instalacaoContratoTipoServicoDispositivos?: InstalacaoContratoTipoServicoDispositivoDto[];
}
