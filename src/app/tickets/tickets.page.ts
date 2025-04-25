import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreServiceService } from '../services/firestore-service.service';


export interface Ticket{
  id: string;
  asunto: string;
  descripcion?: string;
  estado: string;
  fecha_creacion: string;
  asignado_a: string;
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
  standalone: false,
})
export class TicketsPage implements OnInit {

  tickets : Ticket[] = [];

  constructor(private firestoreService: FirestoreServiceService) { }

  ngOnInit() {

    this.firestoreService.getCollection("medicos").subscribe(data => {
      this.tickets = data;
    });
  }

}
