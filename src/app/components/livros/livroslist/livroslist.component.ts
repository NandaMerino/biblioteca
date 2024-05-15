import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livro } from '../../../models/livro';
import { FormsModule } from '@angular/forms';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [FormsModule, RouterLink, LivrosdetailsComponent, MdbModalModule],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss',
})
export class LivroslistComponent {
  lista: Livro[] = [];
  livroEdit: Livro = new Livro(0, '');

  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  livroService = inject(LivroService);

  constructor() {
    this.listAll();

    let livroNovo = history.state.livroNovo;
    let livroEditado = history.state.livroEditado;

    if (livroNovo != null) {
      this.lista.push(livroNovo);
    }

    if (livroEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == livroEditado.id;
      });
      this.lista[indice] = livroEditado;
    }
  }

  listAll() {
    console.log('a');

    this.livroService.listAll().subscribe({
      next: (lista) => {
        console.log('b');
        this.lista = lista;
      },
      error: (erro) => {
        alert('Não foi possivel exibir a lista');
      },
    });
  }

  deleteById(livro: Livro) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Deseja realmente deletar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.livroService.delete(livro.id).subscribe({
            next: (retorno) => {
              swalWithBootstrapButtons.fire({
                title: 'Cadastro deletado',
                text: 'O cadastro do livro foi deletado com sucesso!',
                icon: 'success',
              });
              this.listAll();
            },
            error: (erro) => {
              alert(erro.status);
              console.log(erro);
              swalWithBootstrapButtons.fire({
                title: 'Cadastro não deletado. Erro: ',
                icon: 'error',
              });
            },
          });
        }
      });
  }

  new() {
    this.livroEdit = new Livro(0, '');
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(livro: Livro) {
    this.livroEdit = Object.assign({}, livro);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(livro: Livro) {
    this.listAll();
    this.modalRef.close();
  }
}
