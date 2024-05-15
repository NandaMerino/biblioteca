import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autor } from '../../../models/autor';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AutorService } from '../../../services/autor.service';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-autoresdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule],
  templateUrl: './autoresdetails.component.html',
  styleUrl: './autoresdetails.component.scss',
})
export class AutoresdetailsComponent {
  @Input('autor') autor: Autor = new Autor(0, '');
  @Output('retorno') retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  autorService = inject(AutorService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.autorService.findById(id).subscribe({
      next: (autor) => {
        this.autor = autor;
      },
      error: (erro) => {
        alert(erro.status);
        console.log(erro);
        Swal.fire({
          title: 'Algo deu errado na busca, tente novamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  save() {
    if (this.autor.id > 0) {
      this.autorService.update(this.autor).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/autores'], {
            state: { autorNovo: this.autor },
          });
          this.retorno.emit(this.autor);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro ao editar o cadastro do autor',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.autorService.save(this.autor).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Sucesso!',
            confirmButtonColor: '#54B4D3',
            text: 'Autor salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/autores'], {
            state: { autorNovo: this.autor },
          });
          this.retorno.emit(this.autor);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro ao salvar o autor',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }
}
