import { OrganizacaoDto } from './organizacao-dto.model';

export interface ObraDto {
    id?: number;
    cnpj?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    email?: string;
    organizacao?: OrganizacaoDto;
}
