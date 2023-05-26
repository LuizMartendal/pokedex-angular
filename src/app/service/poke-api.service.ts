import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon'

  constructor(private http: HttpClient) { }

  listAllPokemons(min: number, max: number): Observable<any> {
    return this.http.get<any>(`${this.url}/?offset=${min}&limit=${max}`).pipe(
      tap(res => res),
      tap(res =>
        res.results.map( (resPokemons: any) => {

          this.apiGetPokemons( resPokemons.url ).subscribe(
            res => resPokemons.status = res
          )

        })
      )
    );
  }

  apiGetPokemons( url: string ): Observable<any> {
    return this.http.get<any>( url ).pipe(
      map(
        res => res
      )
    )
  }
}
