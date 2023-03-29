import { InstalacaoContratoDto } from './instalacao-contrato-dto.model';
import { TipoServicoDispositivoDto } from './tipo-servico-dispositivo-dto.model';

export interface InstalacaoContratoTipoServicoDispositivoDto {
    id?: number;
    name?: string;
    token?: string;
    valorReferencia?: number;
    instalacaoContratoDto?: InstalacaoContratoDto;
    tipoServicoDispositivoDto?: TipoServicoDispositivoDto;
}
