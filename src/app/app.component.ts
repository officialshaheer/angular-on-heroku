import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from '../app/services/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-on-heroku';

  constructor(private socketService: SocketServiceService) { }

  ngOnInit() {
    // Listen to events from socket-io server
    // this.socketService.listen('test event').subscribe((data) => {
    //   console.log('first ',data);
    // });

    // this.socketService.listen('trackName').subscribe((data) => {
    //   console.log('second ',data);
    // });


  }  
}
