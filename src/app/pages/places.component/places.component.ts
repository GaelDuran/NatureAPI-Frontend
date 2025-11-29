import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../core/services/place.service';
import { Place } from '../../core/models/place.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: Place[] = [];
  loading = false;
  error: string | null = null;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.loading = true;
    this.placeService.getPlaces().subscribe({
      next: data => {
        this.places = data;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load places', err);
        this.error = err?.message || 'Failed to load places from API';
        this.loading = false;
      }
    });
  }
}
