import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  content = "";

  contentOut = "";

  compile(){
    this.http.post<any>('http://127.0.0.1:5000/Compile',{input:this.content}
    ).subscribe((res)  => {
      if(res.msg != 'ERROR') this.contentOut = res.msg
      else this.contentOut = "ERROR"
    })
  }

}
