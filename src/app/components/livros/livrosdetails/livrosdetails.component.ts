import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../../models/livro';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss',
})
export class LivrosdetailsComponent {
  @Input('livro') livro: Livro = new Livro();
  @Output('retorno') retorno: EventEmitter<any> = new EventEmitter();

  router = inject(Router);

  constructor() {}

  save() {
    Swal.fire({
      title: 'Sucesso!',
      confirmButtonColor: '#54B4D3',
      text: 'Livro salvo com sucesso!',
      icon: 'success',
    });
    this.retorno.emit(this.livro);
    this.router.navigate(['admin/livros']);
  }
}
