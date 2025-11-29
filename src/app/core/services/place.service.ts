import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../models/place.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    
    private apiUrl = `${environment.API_URL}/places`;
    
    constructor(private http: HttpClient) {
        console.debug('PlaceService API URL:', this.apiUrl);
    }
    getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
}

    getPlaceById(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/${id}`);
    }
}
