import { Trail } from './trail.model';
import { Photo } from './photo.model';
import { Review } from './review.model';
import { Amenity } from './amenity.model';

export interface Place {
  id: number;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  elevationMeters: number;
  accessible: boolean;
  entryFee: number;
  openingHours: string;
  createdAt: string;
  trails: Trail[];
  photos: Photo[];
  reviews: Review[];
  amenities: Amenity[];
}
