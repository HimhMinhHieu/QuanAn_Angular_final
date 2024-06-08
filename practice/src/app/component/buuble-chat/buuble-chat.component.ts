import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Database,
  get,
  off,
  onValue,
  ref,
  update,
} from '@angular/fire/database';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';


@Component({
  selector: 'app-buuble-chat',
  templateUrl: './buuble-chat.component.html',
  styleUrls: ['./buuble-chat.component.css'],
})
export class BuubleChatComponent implements OnInit, OnChanges {
  @ViewChild('MessageText') redel!: ElementRef;
  // @ViewChild('emoji') emoji!: ElementRef;
  // @ViewChild('toggleEmoji') toggleEmoji !: ElementRef;
  moment: any = moment;
  cookie = inject(CookieService);
  database = inject(Database);
  renderer = inject(Renderer2);

  showEmojiPicker = false;

  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  set = 'twitter';

  message = '';

  messages: any = signal([]);
  currentUser!: any;
  // messText: any = signal('');
  messText!: any;
  // dataRoomID: any = signal('');

  msg!: any;
  text: any = '';

  currentChat!: any;
  hcurrenChat!: any;

  // userInchat!: any;

  // constructor() {
  //   effect(async () => {
  //     // console.log(this.messages())
  //     const myChatroom = await this.fetchMessages();

  //     // setMessages(this.renderMessages(myChatroom.messages));
  //     this.messages.set(this.renderMessages(myChatroom.messages));
  //     this.msg = this.messages();
  //     console.log(this.msg);
  //   });
  // }

  ngOnChanges(changes: SimpleChanges): void {
    this.hcurrenChat = this.cookie.check('currentChat');
    if (this.cookie.check('user')) {
      this.currentUser = JSON.parse(this.cookie.get('user'));
    }

    if (this.cookie.check('currentChat')) {
      this.currentChat = JSON.parse(this.cookie.get('currentChat'));
      console.log(this.currentChat);
      if (this.currentChat !== null) {
        const msgComp = computed(async () => {
          const myChatroom = await this.fetchMessages();

          // setMessages(this.renderMessages(myChatroom.messages));
          this.messages.set(this.renderMessages(myChatroom.messages));
          // console.log("in const",this.messages())
        });
        // console.log("out const",this.messages())
        msgComp();
        // console.log(this.msg.__zone_symbol__value);
        const chatroomRef = ref(
          this.database,
          `chatlist/chatrooms/${this.currentChat.roomID}`
        );
        onValue(chatroomRef, (snapshot) => {
          if (snapshot.val() !== null) {
            const data = snapshot.val();

            // this.userInchat = data;
            // console.log(this.userInchat.firstUser)
            // setMessages(renderMessages(data.messages));
            this.messages.set(this.renderMessages(data.messages));
            console.log("messages",this.messages())
          } else {
            const data = snapshot.val();
            this.messages.set(this.renderMessages(data.messages));
          }
          // console.log("chatrooms", snapshot.val())
        });

        () => {
          off(chatroomRef);
        };
      }
    }

    // if(this.data !== null) {
    //   this.messages.set([]);
    // }
    // this.dataRoomID.set(this.data.roomID);
    // effect(async () => {
    //   const myChatroom = await this.fetchMessages();

    //   // setMessages(this.renderMessages(myChatroom.messages));
    //   this.messages = this.renderMessages(myChatroom.messages);
    // });
  }

  ngOnInit(): void {
    this.hcurrenChat = this.cookie.check('currentChat');
    // console.log('roomID', this.data.roomID);
    if (this.cookie.check('user')) {
      this.currentUser = JSON.parse(this.cookie.get('user'));
    }

    if (this.cookie.check('currentChat')) {
      this.currentChat = JSON.parse(this.cookie.get('currentChat'));

      if (this.currentChat !== null) {
        const msgComp = computed(async () => {
          const myChatroom = await this.fetchMessages();

          // setMessages(this.renderMessages(myChatroom.messages));
          this.messages.set(this.renderMessages(myChatroom.messages));
          // console.log("in const",this.messages())
        });
        // console.log("out const",this.messages())
        msgComp();
        // console.log(this.msg.__zone_symbol__value);
        const chatroomRef = ref(
          this.database,
          `chatlist/chatrooms/${this.currentChat.roomID}`
        );
        onValue(chatroomRef, (snapshot) => {
          if (snapshot.val() !== null) {
            const data = snapshot.val();

            // this.userInchat = data;
            // console.log(this.userInchat.firstUser)
            // setMessages(renderMessages(data.messages));
            this.messages.set(this.renderMessages(data.messages));
            console.log("messages",this.messages())
          } else {
            const data = snapshot.val();
            this.messages.set(this.renderMessages(data.messages));
          }
          // console.log("chatrooms", snapshot.val())
        });

        () => {
          off(chatroomRef);
        };
      }
    }
    console.log("Current Chat",this.currentChat);
    // return () => {
    //   //remove chatroom listener
    //   off(chatroomRef);
    // };
  }

