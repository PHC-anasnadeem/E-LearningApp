import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  
import { IonicModule } from '@ionic/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../auth/auth.service';
import { LoginResponse } from '../interfaces/login-response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('transitionMessages', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden <=> visible', [
        animate('0.3s ease-in-out')
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    IonicModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    FormsModule, 
    MatSelectModule,
    HttpClientModule 
  ],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  onLoginSubmit() {
    if (!this.username || !this.password) {
      console.error('Username and Password are required.');
      alert('Please enter Proper Credentials.');
      return;
    }
  
    this.isLoading = true;
  
    this.authService.login(this.username, this.password).subscribe({
      next: (response: LoginResponse) => {
        if (response && response.token) {
          this.authService.storeToken(response.token); 
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.isLoading = false; 
      },
    });
  }
  
}
