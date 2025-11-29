import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Trail } from '../models/trail.model';
import { environment } from '../../../environments/environment';
import { PlaceService } from './place.service';
import { Place } from '../models/place.model';

@Injectable({
    providedIn: 'root'
})
    export class TrailService {
    private apiUrl: string;

    constructor(private http: HttpClient, private placeService: PlaceService) {
        // Normalize environment.API_URL so malformed values like ":5268/api" are corrected at runtime
        const raw = environment.API_URL || '';
        let base = raw;

        try {
            if (raw.startsWith(':')) {
                // e.g. ":5268/api" -> prepend current protocol and hostname
                base = `${window.location.protocol}//${window.location.hostname}${raw}`;
            } else if (raw.startsWith('/')) {
                // e.g. "/api" -> use current origin
                base = `${window.location.origin}${raw}`;
            } else if (!/^https?:\/\//i.test(raw)) {
                // e.g. "localhost:5268" -> prepend protocol
                base = `${window.location.protocol}//${raw}`;
            }
        } catch (e) {
            // In non-browser contexts fall back to raw value
            base = raw;
        }

        // Ensure no trailing slash before appending resource path
        base = base.replace(/\/$/, '');
        this.apiUrl = `${base}/trails`;
        console.debug('TrailService API URL:', this.apiUrl);
    }

    getTrails(): Observable<Trail[]> {
        return this.http.get<Trail[]>(this.apiUrl).pipe(
            catchError(err => {
                // If backend doesn't expose /trails, fallback to aggregating trails from /places
                if (err && err.status === 404) {
                    console.warn('/trails not found on API, falling back to aggregating trails from /places');
                    return this.placeService.getPlaces().pipe(
                        map((places: Place[]) => places.reduce((acc: Trail[], p) => acc.concat(p.trails || []), []))
                    );
                }
                return throwError(() => err);
            })
        );
    }
}
