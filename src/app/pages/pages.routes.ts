import { Routes } from '@angular/router';
import { HomeComponent } from './home.component/home.component';
import { PlacesComponent } from './places.component/places.component';
import { TrailsComponent } from './trails.component/trails.component';
import { PlaceDetailComponent } from './place-detail.component/place-detail.component';

export const pagesRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'places/:id', component: PlaceDetailComponent },
  { path: 'trails', component: TrailsComponent }
];
