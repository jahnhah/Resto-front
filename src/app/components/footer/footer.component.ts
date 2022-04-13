import { Component, OnInit } from '@angular/core';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  mail!: string
  constructor(private ws: WsService) { }
  toast = false;
  toast_text = ''
  ngOnInit(): void {
  }

  sendMail() {
    console.log('------>', this.mail)
    const body = { mail: this.mail }
    this.ws.sendMail(body).subscribe((result) => console.log(result))
  }

}
