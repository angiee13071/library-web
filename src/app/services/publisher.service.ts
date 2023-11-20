import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PublisherService {
    private api = 'http://libraryapi.infometrika.net/api/publisher/';
    constructor(private _http: HttpClient) { }
    public getPublisherService(uid: string | null, limit: number | null, offset: number | null) {
        const headers = new HttpHeaders({
            'accept': 'application/json',
        });
        let url = `${this.api}`;
        if (uid !== null) {
            url += `${uid}`;
        }

        if (limit !== null) {
            url += `author=${limit}&`;
        }

        if (offset !== null) {
            url += `author_country=${offset}&`;
        }

        if (limit !== null) {
            url += `limit=${limit}&`;
        }

        if (offset !== null) {
            url += `offset=${offset}&`;
        }

        if (url.endsWith('&')) {
            url = url.slice(0, -1);
        }
        console.log("url", url);
        return this._http.get(url, { headers });
    }
    public postPublisherService(name: string, country: string) {
        const body = JSON.stringify({
            name: name,
            country: country
        });

        const headers = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'LB67o6lAG6f2mwpyhVv0u5gjP9IPNkiF8uEMPfgW0uZevQkpaIkBtaqngEAzdcx3'
        });
        return this._http.post(this.api, body, { headers });
    }
    public putPublisherService(uid: String, name: string, country: string) {
        const body = JSON.stringify({
            name: name,
            country: country
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
    public patchPublisherService(uid: String, name: string, country: string) {
        const body = JSON.stringify({
            name: name,
            country: country
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
    public deletePublisherService(uid: string) {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'X-CSRFTOKEN': 'LB67o6lAG6f2mwpyhVv0u5gjP9IPNkiF8uEMPfgW0uZevQkpaIkBtaqngEAzdcx3'
        });
        return this._http.delete(`${this.api}${uid}/`, { headers });
    }
}
