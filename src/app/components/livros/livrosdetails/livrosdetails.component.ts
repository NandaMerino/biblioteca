import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../../models/livro';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss',
})

export class LivrosdetailsComponent {
  @Input('livro') livro: Livro = new Livro(0, '');
  @Output('retorno') retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  livroService = inject(LivroService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.livroService.findById(id).subscribe({
      next: (livro) => {
        this.livro = livro;
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
    if (this.livro.id > 0) {
      this.livroService.update(this.livro).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/livros'], {
            state: { livroNovo: this.livro },
          });
          this.retorno.emit(this.livro);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro ao editar o cadastro do livro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.livroService.save(this.livro).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Sucesso!',
            confirmButtonColor: '#54B4D3',
            text: 'Livro salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/livros'], {
            state: { livroNovo: this.livro },
          });
          this.retorno.emit(this.livro);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro ao salvar o livro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }
}