  renderMessages(msgs: any[]) {
    return msgs
      ? msgs.reverse().map((msg, index) => ({
          ...msg,
          _id: index,
          user: {
            _id:
              msg.sender === this.currentUser.id
                ? this.currentUser.id
                : this.currentChat.id,
            avatar:
              msg.sender === this.currentUser.id
                ? this.currentUser.avatar_path
                : this.currentChat.avatar,
            name:
              msg.sender === this.currentUser.id
                ? this.currentUser.last_name + ' ' + this.currentUser.first_name
                : this.currentChat.last_name +
                  ' ' +
                  this.currentChat.first_name,
          },
        }))
      : [];
  }

  async fetchMessages() {
    console.log('roomIDFetch', this.currentChat.roomID);
    const snapshot = await get(
      ref(this.database, `chatlist/chatrooms/${this.currentChat.roomID}`)
    );
    console.log(snapshot.val());
    return snapshot.val();
  }

  async onSend() {
    const currentChatroom = await this.fetchMessages();
    const lastMessages = currentChatroom.messages || [];
    update(
      ref(this.database, `chatlist/chatrooms/${this.currentChat.roomID}`),
      {
        messages: [
          ...lastMessages,
          {
            text: this.message,
            sender: this.currentUser.id,
            createdAt: new Date(),
          },
        ],
      }
    );
    update(
      ref(
        this.database,
        'chatlist/' + this.currentChat.id + '/' + this.currentUser.id
      ),
      {
        roomID: this.currentChat.roomID,
        name: this.currentUser.last_name + ' ' + this.currentUser.first_name,
        img: this.currentUser.avatar,
        role: this.currentUser.vaiTro,
        lastMsg: this.message,
      }
    );

    const msg = [
      {
        _id: this.currentUser.id,
        user: {
          _id: this.currentChat.id,
          avatar: this.currentChat.avatar,
          name: this.currentChat.last_name + ' ' + this.currentChat.first_name,
        },
      },
    ];

    this.redel.nativeElement.value = '';
    this.message = '';

    this.messages.update((previousMess: any) => [...previousMess, msg]);
  }

  async onSendInput(textValue: any) {
    const currentChatroom = await this.fetchMessages();
    const lastMessages = currentChatroom.messages || [];
    update(
      ref(this.database, `chatlist/chatrooms/${this.currentChat.roomID}`),
      {
        messages: [
          ...lastMessages,
          {
            text: textValue,
            sender: this.currentUser.id,
            createdAt: new Date(),
          },
        ],
      }
    );
    update(
      ref(
        this.database,
        'chatlist/' + this.currentChat.id + '/' + this.currentUser.id
      ),
      {
        roomID: this.currentChat.roomID,
        name: this.currentUser.last_name + ' ' + this.currentUser.first_name,
        img: this.currentUser.avatar,
        role: this.currentUser.vaiTro,
        lastMsg: textValue,
      }
    );

    const msg = [
      {
        _id: this.currentUser.id,
        user: {
          _id: this.currentChat.id,
          avatar: this.currentChat.avatar,
          name: this.currentChat.last_name + ' ' + this.currentChat.first_name,
        },
      },
    ];

    this.redel.nativeElement.value = '';
    this.message = '';

    this.messages.update((previousMess: any) => [...previousMess, msg]);
  }

  setText(textValue: any) {
    this.messText = textValue;
  }

  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    console.log(this.message);
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`);
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }

  onFocusInput() {
    this.showEmojiPicker = false;
  }

  // fetchMessages = signal(async () => {
  //   const snapshot = await get(
  //     ref(this.database, `chatlist/chatrooms/${this.dataRoomID}`)
  //   );

  //   return snapshot.val();
  // });
}
