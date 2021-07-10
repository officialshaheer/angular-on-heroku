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

  orientationValues: any = [];
  broadcastingOrientationValues: any = [];

  constructor(private socketService: SocketServiceService) { }

  ngOnInit(): void {


      // Device orientation
      if (window.DeviceOrientationEvent) {
        // alert('Orientation Supported');
        window.addEventListener('deviceorientation', (eventData) => {
          console.log(eventData);
          
          this.orientationValues = {
            alpha: eventData.alpha,
            beta: eventData.beta,
            gamma: eventData.gamma
          }

          // Sending out my existense to server
          this.socketService.emit('sendOrientationData',this.orientationValues);

        })
      } else { alert('Not supported') }

      // Server sending back all the user existence
      this.socketService.listen('sendOrientationDataToAll').subscribe((data) => {
        this.broadcastingOrientationValues = data;
        // playJoiningSound();
      })

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
