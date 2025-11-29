import { Component, OnInit } from '@angular/core';
import { TrailService } from '../../core/services/trail.service';
import { Trail } from '../../core/models/trail.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trails.component.html',
  styleUrls: ['./trails.component.scss']
})
export class TrailsComponent implements OnInit {

  trails: Trail[] = [];

  constructor(private trailService: TrailService) {}

  ngOnInit(): void {
    this.trailService.getTrails().subscribe(data => {
      this.trails = data;
    });
  }
}
