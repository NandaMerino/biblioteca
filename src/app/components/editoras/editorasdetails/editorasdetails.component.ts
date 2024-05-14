import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editora } from '../../../models/editora';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorasdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editorasdetails.component.html',
  styleUrl: './editorasdetails.component.scss'
})
export class EditorasdetailsComponent {
  @Input('editora') editora: Editora = new Editora();
  @Output('retorno') retorno: EventEmitter<any> = new EventEmitter();

  router = inject(Router);

  constructor() {}
  save() {
    Swal.fire({
      title: 'Sucesso!',
      confirmButtonColor: '#54B4D3',
      text: 'Editora salva com sucesso!',
      icon: 'success',
    });
    this.retorno.emit(this.editora);
    this.router.navigate(['admin/editoras']);
  }

}
