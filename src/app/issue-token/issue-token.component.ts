import { Component, OnInit } from '@angular/core';
import { FetchCountrieservice } from '../services/fetch-countries.service';
import { TokenDataStorageService } from '../services/token-data-storage.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Token } from '../models/token.model';

@Component({
  selector: 'app-issue-token',
  templateUrl: './issue-token.component.html',
  styleUrls: ['./issue-token.component.css']
})
export class IssueTokenComponent implements OnInit {

  constructor(private fetchCountrieservice: FetchCountrieservice, private tokenDataStorageService: TokenDataStorageService, private router: Router) { }

  public token = new Token;

  public countriesList;
  public date;

  ngOnInit() {
    this.fetchCountrieservice.getCountries().subscribe(res => {
      this.countriesList = res
    })
  }

  createDate() {
    this.token.date =  moment().format('ll');
  }

  addId() {
    this.token.id = this.createUUID()
  }

   createUUID() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
 }

  onSubmit() {
      this.addId()
      this.createDate()
      this.tokenDataStorageService.addTokenToLocalStorage(this.token)
      this.router.navigate(['token-list']);
  }

}
