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

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [FormsModule, RouterLink, LivrosdetailsComponent, MdbModalModule],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss',
})
export class LivroslistComponent {
  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Livro[] = [];
  livroEdit!: Livro;

  constructor() {
    this.findAll();
  }

  findAll() {
    let livro1 = new Livro();
    livro1.id = 1;
    livro1.titulo = 'Livro A';

    let livro2 = new Livro();
    livro2.id = 2;
    livro2.titulo = 'Livro B';

    let livro3 = new Livro();
    livro3.id = 3;
    livro3.titulo = 'Livro C';

    this.lista.push(livro1);
    this.lista.push(livro2);
    this.lista.push(livro3);
  }

  new() {
    this.livroEdit = new Livro();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(livro: Livro) {
    this.livroEdit = Object.assign({}, livro);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(livro: Livro) {
    if (this.livroEdit.id > 0) {
      //editar
      let indice = this.lista.findIndex((livroa) => {
        return livroa.id == this.livroEdit.id;
      });
      this.lista[indice] = livro;
    } else {
      //cadastrar um novo
      livro.id = this.lista.length + 1;
      this.lista.push(livro);
    }
    this.modalRef.close();
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
          let indice = this.lista.findIndex((livroa) => {
            return livroa.id == livro.id;
          });
          this.lista.splice(indice, 1);
          swalWithBootstrapButtons.fire({
            title: 'Cadastro deletado',
            text: 'O cadastro do livro foi deletado com sucesso!',
            icon: 'success',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cadastro não deletado',
            icon: 'error',
          });
        }
      });
  }
}
