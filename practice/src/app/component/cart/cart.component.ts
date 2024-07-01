import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import {
  decrement,
  update,
} from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';
import Swal from 'sweetalert2';

import axios from 'axios';
import goongjs from '@goongmaps/goong-js';
import goongClient from '@goongmaps/goong-sdk';
import goongDirections from '@goongmaps/goong-sdk/services/directions';
import polyline from '@mapbox/polyline';
import GoongGeocoder from '@goongmaps/goong-geocoder';

const baseClient = goongClient({
  accessToken: `vkNM6HYVClNhJ1fdirF6j4MLyLAqyqaM3WcW0KPj`,
});
const directionService = goongDirections(baseClient);

declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  @Input() c!: any;
  carts!: any;
  hcarts!: any;
  quantityControl = new FormControl();
  user!: any;
  huser!: any;
  constructor(
    private cartService: MyCartService,
    private router: Router,
    private cookie: CookieService,
    private store: Store<{ counter: { counter: number } }>,
    private authApi: AuthApiService
  ) {}
  // carts$!: Observable<any>;
  Object = Object;

  paidFor = false;
  sum: number = 0;
  itemsArray: any = [];

  //GOONG-MAP
  map: any = null;
  startPoint: string = '';
  endPoint: string = '';
  url: any = 'https://rsapi.goong.io/geocode?address';

  results: any;

  async ngOnInit(): Promise<void> {
    if (this.cookie.check('cart-foodapp') === true) {
      this.carts = JSON.parse(this.cookie.get('cart-foodapp'));
      console.log(this.carts);
    }

    for (let c in this.carts) {
      this.sum += this.carts[c].donGia * this.carts[c].soLuong;
      // console.log(this.sum);
    }

    //item of paypal
    let itemA = [];
    for (let c in this.carts) {
      itemA.push({
        name: this.carts[c].name,
        quantity: this.carts[c].soLuong,
        description: this.carts[c].name,
        image_url: this.carts[c].image,
        unit_amount: {
          currency_code: 'USD',
          value: this.carts[c].donGia,
        },
      });
      this.itemsArray = itemA;
    }
    // console.log('StackOverFow', this.itemsArray);
    //...

    // console.log(this.carts);
    this.hcarts = this.cookie.check('cart-foodapp');
    // console.log(this.hcarts);
    if (this.cookie.check('user') === true) {
      this.user = JSON.parse(this.cookie.get('user'));
    }
    this.huser = this.cookie.check('user');

    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            intent: 'CAPTURE',
            payer: {
              name: {
                given_name: `${this.user.firstName}`,
                surname: `${this.user.lastName}`,
              },
              address: {
                address_line_1: '123/12 Võ Văn Tần',
                admin_area_2: 'Anytown',
                admin_area_1: 'CA',
                postal_code: '12345',
                country_code: 'US',
              },
            },
            purchase_units: [
              {
                // reference_id: 'Reference_ID_L2L32',
                description: 'Description of PU',
                custom_id: `${this.user.id}`,
                soft_descriptor: 'Purchase Descriptor',
                // invoice_id: 'INV_202302011234',
                // supplementary_data: {
                //   card: {
                //     level_2: {
                //       invoice_id: 'INV_202302011234',
                //       tax_total: {
                //         currency_code: 'USD',
                //         value: 5.2,
                //       },
                //     },
                //     level_3: {
                //       shipping_amount: {
                //         currency_code: 'USD',
                //         value: 1.17,
                //       },
                //       duty_amount: {
                //         currency_code: 'USD',
                //         value: 1.16,
                //       },
                //       discount_amount: {
                //         currency_code: 'USD',
                //         value: 1.15,
                //       },
                //       shipping_address: {
                //         address_line_1: '123 Main St.',
                //         admin_area_2: 'Anytown',
                //         admin_area_1: 'CA',
                //         postal_code: '12345',
                //         country_code: 'US',
                //       },
                //       ships_from_postal_code: '12345',
                //       line_items: [
                //         {
                //           name: 'Item1',
                //           description: 'Description of Item1',
                //           upc: {
                //             type: 'UPC-A',
                //             code: '001004697',
                //           },
                //           unit_amount: {
                //             currency_code: 'USD',
                //             value: 9.5,
                //           },
                //           tax: {
                //             currency_code: 'USD',
                //             value: 5.12,
                //           },
                //           discount_amount: {
                //             currency_code: 'USD',
                //             value: 1.11,
                //           },
                //           total_amount: {
                //             currency_code: 'USD',
                //             value: 95.1,
                //           },
                //           unit_of_measure: 'POUND_GB_US',
                //           quantity: 10,
                //           commodity_code: 98756,
                //         },
                //       ],
                //     },
                //   },
                // },
                amount: {
                  currency_code: 'USD',
                  value: this.sum,
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: this.sum,
                    },
                  },
                },

                items: this.itemsArray,
                shipping: {
                  address: {
                    address_line_1: `${this.endPoint}`,
                    admin_area_2: 'Anytown',
                    admin_area_1: 'CA',
                    postal_code: '12345',
                    country_code: 'US',
                  },
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log(order);
          this.paidFor = true;
          this.authApi.post(endpointsAuth.pay, this.carts).subscribe(() => {
            this.carts = null;
            this.cookie.delete('cart-foodapp');
            this.store.dispatch(update({ payload: 0 }));
            this.router.navigate(['/']);
          });
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);

    goongjs.accessToken = 'BMO1nuDvKedhPhgswGHElsC734MXtCUWHbKgh8Kt';
    this.map = new goongjs.Map({
      container: 'map1',
      style: 'https://tiles.goong.io/assets/navigation_day.json',
      center: [105.83991, 21.028],
      zoom: 15,
    });

    var geocoder = new GoongGeocoder({
      accessToken: 'vkNM6HYVClNhJ1fdirF6j4MLyLAqyqaM3WcW0KPj',
      placeholder: 'Giao hàng tại...',
    });
    geocoder.addTo('#geocoder');

    // Get the geocoder results container.
    // this.results = document.getElementById('result');

    // Add geocoder result to container.
    geocoder.on('result', (e: { result: any }) => {
      // this.results.innerText = JSON.stringify(e.result.result.name, null, 2);
      this.endPoint = e.result.result.name;
      this.handleSearch();
      // console.log(this.endPoint);
    });

    geocoder.on('clear', () => {
      this.endPoint = '';
      // this.handleSearch();
    });
  }

  deleteItem(item: any) {
    this.store.dispatch(decrement({ payload: item.soLuong }));
    if (item.idThucAn in this.carts) {
      delete this.carts[item.idThucAn];
      this.cookie.set('cart-foodapp', JSON.stringify(this.carts));

      return this.carts;
    }
  }

  updateItem(itemId: number) {}

  update(itemId: any, value: any) {
    console.log(itemId);
    this.carts = {
      ...this.carts,
      [itemId]: {
        ...this.carts[itemId],
        soLuong: parseInt(value),
      },
    };

    // console.log(this.carts)
    this.cookie.set('cart-foodapp', JSON.stringify(this.carts));

    console.log(JSON.parse(this.cookie.get('cart-foodapp')));
    // let s = Object.values(this.carts).reduce(
    //   (init: any, current: any) => init + current['soLuong'],
    //   0
    // );
    this.store.dispatch(update({ payload: value }));
    // console.log(JSON.parse(this.cookie.get('cart-foodapp')));
  }

  pay() {
    console.log(JSON.stringify(this.carts));
    this.authApi.post(endpointsAuth.pay, this.carts).subscribe((res) => {
      this.carts = null;
      this.cookie.delete('cart-foodapp');
      this.store.dispatch(update({ payload: 0 }));
      Swal.fire({
        icon: 'success',
        title: 'Congratulations',
        text: 'Chúc mừng bạn đã thanh toán thành công',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']);
        }
      });
    });
    //   this.carts = null
    //   this.cookie.delete('cart')
    //   this.store.dispatch(update({payload: 0}))
    // })
  }

  changeQuantity(item: any, event: Event) {
    // if(item.idThucAn in this.carts)
    // {
    //   this.cookie.set('cart', JSON.stringify(this.carts));
    //   this.carts = { ...this.carts, [item.idThucAn]: { ...this.carts[item.idThucAn], "soLuong": parseInt() } };
    //     console.log(this.carts)
    //     return this.carts;
    // }
  }

  //GONG-MAP
  direction(point: any): void {
    const map = new goongjs.Map({
      container: 'map1',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.028],
      zoom: 12,
    });
    this.map = map;

    map.on('load', function () {
      var layers = map.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      var firstSymbolId: any;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
        }
      }
      const originPlace = point.origin;
      const destinationPlace = point.destination;

      if (originPlace) {
        var el = document.createElement('div');
        el.style.backgroundColor = 'red';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        var marker = new goongjs.Marker(el)
          .setLngLat([originPlace.lng, originPlace.lat])
          .addTo(map);
      }
      if (destinationPlace) {
        var marker = new goongjs.Marker()
          .setLngLat([destinationPlace.lng, destinationPlace.lat])
          .addTo(map);
      }
      map.flyTo({
        center: [originPlace.lng, originPlace.lat],
        essential: true,
      });
      directionService
        .getDirections({
          origin: `${originPlace.lat},${originPlace.lng}`,
          destination: `${destinationPlace.lat},${destinationPlace.lng}`,
          vehicle: 'bike',
        })
        .send()
        .then(function (response: any): void {
          var directions = response.body;
          var route = directions.routes[0];
          var geometry_string = route.overview_polyline.points;
          var geoJSON = polyline.toGeoJSON(geometry_string);
          map.addSource('route', {
            type: 'geojson',
            data: geoJSON,
          });

          map.addLayer(
            {
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#1e88e5',
                'line-width': 8,
              },
            },
            firstSymbolId
          );
        });
    });
  }

  async handleSearch() {
    if (!this.endPoint) {
      alert('Please enter locations');
    } else {
      try {
        const [originRes, destRes] = await Promise.all([
          axios.get(
            `${this.url}=123/12 Võ Văn Tần&api_key=vkNM6HYVClNhJ1fdirF6j4MLyLAqyqaM3WcW0KPj`
          ),
          axios.get(
            `${this.url}=${this.endPoint}&api_key=vkNM6HYVClNhJ1fdirF6j4MLyLAqyqaM3WcW0KPj`
          ),
        ]);
        const origin = originRes.data.results[0].geometry.location;
        const destination = destRes.data.results[0].geometry.location;
        this.map.remove();
        this.direction({ origin, destination });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
