import { Component, OnInit } from '@angular/core';
import { RegisterService, ClientesModel } from 'src/app/services/register.service';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario = {
    nombre:'',
    apellido:'',
    fechaNacimiento:'',
    identificacion:''
  };

  clientes:ClientesModel[] =[];

  constructor(private registrar: RegisterService,
              private router: Router) { }

  ngOnInit() {
    this.getClientes();
  }

  // LISTADO DE CLIENTES
  getClientes() {
    this.registrar.getCliente()
      .subscribe((data): ClientesModel[] => {
        this.clientes = data;
        console.log(this.clientes);
        return this.clientes;
      });
  }

  // REGISTRAR CLIENTES NUEVOS
  registrarCliente(form: NgForm) {

    if (form.invalid) { return; }

    if (this.esDiferente()) {

      if (this.esMayor()) {

      this.registrar.postClientes(JSON.stringify(this.usuario));
        
        console.log('usuario registrado');
        this.router.navigateByUrl('/home');
      
      }else{
        console.log('No es mayor');
      }

    }else{
      console.log('No es diferente');
    }
        
  }

  // DETERMINAR SI ES MAYOR DE EDAD
  esMayor() {

    const hoy: Date = new Date();
    const birthDate: Date = new Date(this.usuario.fechaNacimiento);
    let edad: number = hoy.getFullYear() - birthDate.getFullYear();
    const mes: number = hoy.getMonth() - birthDate.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < birthDate.getDate())) {

      edad--;
      return true;

    }else{

      return false;

    }
    //return edad;
  }

  // VERIFICAR QUE NO EXISTA EL NÚMERO DE IDENTIDICAIÓN
  esDiferente() {

    let idUsuario = JSON.stringify(this.usuario.identificacion);
    let idCliente = JSON.stringify(this.clientes);


    if (idUsuario == idCliente ) {

      return false;

    }else{

      return true;

    }

  }

}
