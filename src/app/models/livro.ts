export class Livro {
    id!: number;
    titulo!: string;

    constructor(id: number, titulo: string){
        this.id = id;
        this.titulo = titulo;
    }
}
