import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../core/services/place.service';
import { Place } from '../../core/models/place.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlaceSummaryComponent } from '../place-summary.component/place-summary.component';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, RouterModule, PlaceSummaryComponent],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
// ...existing code...
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  loading = false;
  error = '';
  
  currentPlace: Place | null = null;
  currentSummary: string = '';
  summaryLoading: boolean = false;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.loading = true;
    this.placeService.getPlaces().subscribe({
      next: (data) => {
        this.places = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar lugares';
        this.loading = false;
      }
    });
  }

  generateSummary(place: Place): void {
  this.currentPlace = place;
  this.summaryLoading = true;
  this.currentSummary = '';

  // Usar GET en lugar de POST
  fetch(`http://localhost:5268/api/Places/${place.id}/summary`, {
    method: 'GET'  // ← Cambiar de POST a GET
  })
    .then(response => {
      if (!response.ok) throw new Error('Error: ' + response.status);
      return response.text();
    })
    .then(data => {
      this.currentSummary = data;
      this.summaryLoading = false;
    })
    .catch(err => {
      console.error(err);
      this.currentSummary = 'Error al generar resumen: ' + err.message;
      this.summaryLoading = false;
    });
}

  closeSummary(): void {
    this.currentSummary = '';
    this.currentPlace = null;
  }
}