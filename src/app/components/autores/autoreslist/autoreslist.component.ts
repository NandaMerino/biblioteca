import {
  Component,
  TemplateRef,
  ViewChild,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Autor } from '../../../models/autor';
import Swal from 'sweetalert2';
import { AutoresdetailsComponent } from '../autoresdetails/autoresdetails.component';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-autoreslist',
  standalone: true,
  templateUrl: './autoreslist.component.html',
  styleUrl: './autoreslist.component.scss',
  imports: [FormsModule, RouterLink, MdbModalModule, AutoresdetailsComponent],
})
export class AutoreslistComponent {
  lista: Autor[] = [];
  autorEdit: Autor = new Autor(0, '');

  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  autorService = inject(AutorService);

  constructor() {
    this.listAll();

    let autorNovo = history.state.autorNovo;
    let autorEditado = history.state.autorEditado;

    if (autorNovo != null) {
      this.lista.push(autorNovo);
    }

    if (autorEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == autorEditado.id;
      });
      this.lista[indice] = autorEditado;
    }
  }

  listAll() {
    console.log('a');

    this.autorService.listAll().subscribe({
      next: (lista) => {
        console.log('b');
        this.lista = lista;
      },
      error: (erro) => {
        alert('Não foi possivel exibir a lista');
      },
    });
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
          this.autorService.delete(autor.id).subscribe({
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
    this.autorEdit = new Autor(0, '');
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(autor: Autor) {
    this.autorEdit = Object.assign({}, autor);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(autor: Autor) {
    this.listAll();
    this.modalRef.close();
  }
}
