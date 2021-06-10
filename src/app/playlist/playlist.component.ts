import { Component, OnInit} from '@angular/core';
import { SocketServiceService } from '../services/socket.service';
import * as THREE from 'three';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  allTracksInitialLoad: any;

  trackName: any;

  liveTrack: any = 'Not Available';

  constructor(private socketService: SocketServiceService) { }

  ngOnInit(): void {

      this.socketService.listen('initialBroadcastAllTracks').subscribe((allTracks) => {
          this.allTracksInitialLoad = [];
          this.allTracksInitialLoad = allTracks;
          if (this.allTracksInitialLoad) {
            this.liveTrack = this.allTracksInitialLoad[this.allTracksInitialLoad.length-1];
          }
          // console.log(this.allTracksInitialLoad);
          
        });

      this.socketService.listen('initialLoadAllTracks').subscribe((allTracksToMe) => {
        this.allTracksInitialLoad = [];
        this.allTracksInitialLoad = allTracksToMe;
        if (this.allTracksInitialLoad) {
          this.liveTrack = this.allTracksInitialLoad[this.allTracksInitialLoad.length-1];
        }
        // console.log(this.allTracksInitialLoad);
        
      });

      this.socketService.listen('sendToMe').subscribe((allTracksSentBackToMe) => {
        this.allTracksInitialLoad = [];
        this.allTracksInitialLoad = allTracksSentBackToMe;
        if (this.allTracksInitialLoad) {
          this.liveTrack = this.allTracksInitialLoad[this.allTracksInitialLoad.length-1];
        }
        // console.log(this.allTracksInitialLoad);
        
      });      

  }

  submitTrackToList() {

    if (this.trackName) {
      this.socketService.emit('sendTrack',this.trackName);
    }
  }

}
