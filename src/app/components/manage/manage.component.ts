import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { PublisherService } from '../../services/publisher.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  imageBook: string = "https://bibliotecanacional.gov.co/es-co/colecciones/biblioteca-digital/gaboteca/Imagenes/cien_aosdesolbsillo.jpg";
  imageAuthor: string = "https://www.parlamentoandino.org/images/centro-de-documentacion/6Gabriel-Garca-Mrquez.png";
  imagePublishers: string = "https://fecc.online/images/CONVENIOS/panamericana.jpg";
  _bookService = inject(BookService);
  _publisherService = inject(PublisherService);
  _authorService = inject(AuthorService);
  manageProfile: boolean = false;
  books: boolean = false;
  authors: boolean = false;
  publishers: boolean = false;
  back: boolean = false;
  list: boolean = false;
  booksData: any;
  publishersData: any;
  authorsData: any
  ngOnInit(): void {
    const local = localStorage.getItem("tokens");
    if (local) {
      console.log("hay datos");
      this.manageProfile = true;
    } else {
      console.log("nooo");
      this.manageProfile = false;
    }
  }
  booksView() {
    this.moreBooks();
    this.books = true;
    this.authors = false;
    this.publishers = false;
    this.list = true;
    this.back = true;

  }
  authorsView() {
    this.moreAuthors();
    this.authors = true;
    this.books = false;
    this.publishers = false;
    this.list = true;
    this.back = true;
  }
  publishersView() {
    this.morePublisher();
    this.publishers = true;
    this.authors = false;
    this.books = false;
    this.list = true;
    this.back = true;
  }
  backButton() {
    this.back = !this.back;
    this.list = false;

  }
  public moreBooks() {
    this._bookService.getBookService(null, null, null, null, null, null, null).subscribe((data: any) => {
      console.log("lista de libros", data);
      this.booksData = data && data.results ? data.results : [];
    });
  }
  public moreAuthors() {
    this._authorService.getAuthorService(null).subscribe((data: any) => {
      console.log("lista de autores", data);
      this.authorsData = data && data.results ? data.results : [];
    });
  }
  public morePublisher() {
    this._publisherService.getPublisherService(null, null, null).subscribe((data: any) => {
      console.log("lista de editoriales", data);
      this.publishersData = data && data.results ? data.results : [];
    });
  }
  public addBook() {
    console.log("añadir libro");

    const mensaje = `Ingrese los datos: Título, año, páginas, lenguaje, editorial, autor (SEPARADOS POR COMAS)> `;
    const respuesta = prompt(mensaje);
    if (respuesta) {
      const [titulo, anio, paginas, lenguaje, editorial, autor] = respuesta.split(',').map(dato => dato.trim());
      this._bookService.postBookService(titulo, +anio, +paginas, lenguaje, editorial, [autor]).subscribe((data: any) => {
      });
    }
  }
  public deleteBook(id: string) {
    this._bookService.deleteBookService(id).subscribe((data: any) => {
    });
  }
  public updateBook() {
    console.log("actualizar libro");
    const mensaje = `Ingrese los datos: Título, año, páginas, lenguaje, editorial, autor (SEPARADOS POR COMAS)> `;
    const respuesta = prompt(mensaje);
    if (respuesta) {
      const [titulo, anio, paginas, lenguaje, editorial, autor] = respuesta.split(',').map(dato => dato.trim());
      this._bookService.putBookService(null, titulo, +anio, +paginas, lenguaje, editorial, [autor]).subscribe((data: any) => {
      });
    }
  }

  public editBook(title: string | null, year: number | null, pages: number | null, language: string | null, publisher: string | null) {
    console.log("editar libro");
    const mensaje = `Ingrese los datos: Título, año (SEPARADOS POR COMAS)> `;
    const respuesta = prompt(mensaje);
    if (respuesta) {
      const [titulo, anio] = respuesta.split(',').map(dato => dato.trim());
      this._bookService.patchBookService(null, titulo, +anio, pages, language, publisher).subscribe((data: any) => {
      });
    }
  }


}
