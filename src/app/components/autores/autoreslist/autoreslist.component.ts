import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Autor } from '../../../models/autor';
import Swal from 'sweetalert2';
import { AutoresdetailsComponent } from "../autoresdetails/autoresdetails.component";

@Component({
    selector: 'app-autoreslist',
    standalone: true,
    templateUrl: './autoreslist.component.html',
    styleUrl: './autoreslist.component.scss',
    imports: [FormsModule, RouterLink, MdbModalModule, AutoresdetailsComponent]
})
export class AutoreslistComponent {
  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Autor[] = [];
  autorEdit!: Autor;

  constructor() {

    this.findAll();
  }
  findAll() {
    let autor1 = new Autor();
    autor1.id = 1;
    autor1.nome = 'Autor A';

    let autor2 = new Autor();
    autor2.id = 2;
    autor2.nome = 'Autor B';

    let autor3 = new Autor();
    autor3.id = 3;
    autor3.nome = 'Autor C';

    this.lista.push(autor1);
    this.lista.push(autor2);
    this.lista.push(autor3);
  }

  new() {
    this.autorEdit = new Autor();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(autor: Autor) {
    this.autorEdit = Object.assign({}, autor);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(autor: Autor) {
    if (this.autorEdit.id > 0) {
      //editar
      let indice = this.lista.findIndex((autorx) => {
        return autorx.id == this.autorEdit.id;
      });
      this.lista[indice] = autor;
    } else {
      //cadastrar um novo
      autor.id = this.lista.length + 1;
      this.lista.push(autor);
    }
    this.modalRef.close();
  }

  deleteById(autor: Autor) {
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
          let indice = this.lista.findIndex((autorx) => {
            return autorx.id == autor.id;
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
