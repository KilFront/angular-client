// import {NgModule} from '@angular/core';
// import {RouterModule, Routes} from '@angular/router';
// import { GamesComponent } from "../module/games/games.component";
// import {AppComponent} from "../app.component";
//
// const routes: Routes = [
//   {
//     path: 'games',
//     component: GamesComponent
//   }
// ];
//
// @NgModule({
//   declarations: [
//     GamesComponent
//   ],
//   imports: [RouterModule.forRoot(routes, {useHash: true})],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {
// }

import {GamesComponent} from "../module/games/games.component";
export const appRoutes = [
  {
    path: 'games',
    component: GamesComponent
  }
]
