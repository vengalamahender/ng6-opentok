import { Component, OnInit } from '@angular/core';
import { VideoCallStateManagerService } from "./../video-call-state-manager.service";
import { VideoCallManagerService } from "./../video-call-manager.service";
import { VideoCallWidgetComponent } from "../shared/video-call-widget/video-call-widget.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'video-recepient',
  templateUrl: './video-recepient.component.html',
  styleUrls: ['./video-recepient.component.css'],
  viewProviders: [VideoCallWidgetComponent]
})
export class VideoRecepientComponent implements OnInit {

    sessionId = "1_MX40NjI3MjAzMn5-MTU1MDg0NDcwMjgyMX5XYzFscStvVnpuZysvaTdIbENMY3FDU0Z-UH4";
  //valid until 1 January
   token = "T1==cGFydG5lcl9pZD00NjI3MjAzMiZzaWc9NzI3MDhjN2YxNTJmOTNhMTQ3N2FjNjUwN2ZmNTY2NDM2MzkwNjZiMjpzZXNzaW9uX2lkPTFfTVg0ME5qSTNNakF6TW41LU1UVTFNRGcwTkRjd01qZ3lNWDVYWXpGc2NTdHZWbnB1WnlzdmFUZEliRU5NWTNGRFUwWi1VSDQmY3JlYXRlX3RpbWU9MTU1MDg0NDc2NyZub25jZT0wLjczNTcxODc3Njc3MzM0NTEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU1MDkzMTE2MiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="
  constructor(private http:HttpClient) { }

  ngOnInit() {
/*      this.http.get('https://webivis.herokuapp.com/room/session')
                .subscribe((data)=>{
                  console.log(data);
                  sessionId = data['sessionId']
                  token = data['token']
                })*/
  }

}

