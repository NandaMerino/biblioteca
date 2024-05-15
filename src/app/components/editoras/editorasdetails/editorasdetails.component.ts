import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editora } from '../../../models/editora';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { EditoraService } from '../../../services/editora.service';

@Component({
  selector: 'app-editorasdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule],
  templateUrl: './editorasdetails.component.html',
  styleUrl: './editorasdetails.component.scss'
})
export class EditoradetailsComponent {
  @Input('editora') editora: Editora = new Editora(0, '');
  @Output('retorno') retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  editoraService = inject(EditoraService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.editoraService.findById(id).subscribe({
      next: (editora) => {
        this.editora = editora;
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
    if (this.editora.id > 0) {
      this.editoraService.update(this.editora).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/editoras'], {
            state: { editoraNovo: this.editora },
          });
          this.retorno.emit(this.editora);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro ao editar o cadastro da editora',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.editoraService.save(this.editora).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Sucesso!',
            confirmButtonColor: '#54B4D3',
            text: 'Editora salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/editoras'], {
            state: { editoraNovo: this.editora },
          });
          this.retorno.emit(this.editora);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro ao salvar a editora',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }
}