import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TokenListComponent } from './token-list/token-list.component';
import { IssueTokenComponent } from './issue-token/issue-token.component';


const routes: Routes = [
  {
    path: '', 
    component: SideNavComponent,
    children: [
      { path: '', component: IssueTokenComponent },
      { path: 'token-list', component: TokenListComponent },
      { path: 'issue-token', component: IssueTokenComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
