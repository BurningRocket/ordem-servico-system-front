import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DashboardDto } from 'src/app/models/dashboard-dto.model';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;
    chartOptions: any;

    dashboard: DashboardDto = {
        totalOrcamentosMes: 0,
        totalInstalacoesMes : 0,
        totalVisitasMes: 0,
        totalCaixasMes: 0,
        diferencaInstalacoesMesAnterior: 0,
        diferencaOrcamentosMesAnterior: 0,
        diferencaVisitasMesAnterior: 0,
        diferencaCaixasMesAnterior: 0,
        orcamentosAprovadosMes: 0,
        orcamentosReprovadosMes: 0,
        geralAnoInstalacoes: [],
        geralAnoOrcamentos: [],
        geralAnoVisitas: []
    };

    pieData: any;
    pieOptions: any;

    piePagamentoData: any;
    piePagamentoOptions: any;

    chartsLoading: boolean = true;

    subscription!: Subscription;

    constructor(private productService: ProductService, public layoutService: LayoutService,
        private dashboardService: DashboardService, private messageService: MessageService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.chartsLoading = true;

        this.dashboardService.buscarDashboard().subscribe((data: any) => {
            this.dashboard = data;
            this.initChart();
            this.chartsLoading = false;
        }, (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao gerar gráficos', life: 3000 });
            this.chartsLoading = false;
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.pieData = {
            labels: ['Orçamentos aprovados', 'Orçamentos reprovados'],
            datasets: [
                {
                    data: [this.dashboard.orcamentosAprovadosMes, this.dashboard.orcamentosReprovadosMes],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400'),
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

        // this.piePagamentoData = {
        //     labels: ['A vista', 'A prazo', 'Parcelado'],
        //     datasets: [
        //         {
        //             data: [30, 34, 68],
        //             backgroundColor: [
        //                 documentStyle.getPropertyValue('--green-500'),
        //                 documentStyle.getPropertyValue('--orange-500'),
        //                 documentStyle.getPropertyValue('--yellow-500'),
        //             ],
        //             hoverBackgroundColor: [
        //                 documentStyle.getPropertyValue('--green-400'),
        //                 documentStyle.getPropertyValue('--orange-400'),
        //                 documentStyle.getPropertyValue('--yellow-400'),
        //             ]
        //         }]
        // };

        // this.piePagamentoOptions = {
        //     plugins: {
        //         legend: {
        //             labels: {
        //                 usePointStyle: true,
        //                 color: textColor
        //             }
        //         }
        //     }
        // };

        this.chartData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembo', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Visitas',
                    data: this.dashboard.geralAnoVisitas,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--blue-700'),
                    borderColor: documentStyle.getPropertyValue('--blue-700'),
                    tension: .4
                },
                {
                    label: 'Orçamentos',
                    data: this.dashboard.geralAnoOrcamentos,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                },
                {
                    label: 'Instalações',
                    data: this.dashboard.geralAnoInstalacoes,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--cyan-600'),
                    borderColor: documentStyle.getPropertyValue('--cyan-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
