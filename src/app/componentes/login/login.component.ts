import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Ya no lo utilizamos
//import { GestorUsuario } from 'src/app/negocio/gestorUsuario'; //Importamos la clase a utilizar
import { Usuario } from 'src/app/entidades/usuario'; 
import { LoginValidationService } from 'src/servicios/loginValidation.service'; //Importamos el servicio a utilizar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string ="";
  public static nombre = "";
  passw: string ="";
  //gu: GestorUsuario =  new GestorUsuario();
  
  //Mediante la inyección de dependencias, cuando angular cree este componente, 
  //le pasará algún objeto de tipo LoginValidationService que hayamos declarado en nuestra aplicación.
  //Como efectivamente hemos declarado la clase LoginValidationService anotada con @Inyectable, 
  //le pasará dicho objeto para que podamos usarlo.
  constructor(private router:Router,private lvs:LoginValidationService ) { 
    this.lvs = lvs;
  }
  /**
   * Método que consume el servicio LoginValidationService para validar un usuario.
   */
  public validacionUsuario(){
    
    let usuario  = new Usuario(this.user,this.passw);
    this.lvs.loginUsuarioValidacion(usuario).subscribe({
      next : (respuesta)   => {      
      //'respuesta' es un objeto Json que contiene el body
        console.log(respuesta);
        console.log(respuesta.validado); 
        console.log(typeof(respuesta.validado));
        var stringValue = respuesta.validado; // lo devuelve como String no como Boolean 
        console.log(stringValue);
        var boolValue = (stringValue =="true");   //returns true
        console.log(boolValue);
        if (boolValue){
          this.router.navigate(['/videojuegos',this.user]);
        } else {
          this.router.navigate(['/loginErroneo',3]); 
        }
  
      },
      error: (e: any) => {
        console.log(`Error ${e}`)
        alert(e)
      }
    });         
}

  //Este metodo ya no nos sirve
  /*public routingProgramatico(){
    
    let usuario: Usuario = new Usuario(this.user, this.passw);
    let opcion : number = this.gu.validarUsuario(usuario);
    LoginComponent.nombre = this.user;
    console.log(LoginComponent.nombre);
    console.log(opcion);
    
    switch(opcion){
      case(0): //usuario validado
      this.router.navigate(['/videojuegos',this.user]);
      break;
      case(1): //usuario no existe
      this.router.navigate(['/loginErroneo',opcion]); 
      break;
      case(2): //usuario existe y el password es incorrecto.
      this.router.navigate(['/loginErroneo',opcion]);
      break;
    }
    
  }*/
  ngOnInit() {
  }

}
