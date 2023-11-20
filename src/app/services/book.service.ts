import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BookService {
    private api = 'http://libraryapi.infometrika.net/api/book/';
    constructor(private _http: HttpClient) { }
    public getBookService(uid: string | null, author: string | null, author_country: string | "CO" | "CE" | "VE" | null, limit: number | null, offset: number | null, publisher: string | null, title: string | null) {
        const headers = new HttpHeaders({
            'accept': 'application/json',
        });
        let url = `${this.api}?`;
        if (uid !== null) {
            url += `${uid}&`;
        }

        if (author !== null) {
            url += `author=${author}&`;
        }

        if (author_country !== null) {
            url += `author_country=${author_country}&`;
        }

        if (limit !== null) {
            url += `limit=${limit}&`;
        }

        if (offset !== null) {
            url += `offset=${offset}&`;
        }

        if (publisher !== null) {
            url += `publisher=${publisher}&`;
        }

        if (title !== null) {
            url += `title=${title}&`;
        }

        if (url.endsWith('&')) {
            url = url.slice(0, -1);
        }
        return this._http.get(url, { headers });
    }
    public postBookService(title: string, year: number, pages: number, language: string, publisher: string, author: string[]) {
        const body = JSON.stringify({
            title: title,
            year: year,
            pages: pages,
            language: language,
            publisher: publisher,
            author: author
        });

        const headers = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'LB67o6lAG6f2mwpyhVv0u5gjP9IPNkiF8uEMPfgW0uZevQkpaIkBtaqngEAzdcx3'
        });
        return this._http.post(this.api, body, { headers });
    }
    public putBookService(uid: string | null, title: string, year: number, pages: number, language: string, publisher: string, author: string[]) {
        const body = JSON.stringify({
            title: title,
            year: year,
            pages: pages,
            language: language,
            publisher: publisher,
            author: author
        });
        let url = `${this.api}?`;
        if (uid !== null) {
            url += `author=${uid}&`;
        }
        const headers = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'LB67o6lAG6f2mwpyhVv0u5gjP9IPNkiF8uEMPfgW0uZevQkpaIkBtaqngEAzdcx3'
        });
        return this._http.put(url, body, { headers });
    }
    public patchBookService(uid: string | null, title: string | null, year: number | null, pages: number | null, language: string | null, publisher: string | null) {
        const body = JSON.stringify({
            title: title,
            year: year,
            pages: pages,
            language: language,
            publisher: publisher,
            // author: author
        });
        let url = `${this.api}?`;
        if (uid !== null) {
            url += `author=${uid}&`;
        }
        const headers = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'LB67o6lAG6f2mwpyhVv0u5gjP9IPNkiF8uEMPfgW0uZevQkpaIkBtaqngEAzdcx3'
        });
        return this._http.patch(url, body, { headers });
    }
    public deleteBookService(uid: string) {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'X-CSRFTOKEN': 'LB67o6lAG6f2mwpyhVv0u5gjP9IPNkiF8uEMPfgW0uZevQkpaIkBtaqngEAzdcx3'
        });
        return this._http.delete(`${this.api}${uid}/`, { headers });
    }
}
