import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-messagecomponent',
  templateUrl: './messagecomponent.component.html',
  styleUrls: ['./messagecomponent.component.scss'],
})
export class MessagecomponentComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {}

}
