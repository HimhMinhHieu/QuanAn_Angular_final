import { Component, OnInit, inject } from '@angular/core';
import { Database, off, onValue, push, ref, set } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qrcode-check-in',
  templateUrl: './qrcode-check-in.component.html',
  styleUrls: ['./qrcode-check-in.component.css'],
})
export class QRCodeCheckInComponent implements OnInit {
  database = inject(Database);
  route = inject(ActivatedRoute);
  router = inject(Router)

  name!: any;
  email: any = 'None';

  idBan!: any;

  ngOnInit(): void {
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any);
    this.idBan = idBan;

  }

  changeName(event: any) {
    this.name = event.target.value;
  }

  changeEmail(event: any) {
    this.email = event.target.value + '@gmail.com';
  }

  checkIn() {
    const postData = {
      name: this.name,
      email: this.email,
    };
    const db = this.database;
    const newChatroomRef = push(
      ref(this.database, `ban/${this.idBan}/people/`),
      postData
    );
    const newChatroomId = newChatroomRef.key;
  }
}
