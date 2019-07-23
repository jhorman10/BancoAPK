import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userLogin = {
    nombre:'',
    identificacion:''
  }

  cliente:any;

  constructor(private auth: RegisterService,
              private router: Router) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.auth.getCliente()
      .subscribe((data): any => {
        this.cliente = data;
        console.log(this.cliente);
      });
  }

  login() {

    let userID = this.userLogin.identificacion;
    let clientID = this.cliente.identification;
    let userName = this.userLogin.nombre;
    let clientName = this.cliente.firstname;

    if ( userID == clientID && userName == clientName) {

      this.router.navigateByUrl('home');
      
    }else{

      return;
      
    }

  }

}
