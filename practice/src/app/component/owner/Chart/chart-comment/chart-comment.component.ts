import { Component, OnInit, TemplateRef, inject, ViewChild  } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-chart-comment',
  templateUrl: './chart-comment.component.html',
  styleUrls: ['./chart-comment.component.css'],
})
export class ChartCommentComponent implements OnInit {
  AuthAPIs = inject(AuthApiService);
  modalRef?: BsModalRef;
  modalService = inject(BsModalService)
  chartComment!: any;

  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  isModalShown = false;

  dulieu!: any;

  arrChartCmt!: any;

  name !: any;
  y !: any;
  p: number = 1;
  dulieuCmt !: any;

  test!: any
  testChart!: any

  loading: any = true;
  async ngOnInit(): Promise<void> {
    let data = await this.AuthAPIs.getAPIAsyncSentiment(
      endpointsAuth.get_sentiment
    );

    if (data === null) {
      this.loading = true;
    }

    if (data != null) {
      this.loading = false;
      this.dulieu = data
      console.log(data);
      let arrTMP: any = [];
      // Object(data).map((key: any, value: any) => {
      //   arrTMP.push({
      //     name: key,
      //     y: value
      //   })
      // })
      let test: any = []
      Object.entries(data).map((a: any) => {
        arrTMP.push({
          name: a[0],
          y: parseFloat(a[1].rate),
        });
        test.push(
          a[1].list_comment
        )
      });
      this.test = test
      this.arrChartCmt = arrTMP;
      console.log(this.arrChartCmt);
      console.log(data);
      console.log(Object.values(data));

      console.log(this.test)
      this.chartComment = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'BIỂU ĐỒ TRÒN BIỂU HIỆN TÌNH TRẠNG BÌNH LUẬN CỦA QUÁN ĂN',
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
            point: {
              events: {
                click: this.showModal.bind(this),
              },
            },
          },
        },
        series: [
          {
            name: 'Percentage',
            colorByPoint: true,
            data: this.arrChartCmt,
          },
        ] as any,
      });
    }
  }

  detailComment(event: any) {
    if (event.point) {
      const pointValue = event.point.y; // Lấy giá trị của điểm
      console.log('Point value:', pointValue);
    }
  }

  showModal(event: any): void {
    if (event.point) {
      this.isModalShown = true;
      const pointValue = event.point.y; // Lấy giá trị của điểm
      const pointValueName = event.point.name;
      console.log('Point value:', pointValue);
      this.y = pointValue
      this.name = pointValueName

      let cmt : any = []
      Object.entries(this.dulieu).map((a: any) => {
        if(this.name === a[0]) {
          cmt.push(a[1].list_comment)
        }
      });
      this.dulieuCmt = cmt;
      console.log(this.dulieuCmt)

      let testCMT: any = []
      // Object.entries(this.dulieuCmt).map((a :any) => {
      //   testCMT.push(a[1])
      // })

      // console.log('testCMT',testCMT)


      this.dulieuCmt.map((a: any) => {
        for(let index in a) {
          testCMT.push(a[index])
          console.log(a[index].noi_dung)
          console.log(a[index].id_thuc_an.id)
        }
      })
      this.testChart = testCMT
      console.log(this.testChart)
    }
  }

  hideModal(): void {
    this.autoShownModal?.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }
}
