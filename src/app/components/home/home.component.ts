import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { BooksResponse } from '../../interfaces/BooksResponse';
import { PublisherService } from '../../services/publisher.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'home-component',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  imageBook: string = "https://bibliotecanacional.gov.co/es-co/colecciones/biblioteca-digital/gaboteca/Imagenes/cien_aosdesolbsillo.jpg";
  _bookService = inject(BookService);
  _publisherService = inject(PublisherService);
  _authorService = inject(AuthorService);

  books: any[] | undefined;
  publisher: any | undefined;
  author: any | undefined;
  currentPage = 1;
  itemsPerPage = 100;
  results: BooksResponse | undefined;
  publisherView: boolean = false;
  authorView: boolean = false;
  // constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks(): void {
    const params = {
      limit: this.itemsPerPage,
      offset: (this.currentPage - 1) * this.itemsPerPage
    };

    this._bookService.getBookService(null, null, null, null, null, null, null).subscribe((data: any) => {
      // console.log("data book", data);
      // console.log("uid publisher", data.publisher);
      // console.log("uid author", data.author);
      this.books = data && data.results ? data.results : [];
    });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBooks();
  }
  morePublisher(id: string) {
    this.publisherView = !this.publisherView;
    if (this.publisherView == true)
      this._publisherService.getPublisherService(id, null, null).subscribe((data: any) => {
        console.log("publisher", data);
        this.publisher = data && data ? data : ["Sin editorial"];
      });
  }
  moreAuthor(id: string) {
    this.authorView = !this.authorView;
    if (this.authorView == true)
      this._authorService.getAuthorService(id).subscribe((data: any) => {
        console.log("autor ", data);
        this.author = data && data ? data : ["Sin autor"];
      });
  }
  // moreAuthor(id: string) {
  //   console.log("idauthor", id);
  //   this.authorView = !this.authorView;
  //   if (this.authorView == true)
  //     this._authorService.getAuthorService(id).subscribe((data: any) => {
  //       console.log("autor publisher", data);
  //       this.author = data && data.results ? data.results : [];
  //     });
  // }

}

