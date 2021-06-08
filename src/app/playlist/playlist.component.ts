import { Component, OnInit} from '@angular/core';
import { SocketServiceService } from '../services/socket.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  trackName: any;
  streamedTracks: any = [];

  constructor(private socketService: SocketServiceService) { }

  ngOnInit(): void {

    this.socketService.listen('recievingTrackFromUser').subscribe((data: any) => {
      // console.log(data);
      data.forEach((element: any) => {
        this.streamedTracks.push(element)
      });
      
      console.log(this.streamedTracks);
      
    });

  }

  submitTrackToList() {
    this.socketService.emit('sendTrack',this.trackName);
    
  }

}
