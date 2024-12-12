import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [IonicModule, SidebarComponent],
})
export class HomePage {
  constructor() {}

  onCardClick(cardTitle: string) {
    console.log(`Card clicked: ${cardTitle}`);
    // Navigate to another page or perform any action
  }
}
