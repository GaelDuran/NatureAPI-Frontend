import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../core/services/place.service';
import { Place } from '../../core/models/place.model';
import { Photo } from '../../core/models/photo.model';
import mapboxgl from 'mapbox-gl'; 
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
})
export class PlaceDetailComponent implements OnInit {

  place!: Place;
  map!: mapboxgl.Map;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.placeService.getPlaceById(id).subscribe(data => {
      this.place = data;
      this.loadMiniMap();
    });
  }

  photoSrc(photo: Photo): string {
    const raw = photo?.url || '';
    // If it's already absolute (http/https) return as-is
    if (/^https?:\/\//i.test(raw)) return raw;

    // If it starts with a leading slash, use the API origin (strip possible '/api' suffix)
    let apiBase = (environment.API_URL || '').replace(/\/api\/?$/, '');
    if (!apiBase) {
      // fallback to current origin
      apiBase = window.location.origin;
    }

    // Ensure single slash between base and path
    return apiBase.replace(/\/$/, '') + '/' + raw.replace(/^\//, '');
  }

  loadMiniMap(): void {
    // pass Mapbox access token via Map constructor options
    this.map = new mapboxgl.Map({
      container: 'mini-map',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [this.place.longitude, this.place.latitude],
      zoom: 11,
      accessToken: environment.MAPBOX_TOKEN as any
    });

    new mapboxgl.Marker()
      .setLngLat([this.place.longitude, this.place.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<b>${this.place.name}</b>`))
      .addTo(this.map);
  }
}
