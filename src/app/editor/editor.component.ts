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

  errores:any = [];

  simbolos:any = [];

  optimizaciones:any = [];

  /**==================================================================== */
  compile(){
    this.http.post<any>('https://jolc-p2-bakcend.herokuapp.com//Compile',{input:this.content}
    ).subscribe((res)  => {
      if(res.msg != 'ERROR'){
        if (res.error.length != 0){
          alert("Existen Errores :(");
          this.errores = res.error;
        } else {
          this.contentOut = res.msg;
          this.simbolos = res.simbols;
        }
      } 
      else this.contentOut = "ERROR"
    })
  }
/**================================ */

/**= */
OptimizeMirilla(){
  this.http.post<any>('https://jolc-p2-bakcend.herokuapp.com//optimize',{input:this.contentOut,type:'mirilla'}
  ).subscribe((res)  => {
    if(res.code == 500) this.contentOut = res.msg ;
    else{
      this.contentOut = res.msg;
      this.optimizaciones = res.report;
    } 
  });
}

OptimizeBlock(){
  this.http.post<any>('https://jolc-p2-bakcend.herokuapp.com//optimize',{input:this.contentOut,type:'block'}
  ).subscribe((res)  => {
    if(res.code == 500) this.contentOut = res.msg ;
    else{
      this.contentOut = res.msg;
      this.optimizaciones = res.report;
    } 
  });
}

limpiar(){
  this.content = "";

  this.contentOut = "";

  this.errores = [];

  this.simbolos = [];

  this.optimizaciones = [];
}



}
