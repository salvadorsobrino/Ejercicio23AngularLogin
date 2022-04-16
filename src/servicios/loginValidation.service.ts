import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../app/entidades/usuario';

//Los servicios en Angular se inyectan, jamás los crearemos con 'new'
//Aqúi estamos diciendo a Angular que cree un objeto de tipo personaService
//y que podrá ser inyectado en otros objetos (en nuestro caso, en componentes)
@Injectable({
  providedIn: 'root',
})
export class LoginValidationService {
  //Hacemos que el atributo sea solo de lectura
  readonly endPoint = 'http://localhost:8080/21_WebLogin/LoginServlet';

  /**
   * Este constructor recibirá inyectado un objeto de tipo _HttpClient, que será
   * en encargado de hacer las peticiones HTTP a nuestro servicio REST
   * @param _httpClient
   */
  constructor(private _httpClient: HttpClient) {}
  /**
   * Método que accede al recurso del servicio rest mediante peticion GET
   * @returns
   */
  public loginUsuarioValidacion(u: Usuario): Observable<any> {
    //Para hacer peticiones HTTP debemos de usar un objeto de tipo HttpClient y crear
    //un objeto de tipo Observable.
    //Para hacer la petición primero debemos de elegir el método HTTP que queremos usar
    //en este caso, get. A este método debemos de pasarle como parámetro el recurso
    //con el que queremos trabajar (http://localhost:8080/21_WebLogin/LoginServlet)
    return this._httpClient
      .get<any>(
        `${this.endPoint}?nombreUsuario=${u.usuario}&clave=${u.contrasenia}`
      )
      .pipe(catchError(this.manejarError));
    //El método "pipe" en los Observable de Angular es usado para encadenar multiples
    //operadores juntos. En este caso solo lo usamos para capturar errores. En caso de que
    //ocurran alguno, se lo pasaremos a la funcion manejarError
  }

  /**
   * Método que accede al recurso del servicio rest mediante peticion POST.
   * El usuario viajará en el body en formato Json.
   * @returns
   */
  public loginUsuarioValidacionPost(u: Usuario): Observable<any> {
    let headers = new HttpHeaders();
    //En este caso debemos de decir que el contenido que estamos mandando es de tipo
    //Json, ya que el servidor Rest solo trabaja con Json
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    
    let jsonUser = { nombreUsuario: u.usuario , clave: u.contrasenia};
    //Mandamos 3 parametros:
    //1- URL
    //2- CONTENIDO DEL BODY
    //3- HEADERS
    return this._httpClient.post<any>(this.endPoint, //URL
        jsonUser, //CONTENIDO DEL BODY (JSON)
        { headers: headers } //CABECERAS HTTP
      )
      .pipe(catchError(this.manejarError));
  }

  /**
   * Metodo que maneja los posibles errores de las llamadas al servicio rest
   * @param error
   * @returns
   */
  private manejarError(e: HttpErrorResponse) {
    let mensajeError = '';
    if (e.error instanceof ErrorEvent) {
      mensajeError = 'A ocurrido un error:' + e.error;
    } else {
      mensajeError =
        `El servicio Rest retorno: Status: ${e.status}, ` + `Body: ${e.error}`;
    }
    console.error(mensajeError);
    return throwError(() => new Error(mensajeError));
  }
}
