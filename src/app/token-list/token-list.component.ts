import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TokenDataStorageService } from '../services/token-data-storage.service';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {

  displayedColumns: string[] = ['tokenName', 'tokenTicker', 'totalSupply', 'creation_date', 'issuerName', 'country', 'template', 'actionRemove'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private tokenDataStorageService: TokenDataStorageService) { }

  public tokenData: any [];

  ngOnInit() {
    this.tokenDataStorageService.currentTokenList.subscribe(res => {
      this.tokenData = res
      this.dataSource = new MatTableDataSource<any>(this.tokenData);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeToken(token) {
    console.log('token to remove :', token)
    this.tokenDataStorageService.removeTokenFromLocalStorage(token)
  }

}
