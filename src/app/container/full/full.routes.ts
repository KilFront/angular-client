import { FullComponent } from './full.component';
import { GamesComponent } from '../../module/games/games.component';

export const fullRoutes = [
  {
    path: '',
    component: FullComponent,
    children: [{
      path: '/games',
      component: GamesComponent
    }]
  }
]
