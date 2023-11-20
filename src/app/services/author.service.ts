import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthorService {
    private api = 'http://libraryapi.infometrika.net/api/author/';
    constructor(private _http: HttpClient) { }
    public getAuthorService(uid: string | null) {
        const headers = new HttpHeaders({
            'accept': 'application/json',
        });
        let url = `${this.api}`;
        if (uid !== null) {
            url += `${uid}`;
        }


        return this._http.get(url, { headers });
    }
    public postAuthorService(birth_date: string, date_of_death: string | null, name: string, country: string) {
        const body = JSON.stringify({
            birth_date: birth_date,
            date_of_death: date_of_death,
            name: name,
            country: country
        });

        const headers = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'ShZ9q2oDcdM46v3ve654mUJkI4RfYLLVfaxORbjZwBwgfPYm7TUFlZTo9zJZoD0j'
        });
        return this._http.post(this.api, body, { headers });
    }
    public putIdAuthorService(uid: string, birth_date: string, date_of_death: string | null, name: string, country: string) {
        const body = JSON.stringify({
            birth_date: birth_date,
            date_of_death: date_of_death,
            name: name,
            country: country
        });
        const headers = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'ShZ9q2oDcdM46v3ve654mUJkI4RfYLLVfaxORbjZwBwgfPYm7TUFlZTo9zJZoD0j'
        });
        return this._http.put(`${this.api}${uid}/`, body, { headers });
    }
    public patchIdAuthorService(uid: string, birth_date: string, date_of_death: string | null, name: string, country: string) {
        const body = JSON.stringify({
            birth_date: birth_date,
            date_of_death: date_of_death,
            name: name,
            country: country
        });
        const headers = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'ShZ9q2oDcdM46v3ve654mUJkI4RfYLLVfaxORbjZwBwgfPYm7TUFlZTo9zJZoD0j'
        });
        return this._http.patch(`${this.api}${uid}/`, body, { headers });
    }
    public deleteIdAuthorService(uid: string) {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'X-CSRFTOKEN': 'LB67o6lAG6f2mwpyhVv0u5gjP9IPNkiF8uEMPfgW0uZevQkpaIkBtaqngEAzdcx3'
        });
        return this._http.delete(`${this.api}${uid}/`, { headers });
    }
}
