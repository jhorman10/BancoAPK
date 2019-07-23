import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface ClientesModel {
    birthdate: string;
    firstname: string;
    identification: string;
    lastname: string;
    id:string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url ='https://testbankapi.firebaseio.com/clients.json';

  constructor(private http: HttpClient) { }


  getCliente(){

    return this.http.get(`${this.url}`)
      .pipe(
        map((res: ClientesModel[]) => res)
      );

  }

  postClientes(usuarioNuevo) {

    return this.http.post(`${this.url}`, usuarioNuevo)
                .subscribe(res =>{
                  console.log(res);
                });

  }

}
