import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import {
  decrement,
  update,
} from 'src/app/Reducer/MyCartCounterState/counter.actions';

import axios from 'axios';
import goongjs from '@goongmaps/goong-js';
import goongClient from '@goongmaps/goong-sdk';
import goongDirections from '@goongmaps/goong-sdk/services/directions';
import polyline from '@mapbox/polyline';
import GoongGeocoder from '@goongmaps/goong-geocoder';
import { Router } from '@angular/router';

const baseClient = goongClient({
  accessToken: `qC4PYlzc2uRftpn5bvwCitxhShAqfmunT4QNduMk`,
});
const directionService = goongDirections(baseClient);

declare var paypal: any;

@Component({
  selector: 'app-new-cart-online',
  templateUrl: './new-cart-online.component.html',
  styleUrls: ['./new-cart-online.component.css'],
})
export class NewCartOnlineComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  cookie = inject(CookieService);
  authApi = inject(AuthApiService);
  store = inject(Store);
  router = inject(Router);
  renderer = inject(Renderer2);
  el = inject(ElementRef);

  carts!: any;
  cart_image: any = null;
  user!: any;

  paidFor = false;
  sum: any = 0;
  itemsArray: any = [];
  map: any = null;
  startPoint: string = '';
  endPoint: string = '';
  url: any = 'https://rsapi.goong.io/geocode?address';

  results: any;

  Object = Object;

  ngOnInit(): void {

    if (this.cookie.check('cart-foodapp')) {
      this.carts = JSON.parse(this.cookie.get('cart-foodapp'));
    }
    if (this.cookie.check('cart-image-foodapp')) {
      this.cart_image = JSON.parse(this.cookie.get('cart-image-foodapp'));
    }
    if (this.cookie.check('user') === true) {
      this.user = JSON.parse(this.cookie.get('user'));
    }

    if (this.cart_image !== null) {
      for (let key of Object.keys(this.cart_image)) {
        this.sum += this.cart_image[key].soLuong * this.cart_image[key].donGia;
      }
    }

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

    goongjs.accessToken = 'IaGefUsaQiWrsd3NdHuw3gPAXddl7DSF9EKJVs8E';
    this.map = new goongjs.Map({
      container: 'map1',
      style: 'https://tiles.goong.io/assets/navigation_day.json',
      center: [105.83991, 21.028],
      zoom: 15,
    });

    var geocoder = new GoongGeocoder({
      accessToken: 'qC4PYlzc2uRftpn5bvwCitxhShAqfmunT4QNduMk',
      placeholder: 'Giao hàng tại...',
    });
    geocoder.addTo('#geocoder');

    // Get the geocoder results container.

    // Add geocoder result to container.
    geocoder.on('result', (e: { result: any }) => {
      this.endPoint = e.result.result.name;
      this.handleSearch();
    });

    geocoder.on('clear', () => {
      this.endPoint = '';
    });
    // console.log("icon-search",this.el.nativeElement.querySelector('svg.mapboxgl-ctrl-geocoder--icon-search > path'))
    this.renderer.setAttribute(this.el.nativeElement.querySelector('svg.mapboxgl-ctrl-geocoder--icon-search > path'), 'd', 'M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z')
    this.renderer.setAttribute(this.el.nativeElement.querySelector('svg.mapboxgl-ctrl-geocoder--icon-search'), 'viewBox', '0 0 640 512')
    // console.log(Object.keys(this.cart_image).length === 0 || this.cart_image === null)
  }

  deleteItem(item: any) {
    this.store.dispatch(decrement({ payload: item.soLuong }));
    if (item.idThucAn in this.carts) {
      delete this.carts[item.idThucAn];
      this.cookie.set('cart-foodapp', JSON.stringify(this.carts));
      return this.carts;
    }
  }

  deleteItemImage(item: any) {
    // this.store.dispatch(decrement({ payload: item.soLuong }));
    if (item.idThucAn in this.cart_image) {
      delete this.cart_image[item.idThucAn];
      this.cookie.set('cart-image-foodapp', JSON.stringify(this.cart_image));
      return this.cart_image;
    }
  }

  update(itemId: any, value: any) {
    // console.log(itemId);
    this.carts = {
      ...this.carts,
      [itemId]: {
        ...this.carts[itemId],
        soLuong: parseInt(value),
      },
    };
    this.cart_image = {
      ...this.cart_image,
      [itemId]: {
        ...this.cart_image[itemId],
        soLuong: parseInt(value),
      },
    };
    this.cookie.set('cart-image-foodapp', JSON.stringify(this.cart_image));
    this.cookie.set('cart-foodapp', JSON.stringify(this.carts));
    this.store.dispatch(update({ payload: value }));
  }

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
            `${this.url}=123/12 Võ Văn Tần&api_key=qC4PYlzc2uRftpn5bvwCitxhShAqfmunT4QNduMk`
          ),
          axios.get(
            `${this.url}=${this.endPoint}&api_key=qC4PYlzc2uRftpn5bvwCitxhShAqfmunT4QNduMk`
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
