import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [];
  connectionMessage;
  connectionUsers;
  backconnect;
  message;
  username;
  userInput;
  users;

  constructor(private chatService: ChatService) { }

  @HostListener('window:beforeunload')
  onExit() {
    if (this.username) this.chatService.exitSession(this.username);
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.username);
    this.message = '';
    if (this.messages.length > 8) this.messages.splice(0, 1);
  }

  ngOnInit() {
    this.connectionMessage = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
    this.connectionUsers = this.chatService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  saveUsername() {
    if (this.userInput.length > 0) this.username = this.userInput;
    this.chatService.saveUsername(this.username);
  }

  ngOnDestroy() {
    this.connectionMessage.unsubscribe();
    this.connectionUsers.unsubscribe();
  }
}
