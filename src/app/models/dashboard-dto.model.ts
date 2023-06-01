export interface DashboardDto{
    totalOrcamentosMes: number;
    totalInstalacoesMes: number;
    totalVisitasMes: number;
    totalCaixasMes: number;
    diferencaOrcamentosMesAnterior: number;
    diferencaInstalacoesMesAnterior: number;
    diferencaVisitasMesAnterior: number;
    diferencaCaixasMesAnterior: number;
    orcamentosAprovadosMes: number;
    orcamentosReprovadosMes: number;
    geralAnoInstalacoes: number[];
    geralAnoOrcamentos: number[];
    geralAnoVisitas: number[];
}
