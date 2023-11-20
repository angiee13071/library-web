import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {
    private api = 'http://libraryapi.infometrika.net/api/country/';
    constructor(private _http: HttpClient) { }
    public getCountryService() {
        const headers = new HttpHeaders({
            'accept': '*/*',
        });

        return this._http.get(this.api, { headers });
    }
}
