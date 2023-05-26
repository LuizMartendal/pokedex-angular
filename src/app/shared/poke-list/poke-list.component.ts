import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  pokemons: any = null
  pokemonsBackup: any = null
  isLoading: boolean = true;

  min: number = 0
  max: number = 10
  total: number = 0

  constructor(private service: PokeApiService) {}

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.listAllPokemons(this.min, this.max).subscribe(
      res => {
        this.total = res.count
        this.pokemonsBackup = res.results
        this.pokemons = res.results
        this.isLoading = false
      }
    )
  }

  onPage(event: any) {
    this.pokemons = null
    this.total = 0
    this.min = event.pageIndex * event.pageSize
    this.max = this.min + event.pageSize
    this.list()
  }

  search(value: string) {
    const filter = this.pokemonsBackup.filter( (res:any) => {
      return !res.name.indexOf(value.toLowerCase())
    })

    this.pokemons = filter;
  }

}
