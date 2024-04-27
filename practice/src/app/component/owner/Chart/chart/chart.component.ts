import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  authAPIs = inject(AuthApiService);
  router = inject(Router);

  statFood!: any;

  itemFood!: any;
  itemYear!: any;
  itemYear2!: any;

  chartStat!: any;

  chart = this.chartStat;

  chartTest!: any;

  async ngOnInit(): Promise<void> {
    let stats = await this.authAPIs.getAPIAsync(endpointsAuth.stats);
    console.log(stats);

    this.statFood = stats;

    let itemT: { name: any; data: any }[] = [];

    // let itemA: { name: any; data: any }[] = [];
    // let itemY: any[][] = [];
    let itemY2: any[] = [];
    // this.statFood.map((a: any) => {
    //   itemA.push({
    //     name: a[0],
    //     data: [a[1]],
    //   } as any);
    //   itemY.push([a[2]]);
    // });
    // this.itemFood = itemA;
    // this.itemYear = itemY;

    // console.log(this.itemFood);

    // const reducer = (first: any, current: any) => {
    //   return current;
    // };

    // console.log(this.statFood.reduce(reducer));

    let mapY = new Map<string, Array<number>>();

    let map = new Map<string, Array<number>>();
    this.statFood.map((a: any) => {
      // for(let i in this.statFood){
      //   if(this.statFood[i][2] === a[2]){
      //     console.log(i)
      //   }
      // }

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

    console.log(map)

    let tmp:any

    map.forEach((value: Array<number>, key: string) => {
      tmp = mapY.get(key)
      if(itemY2.length > tmp?.length){
        for(let i = 0; i < itemY2.length; i++){
          if(itemY2[i] !== tmp[i]){
            tmp?.splice(i, 0, itemY2[i])
            map.get(key)?.splice(i, 0, 0)
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
    // console.log(this.itemYear);
    // let co = 0;
    // let samilarItem: any;
    // for (let i in this.statFood) {
    //   for (let n in this.statFood) {

    //     if (
    //       this.statFood[n][0] === this.statFood[i][0] &&
    //       this.statFood[n][2] !== this.statFood[i][2] &&
    //       co !== 1
    //     ) {
    //       // console.log(this.statFood[i])
    //       itemA.push({
    //         name: this.statFood[i][0],
    //         data: [this.statFood[n][1], this.statFood[i][1]],
    //       } as any);
    //     }
    //     co = 0

    //     if(this.statFood[n][2] !== this.statFood[i][2])
    //       {
    //         itemY.push([this.statFood[i][2]]);
    //       }

    //   }

    //   co = 1
    // }
    // // console.log(this.statFood[0]);
    // console.log(itemA);
    // console.log(itemY)
    // this.itemFood = itemA;
    // this.itemYear = itemY;
    // for(let i = 0; i <= this.statFood.length(); i++) {
    //   console.log(this.statFood[i])
    //   console.log(this.statFood[i+1])
    // }

    this.chartStat = new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: 'TỔNG DOANH THU THEO NĂM',
        align: 'left',
      },
      xAxis: {
        categories: this.itemYear2,
        crosshair: true,
        accessibility: {
          description: 'DOANH THU THEO NĂM',
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
      },
      series: this.chartTest,
    });
  }
}
