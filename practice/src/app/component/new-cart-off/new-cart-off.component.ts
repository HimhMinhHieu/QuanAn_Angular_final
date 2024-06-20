import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import {
  Database,
  child,
  get,
  getDatabase,
  push,
  ref,
  update,
} from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService } from 'src/app/Config/auth-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-cart-off',
  templateUrl: './new-cart-off.component.html',
  styleUrls: ['./new-cart-off.component.css'],
  animations: [
    trigger('showAnimate', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1250, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class NewCartOffComponent implements OnInit {
  apis = inject(ApiService);
  el = inject(ElementRef);
  router = inject(Router);
  cookie = inject(CookieService);
  authApi = inject(AuthApiService);
  database = inject(Database);
  route = inject(ActivatedRoute);

  loading: any = false;

  p: number = 1;
  itemPerPage: number = 4;
  totalProduct!: any;

  carts!: any;
  carts_images!: any;

  sum!: any;
  quantity!: any;

  today: any = new Date();

  idBan!: any;

  Object = Object;

  async ngOnInit(): Promise<void> {
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any);
    this.idBan = idBan;
    // this.backgroundFood = `background-image: url(${this.backgroundBody}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: background-image 1.5s ease-in; background: transparent`;
    if (this.cookie.check('cart-off')) {
      this.carts = JSON.parse(this.cookie.get('cart-off'));
    }
    if (this.cookie.check('cart-off-image')) {
      this.carts_images = JSON.parse(this.cookie.get('cart-off-image'));
    } else {
      this.loading = true;
    }
  }

  pageChanged(page: any) {
    this.p = page;
  }

  Back() {
    this.router.navigate([`ban/${this.idBan}`]);
  }

  deleteItemImage(item: any) {
    // this.store.dispatch(decrement({ payload: item.soLuong }))
    // if (item.idThucAn in this.carts) {
    //   delete this.carts[item.idThucAn];
    //   this.cookie.set('cart-off', JSON.stringify(this.carts));

    //   return this.carts;
    // }

    if (item.idThucAn in this.carts_images) {
      delete this.carts_images[item.idThucAn];
      this.cookie.set('cart-off-image', JSON.stringify(this.carts_images));

      return this.carts_images;
    }
  }

  deleteItem(item: any) {
    // this.store.dispatch(decrement({ payload: item.soLuong }))
    if (item.idThucAn in this.carts) {
      delete this.carts[item.idThucAn];
      this.cookie.set('cart-off', JSON.stringify(this.carts));
      // console.log(JSON.parse(this.cookie.get('cart-off')))
      return this.carts;
    }
    // if (item.idThucAn in this.carts_images) {
    //   delete this.carts_images[item.idThucAn];
    //   this.cookie.set('cart-off-image', JSON.stringify(this.carts_images));

    //   return this.carts_images;
    // }
  }

  // async fetchOffer() {
  //   const snapshot = await get(
  //     ref(this.database, `chatlist/chatrooms/${this.data.roomID}`)
  //   );
  //   return snapshot.val()
  // }

  async pay() {
    const dbRef = ref(this.database);
    get(child(dbRef, 'offer/ban/' + this.idBan))
      .then((snapshot) => {
        // return snapshot.val()
        // const db = getDatabase();
        // let roomID = uuid.v4();
        // console.warn(roomID);
        // A post entry.
        const newChatroomRef = push(ref(this.database, 'offer/ban/2'), {
          ban: this.idBan,
          cart: {
            carts: this.carts_images,
            note: 'Đang phục vụ',
            done: false,
          },
          note: 'Đang phục vụ',
          done: false,
          createdAt: `${this.today}`,
        });
        const newChatroomId = newChatroomRef.key;
        let res = this.apis.postASYNC(endpoints.payOff, this.carts)
        // console.log(new Date())
        // const postData = {
        //   idDatMon: newChatroomId,
        //   ban: 2,
        //   cart: { carts: this.carts, note: 'Đang phục vụ', done: false },
        //   note: 'Đang phục vụ',
        //   done: false,
        //   createdAt: new Date(),
        // }
        // const updates: any = {};
        // updates[`offer/ban/2/${newChatroomId}`] = postData
        // update(ref(this.database), updates);

        // this.idKey = newChatroomId;
        // const postData = {
        //   ban: 2,
        //   cart: [this.carts],
        //   note: 'Đang phục vụ',
        //   done: false,
        // };

        // const newChat = {
        //   firstUser: user.userdata.id,
        //   secondUser: data.id,
        //   messages: [],
        // };

        // Get a key for a new Post.
        // const newPostKey = push(child(ref(db), 'chatlist')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        // const updates: any = {};
        // updates['offer/ban/' + 2] = postData;
        // delete data['password'];

        // data.roomID = newChatroomId;
        // data.lastMsg = '';
        // updates['chatlist/' + this.currentUser.id + '/' + data.id] = data;

        // updates['messages'] = newChat;

        // navigation.navigate('Chat Test', { data: data });
        // this.dataChild = data;

        // this.cookie.set('currentChat', JSON.stringify(data));

        // return push(ref(this.database), updates);
        this.carts = null;
        this.cookie.delete('cart-off');

        this.carts_images = null;
        this.cookie.delete('cart-off-image');
        this.router.navigate([`ban/${this.idBan}`]);
        // return;
      })
      .catch((error) => {
        console.error(error);
      });

    // Swal.fire({
    //   icon: 'success',
    //   title: 'Congratulations',
    //   text: 'Chúc mừng bạn đã đặt món thành công',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.router.navigate(['/test']);
    //   }
    // });
    // return;
    // this.apis.postASYNC(endpoints.payOff, this.carts).subscribe((res) => {
    //   this.carts = null
    //   this.cookie.delete('cartOff')
    //   this.store.dispatch(update({payload: 0}))
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Congratulations',
    //     text: 'Chúc mừng bạn đã đặt bàn thành công',
    //   }).then((result) => {
    //     if(result.isConfirmed)
    //     {
    //       this.router.navigate(['/']);
    //     }
    //   })
    // })
    //   this.carts = null
    //   this.cookie.delete('cart')
    //   this.store.dispatch(update({payload: 0}))
    // })
  }

  // onPlus(value: any) {
  //   this.quantity = this.carts_images[value.id].soLuong + 1;
  //   if (this.quantity <= 0) this.quantity = 1;
  //   this.sum = this.carts_images[value.id].donGia * this.quantity;
  //   this.carts_images[value.id].soLuong = this.quantity;
  //   this.carts_images[value.id].donGia = this.sum;
  //   this.cookie.set('cart-off-image', JSON.stringify(this.carts_images));
  //   console.log('cartimage', this.carts_images)
  // }

  // onMinus(value: any) {
  //   this.quantity = this.carts_images[value.id].soLuong - 1;
  //   if (this.quantity <= 0) this.quantity = 1;
  //   this.sum = this.carts_images[value.id].donGia * this.quantity;
  //   this.carts_images[value.id].soLuong = this.quantity;
  //   this.carts_images[value.id].donGia = this.sum;
  //   this.cookie.set('cart-off-image', JSON.stringify(this.carts_images));
  //   console.log('cartimage', this.carts_images)
  // }

  // onChangeQuan(value: any) {
  //   this.quantity = parseInt(value);
  //   this.sum = value.donGia * this.quantity;
  //   this.carts_images[value.id].soLuong = this.quantity;
  //   this.carts_images[value.id].donGia = this.sum;
  //   this.cookie.set('cart-off-image', JSON.stringify(this.carts_images));
  //   console.log('cartimage', this.carts_images)
  //   // console.log(this.sum)
  // }
}
