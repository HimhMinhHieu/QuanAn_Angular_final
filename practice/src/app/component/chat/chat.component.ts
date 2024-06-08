import { Component, OnInit, inject } from '@angular/core';
import {
  Database,
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  update,
} from '@angular/fire/database';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  cookie = inject(CookieService);
  database = inject(Database);

  chatList!: any;
  permissionUser!: any;

  currentUser!: any;

  dataChild : any = null;

  idKey !: any;

  ngOnInit(): void {
    if (this.cookie.check('user')) {
      this.currentUser = JSON.parse(this.cookie.get('user'));
      console.log(this.currentUser.vaiTro === 'OWNER')
    }
    const dbRef = ref(this.database);
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (this.currentUser.vaiTro === 'CUSTOMER') {
          snapshot.val().map((u: any) => {
            this.permissionUser = Object.values(u).filter(
              (it: any) =>
                it.id !== this.currentUser.id &&
                it.vai_tro === 'OWNER' &&
                it.active === '1'
            );
          });

        }
        if (this.currentUser.vaiTro === 'OWNER') {
          snapshot.val().map((u: any) => {
            this.permissionUser = Object.values(u).filter(
              (it: any) =>
                it.id !== this.currentUser.id &&
                it.vai_tro === 'CUSTOMER' &&
                it.active === '1'
            );
          });
        // console.log("perUSer", snapshot.val());
      }
      })
      .catch((error) => {
        console.error(error);
      });

    const starCountRef = ref(this.database, 'chatlist/' + this.currentUser.id);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.val() !== null) {
        // setChatList(Object.values(snapshot.val()));
        // console.warn(chatList)
        this.chatList = Object.values(snapshot.val());
        console.log("Chat List",this.chatList);
      }
    });


  }

  createChatList(data: any) {
    const dbRef = ref(this.database);
    get(child(dbRef, 'chatlist/' + this.currentUser.id + '/' + data.id))
      .then((snapshot) => {
        if (snapshot.val() === null) {
          // const db = getDatabase();
          // let roomID = uuid.v4();
          // console.warn(roomID);
          // A post entry.
          const newChatroomRef = push(ref(this.database, 'chatlist/chatrooms'), {
            firstUser: this.currentUser.id,
            secondUser: data.id,
            messages: [],
          });


          const newChatroomId = newChatroomRef.key;
          this.idKey = newChatroomId;
          const postData = {
            roomID: newChatroomId,
            name:
              this.currentUser.lastName + ' ' + this.currentUser.firstName,
            img: this.currentUser.avatar,
            email: this.currentUser.email,
            role: this.currentUser.vaiTro,
            lastMsg: '',
          };

          // const newChat = {
          //   firstUser: user.userdata.id,
          //   secondUser: data.id,
          //   messages: [],
          // };

          // Get a key for a new Post.
          // const newPostKey = push(child(ref(db), 'chatlist')).key;

          // Write the new post's data simultaneously in the posts list and the user's post list.
          const updates: any = {};
          updates['chatlist/' + data.id + '/' + this.currentUser.id] = postData;
          delete data['password'];

          data.roomID = newChatroomId;
          data.lastMsg = '';
          updates['chatlist/' + this.currentUser.id + '/' + data.id] = data;

          // updates['messages'] = newChat;

          // navigation.navigate('Chat Test', { data: data });
          this.dataChild = data

          this.cookie.set("currentChat", JSON.stringify(data))

          return update(ref(this.database), updates);
        } else {
          // const newChatroomRef = push(ref(database, 'chatrooms'), {
          //     firstUser: user.userdata.id,
          //     secondUser: data.id,
          //     messages: [],
          //   });

          //   const newChatroomId = newChatroomRef.key;

          const dbRef = ref(this.database);
          get(child(dbRef, 'chatlist/' + this.currentUser.id + '/' + data.id))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const db = getDatabase();
                const updates: any = {};
                // console.log(snapshot.val());
                // console.warn(snapshot.val().roomID)
                data.roomID = snapshot.val().roomID;
                updates['chatlist/' + this.currentUser.id + '/' + data.id] =
                  data;
                // navigation.navigate('Chat Test', { data: data });
                this.dataChild = data
                this.cookie.set("currentChat", JSON.stringify(data))
                return update(ref(db), updates);
              } else {
                console.log('No data available');
                return;
              }
            })
            .catch((error) => {
              console.error(error);
            });
            return;
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // const db = getDatabase();
    // let roomID = uuid.v4();
    // console.warn(roomID)
    // // A post entry.
    // const newChatroomRef = push(ref(database, 'chatrooms'), {
    //     firstUser: user.userdata.id,
    //     secondUser: data.id,
    //     messages: [],
    // });

    // const newChatroomId = newChatroomRef.key;
    // const postData = {
    //     roomID: newChatroomId,
    //     name: user.userdata.last_name + " " + user.userdata.first_name,
    //     img: "https://res.cloudinary.com/dtlqyvkvu/" + user.userdata.avatar,
    //     email: user.userdata.email,
    //     MSSV: user.userdata.mssv,
    //     role: role,
    //     khoa: user.userdata.khoa.name,
    //     lop: user.userdata.lop.name,
    //     lastMsg: "",
    // };

    // const newChat = {
    //     firstUser: user.userdata.id,
    //     secondUser: data.id,
    //     messages: [],
    // }

    // // Get a key for a new Post.
    // // const newPostKey = push(child(ref(db), 'chatlist')).key;

    // // Write the new post's data simultaneously in the posts list and the user's post list.
    // const updates = {};
    // updates['chatlist/' + data.id + '/' + user.userdata.id] = postData;
    // delete data["password"]

    // data.roomID = newChatroomId;
    // updates['chatlist/' + user.userdata.id + '/' + data.id] = data;

    // // updates['messages'] = newChat;

    // navigation.navigate("Chat Test", { data: data })

    // return update(ref(db), updates);
  }
}
