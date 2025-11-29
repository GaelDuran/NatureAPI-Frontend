import { Component, AfterViewInit } from '@angular/core';
import { PlaceService } from '../../core/services/place.service';
import { Place } from '../../core/models/place.model';
import mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  places: Place[] = [];
  map!: mapboxgl.Map;

  constructor(private placeService: PlaceService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadPlaces();
    setTimeout(() => this.map?.resize(), 200);
  }

  initMap(): void {
    mapboxgl.accessToken = environment.MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-102.5528, 23.6345],
      zoom: 5,
      
    });

    this.map.on('load', () => {
      // Si las places ya están cargadas, añadir marcadores ahora
      if (this.places.length) {
        this.addMarkers();
      }
    });
  }

  loadPlaces(): void {
    this.placeService.getPlaces().subscribe(data => {
      this.places = data;
      if (this.map && this.map.isStyleLoaded && this.map.isStyleLoaded()) {
        this.addMarkers();
      }
    });
  }

  addMarkers(): void {
     if (!this.map) return;
    this.places.forEach(place => {
      new mapboxgl.Marker()
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<b>${place.name}</b><br>${place.category}`))
        .addTo(this.map);
    });
  }
}
