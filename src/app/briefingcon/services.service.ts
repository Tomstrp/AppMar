import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import {formatDate} from '@angular/common';


import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ResultServiceInList } from './service.model';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private httpClient = inject(HttpClient);
  services(pageIndex:number, pageSize:number, id:number, date:Date, turn:string, nightly:boolean, username:string){
    var config = {
      params: {
        pageIndex: pageIndex, 
        pageSize: pageSize,
        id: id,
        data: date != null ?  formatDate(date,'yyyy-MM-dd','en-US') : '',
        turno: turn,
        notturno: nightly,
        username: username
      }
    }
    return this.httpClient.get<ResultServiceInList>(`${environment.authApiUrl}/Briefingcon/Servizi`, config)
      //.pipe(
      //  map((response)=> response.services), 
      //  catchError(() => {throw new Error("Errore sul pipe")})
      //)
  }
  
}

  