import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

@Input() class: string;
  constructor() { }

  ngOnInit() {
  }

}






