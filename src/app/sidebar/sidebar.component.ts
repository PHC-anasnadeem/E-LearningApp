import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class SidebarComponent  implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

    // Call the logout method from AuthService
    logout() {
      this.authService.logout(); // Perform logout action
      this.router.navigate(['/login']); // Redirect to login page

      this.showToast('You have logged out successfully.');
    }

    private async showToast(message: string) {
      const toast = await this.toastController.create({
        message,
        duration: 3000,
        color: 'success',
        position: 'top',
      });
      await toast.present();
    }

}
