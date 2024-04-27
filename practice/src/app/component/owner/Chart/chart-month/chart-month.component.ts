import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';

@Component({
  selector: 'app-chart-month',
  templateUrl: './chart-month.component.html',
  styleUrls: ['./chart-month.component.css'],
})
export class ChartMonthComponent {
  authAPIs = inject(AuthApiService);
  router = inject(Router);
  activeRouter = inject(ActivatedRoute);

  statFood!: any;
  statMonth!: any;
  statMonthYear!: any;

  //chart-Normal
  itemFood!: any;
  itemYear!: any;
  itemYear2!: any;
  //...

  //chart-Month
  itemMonth2!: any;
  //...

  chartStatMonth!: any;

  valueChange: any = 2023;

  e: any = '';

  chart = this.chartStatMonth;

  chartTest!: any;
  chartTestMonth!: any;
  chartTrestMY!: any;

  chartMonthYear!: any;

  en!: any;

  async ngOnInit(): Promise<void> {
    this.e = endpointsAuth.stats;
    console.log(this.e);
    this.activeRouter.queryParams.subscribe((res) => {
      if (res['y'] !== undefined) {
        this.e = `${endpointsAuth.stats}?y=${res['y']}`;
        console.log(this.e);
      }
      this.router.navigate(['owner'], {
        queryParams: {
          y: this.valueChange,
        },
      });
    });
    let stats = await this.authAPIs.getAPIAsync(endpointsAuth.stats);
    let statsMonth = await this.authAPIs.getAPIAsync(this.e);
    console.log(stats);

    this.statFood = stats;
    this.statMonth = statsMonth;

    let en = this.en;
    en = false;
    //chart - Normal
    let itemT: { name: any; data: any }[] = [];

    let itemY2: any[] = [];

    let mapY = new Map<string, Array<number>>();

    let map = new Map<string, Array<number>>();
    this.statFood.map((a: any) => {
      console.log([a[2]]);

      if (!map.has(a[0])) {
        map.set(a[0], [a[1]]);
      } else {
        map.get(a[0])?.push(a[1]);
      }

      if (!mapY.has(a[0])) {
        mapY.set(a[0], [a[2]]);
      } else {
        mapY.get(a[0])?.push(a[2]);
      }

      if (itemY2.indexOf(a[2]) === -1) {
        itemY2.push(a[2]);
      }
    });

    console.log(map);
    console.log(mapY);
    let tmp: any;

    map.forEach((value: Array<number>, key: string) => {
      tmp = mapY.get(key);
      if (itemY2.length > tmp?.length) {
        for (let i = 0; i < itemY2.length; i++) {
          if (itemY2[i] !== tmp[i]) {
            tmp?.splice(i, 0, itemY2[i]);
            map.get(key)?.splice(i, 0, 0);
          }
        }
      }
      itemT.push({
        name: key,
        data: value,
      } as any);
    });

    this.chartTest = itemT;
    this.itemYear2 = itemY2;
    console.log(itemY2);
    //...

    //chart - Month
    let itemTMonth: { name: any; data: any }[] = [];

    let itemM2: any[] = [];

    let mapM = new Map<string, Array<number>>();

    let mapMonth = new Map<string, Array<number>>();
    this.statMonth.map((a: any) => {
      if (!mapMonth.has(a[0])) {
        mapMonth.set(a[0], [a[1]]);
      } else {
        mapMonth.get(a[0])?.push(a[1]);
      }

      if (!mapM.has(a[0])) {
        mapM.set(a[0], [a[3]]);
      } else {
        mapM.get(a[0])?.push(a[3]);
      }

      if (itemM2.indexOf(a[3]) === -1) {
        itemM2.push(a[3]);
      }
    });

    let tmpM: any;

    mapMonth.forEach((value: Array<number>, key: string) => {
      tmpM = mapM.get(key);
      if (itemM2.length > tmpM?.length) {
        for (let i = 0; i < itemM2.length; i++) {
          if (itemM2[i] !== tmpM[i]) {
            tmpM?.splice(i, 0, itemM2[i]);
            mapMonth.get(key)?.splice(i, 0, 0);
          }
        }
      }
      itemTMonth.push({
        name: key,
        data: value,
      } as any);
    });

    this.chartTestMonth = itemTMonth;
    this.itemMonth2 = itemM2;
    console.log(itemY2);
    //...

    this.chartStatMonth = new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: `TỔNG DOANH THU THEO NĂM ${this.valueChange}`,
        align: 'left',
      },
      xAxis: {
        categories: this.itemMonth2,
        crosshair: true,
        accessibility: {
          description: 'DOANH THU THEO THÁNG',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '1 VND',
        },
      },
      tooltip: {
        valueSuffix: '(1 VND)',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        series: {
          point: {
            events: {
              click: this.openChartMonthYear.bind(this),
            },
          },
        },
      },
      series: this.chartTestMonth,
    });
  }

  selectChange(value: any) {
    this.valueChange = value;
    this.router.navigate(['owner'], {
      queryParams: {
        y: value,
      },
    });
    this.ngOnInit();
  }
  openChartMonthYear(event: any) {
    if (event.point) {
      let k = '';
      this.activeRouter.queryParams.subscribe(async (res) => {
        const pointValue = event.point.category; // Lấy giá trị của điểm
        this.router.navigate(['owner'], {
          queryParams: {
            y: this.valueChange,
            m: pointValue,
          },
        });
        console.log(res['y'], res['m']);
        if (res['y'] !== undefined && res['m'] !== undefined) {
          k = `${endpointsAuth.stats}?y=${res['y']}&m=${res['m']}`;
          let statsMonthYear = await this.authAPIs.getAPIAsync(k);
          this.statMonthYear = statsMonthYear;

          console.log(k);

          console.log(this.statMonthYear);
          let itemTMonth: { name: any; y: any }[] = [];

          let itemM2: any[] = [];

          let mapM = new Map<string, Array<number>>();

          let mapMonth = new Map<string, Array<number>>();
          if (this.statMonthYear !== null) {
            this.statMonthYear.map((a: any) => {
              if (!mapMonth.has(a[0])) {
                mapMonth.set(a[0], a[1]);
              } else {
                mapMonth.get(a[0])?.push(a[1]);
              }

              if (!mapM.has(a[0])) {
                mapM.set(a[0], [a[3]]);
              } else {
                mapM.get(a[0])?.push(a[3]);
              }

              if (itemM2.indexOf(a[3]) === -1) {
                itemM2.push(a[3]);
              }
            });
          }

          let tmpM: any;

          mapMonth.forEach((value: Array<number>, key: string) => {
            tmpM = mapM.get(key);
            if (itemM2.length > tmpM?.length) {
              for (let i = 0; i < itemM2.length; i++) {
                if (itemM2[i] !== tmpM[i]) {
                  tmpM?.splice(i, 0, itemM2[i]);
                  mapMonth.get(key)?.splice(i, 0, 0);
                }
              }
            }
            itemTMonth.push({
              name: key,
              y: value,
            } as any);
          });

          this.chartTrestMY = itemTMonth;
          console.log(this.chartTrestMY);

          this.chartMonthYear = new Chart({
            chart: {
              type: 'pie',
            },
            title: {
              text: 'Egg Yolk Composition',
            },
            tooltip: {
              valueSuffix: '%',
            },
            subtitle: {
              text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>',
            },
            plotOptions: {
              series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [
                  {
                    enabled: true,
                    distance: 20,
                  } as any,
                  {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7,
                    },
                    filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10,
                    },
                  } as any,
                ],
              },
            },
            series: [
              {
                name: 'Percentage',
                colorByPoint: true,
                data: this.chartTrestMY,
              },
            ] as any,
          });
        }
      });
    }
  }
}
