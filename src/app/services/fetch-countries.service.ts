import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FetchCountrieservice {

    constructor(private _http: HttpClient){}

    private _url = 'https://restcountries.eu/rest/v2/all'

    getCountries(): Observable<any> {
        return this._http.get<any>(this._url);
    }

}