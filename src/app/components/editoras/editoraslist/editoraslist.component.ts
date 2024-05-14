import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Editora } from '../../../models/editora';
import Swal from 'sweetalert2';
import { EditorasdetailsComponent } from "../editorasdetails/editorasdetails.component";

@Component({
    selector: 'app-editoraslist',
    standalone: true,
    templateUrl: './editoraslist.component.html',
    styleUrl: './editoraslist.component.scss',
    imports: [FormsModule, RouterLink, MdbModalModule, EditorasdetailsComponent]
})
export class EditoraslistComponent {
  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>; 

  lista: Editora[] = [];
  editoraEdit!: Editora;

  constructor() {

    this.findAll();
  }
  findAll() {
    let editora1 = new Editora();
    editora1.id = 1;
    editora1.nome = 'Editora A';

    let editora2 = new Editora();
    editora2.id = 2;
    editora2.nome = 'Editora B';

    let editora3 = new Editora();
    editora3.id = 3;
    editora3.nome = 'Editora C';

    this.lista.push(editora1);
    this.lista.push(editora2);
    this.lista.push(editora3);
  }

  new() {
    this.editoraEdit = new Editora();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(editora: Editora) {
    this.editoraEdit = Object.assign({}, editora);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(editora: Editora) {
    if (this.editoraEdit.id > 0) {
      //editar
      let indice = this.lista.findIndex((editorax) => {
        return editorax.id == this.editoraEdit.id;
      });
      this.lista[indice] = editora;
    } else {
      //cadastrar um novo
      editora.id = this.lista.length + 1;
      this.lista.push(editora);
    }
    this.modalRef.close();
  }

  deleteById(editora: Editora) {
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
          let indice = this.lista.findIndex((editorax) => {
            return editorax.id == editora.id;
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



