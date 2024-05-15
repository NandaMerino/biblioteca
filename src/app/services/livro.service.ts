import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  http = inject(HttpClient);

  API = "http://localhost:8080/api/editora";

  constructor() { }

  listAll(): Observable<Livro[]>{
    return this.http.get<Livro[]>(this.API+"/listAll");
  }

  save(livro: Livro): Observable<string> {
    return this.http.post<string>(this.API+"/save", livro, {responseType: 'text' as 'json'} );
  }

  update(livro: Livro): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+livro.id, livro, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Livro> {
    return this.http.get<Livro>(this.API+"/findById/"+id );
  }
}
