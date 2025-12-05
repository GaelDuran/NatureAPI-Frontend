import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Place } from '../../core/models/place.model';

@Component({
  selector: 'app-place-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 10px 0;">
      <h3>{{ place.name }}</h3>
      <p><strong>Categoría:</strong> {{ place.category }}</p>
      
      <button (click)="generateSummary()" style="padding: 10px 20px; font-size: 14px; cursor: pointer; background-color: #1890ff; color: white; border: none; border-radius: 4px;">
        Generar Resumen con IA
      </button>

      <div *ngIf="loading" style="margin-top: 15px; color: #666;">
        Generando resumen...
      </div>

      <div *ngIf="summary" style="margin-top: 15px; padding: 15px; background-color: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">
        <strong>Resumen IA:</strong>
        <p>{{ summary }}</p>
      </div>

      <div *ngIf="error" style="margin-top: 15px; color: red;">
        {{ error }}
      </div>
    </div>
  `
})
export class PlaceSummaryComponent {
  @Input() place!: Place;
  
  summary: string = '';
  loading: boolean = false;
  error: string = '';

  generateSummary(): void {
    if (!this.place.name) {
      this.error = 'Lugar no válido';
      return;
    }

    this.loading = true;
    this.error = '';
    this.summary = '';

    // Llamar tu API que usa GPT para generar resumen
    fetch(`http://localhost:5268/api/Places/${this.place.id}/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        placeName: this.place.name,
        category: this.place.category
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error: ' + response.status);
        }
        return response.text();
      })
      .then(data => {
        this.summary = data;
        this.loading = false;
      })
      .catch(err => {
        console.error(err);
        this.error = 'Error al generar resumen: ' + err.message;
        this.loading = false;
      });
  }
}