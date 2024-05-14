import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autor } from '../../../models/autor';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autoresdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './autoresdetails.component.html',
  styleUrl: './autoresdetails.component.scss',
})
export class AutoresdetailsComponent {
  @Input('autor') autor: Autor = new Autor();
  @Output('retorno') retorno: EventEmitter<any> = new EventEmitter();

  router = inject(Router);

  constructor() {}

  save() {
    Swal.fire({
      title: 'Sucesso!',
      confirmButtonColor: '#54B4D3',
      text: 'Autor salvo com sucesso!',
      icon: 'success',
    });
    this.retorno.emit(this.autor);
    this.router.navigate(['admin/autores']);
  }
}
