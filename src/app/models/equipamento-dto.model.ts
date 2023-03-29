import { InstalacaoDto } from './instalacao-dto.model';
import { ObraDto } from './obra-dto.model';

export interface EquipamentoDto{
    id?: number;
    placa?: string;
    descricao?: string;
    token?: string;
    modelo?: string;
    dataCadastro?: Date;
    ano?: number;
    chassi?: string;
    instalacao?: InstalacaoDto;
    obra?: ObraDto;
}
