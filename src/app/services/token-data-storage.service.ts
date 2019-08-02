import {Injectable} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'tokens';

@Injectable()
export class TokenDataStorageService {
    
    constructor(){}

    private tokenSubject = new BehaviorSubject(this.getDataFromLocalStorage());
    public currentTokenList = this.tokenSubject.asObservable();

    addTokenToLocalStorage(token) {
        let storedTokens = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        storedTokens.push(token);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedTokens));
        this.tokenSubject.next(this.getDataFromLocalStorage())
    }

    getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY))
    }

    removeTokenFromLocalStorage(token) {
        let storedTokens = JSON.parse(localStorage.getItem(STORAGE_KEY))
        let id = token.id
        let index = storedTokens.findIndex(function(token) {
            console.log('token', token)
            console.log('this', this)
            return token.id == this
        }, id)
        if(index == -1) {
            return
        }
        storedTokens.splice(index, 1)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedTokens));
        this.tokenSubject.next(this.getDataFromLocalStorage());
    }

}