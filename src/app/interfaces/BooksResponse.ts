export interface BooksResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: [{
        id: string;
        title: string;
        year: number;
        pages: number;
        language: string;
        publisher: string;
        author: string[]
    }]

}
