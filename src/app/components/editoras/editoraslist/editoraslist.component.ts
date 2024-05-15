import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Editora } from '../../../models/editora';
import Swal from 'sweetalert2';
import { EditoraService } from '../../../services/editora.service';

@Component({
    selector: 'app-editoraslist',
    standalone: true,
    templateUrl: './editoraslist.component.html',
    styleUrl: './editoraslist.component.scss',
    imports: [FormsModule, RouterLink, MdbModalModule, EditoraslistComponent]
})

export class EditoraslistComponent {
  lista: Editora[] = [];
  editoraEdit: Editora = new Editora(0, '');

  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  editoraService = inject(EditoraService);

  constructor() {
    this.listAll();

    let editoraNovo = history.state.editoraNovo;
    let editoraEditado = history.state.editoraEditado;

    if (editoraNovo != null) {
      this.lista.push(editoraNovo);
    }

    if (editoraEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == editoraEditado.id;
      });
      this.lista[indice] = editoraEditado;
    }
  }

  listAll() {
    console.log('a');

    this.editoraService.listAll().subscribe({
      next: (lista) => {
        console.log('b');
        this.lista = lista;
      },
      error: (erro) => {
        alert('Não foi possivel exibir a lista');
      },
    });
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
          this.editoraService.delete(editora.id).subscribe({
            next: (retorno) => {
              swalWithBootstrapButtons.fire({
                title: 'Cadastro deletado',
                text: 'O cadastro da editora foi deletado com sucesso!',
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
    this.editoraEdit = new Editora(0, '');
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(editora: Editora) {
    this.editoraEdit = Object.assign({}, editora);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(editora: Editora) {
    this.listAll();
    this.modalRef.close();
  }
}