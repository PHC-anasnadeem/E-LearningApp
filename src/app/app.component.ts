import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonToolbar, IonHeader, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
