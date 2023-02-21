import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient ) { }

getBackData1(){
  return this.http.get('https://reqres.in/api/users?page=1');
}

getBackData2(){
  return this.http.get('https://reqres.in/api/users?page=2');
}

sendData(data:any){
  return this.http.post('https://reqres.in/api/users',data);
}
delData(id:any){
  return this.http.delete("https://reqres.in/api/users/1"+id)
}
updateData(id:any,dt1:any){
  return this.http.put("https://reqres.in/api/users/2"+id,dt1)
}
  
}
