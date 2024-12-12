import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppConfigService } from '../AppConfig/app-config.service'; 
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any;
  private currentRole: any;
  private roleList: any[] = [];
  private moduleList: any[] = [];
  private currentModule: any;
  private apiUrl: string = `${environment.apiUrl}CreateToken`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: AppConfigService,
    private toastController: ToastController
  ) {
    this.loadUserInfo();
  }

  // Get user information from local storage
  private loadUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.currentUser = JSON.parse(userInfo);
      this.currentRole = this.currentUser.CurrentRole;
      this.roleList = this.currentUser.Roles;
      this.moduleList = this.currentUser.UserModule;
      this.currentModule = this.currentUser.CurrentModule;
    }
  }

    // Login method: returns an observable
    login(username: string, password: string): Observable<LoginResponse> {
      debugger;
      const loginData = { username, password };
      return this.http.post<LoginResponse>(this.apiUrl, loginData).pipe(
        
        catchError((error) => {
          debugger;
          console.error('Login error:', error);
          this.showToast('Login failed. Please check your credentials.');
          return throwError(() => new Error(error));
        })
      );
    }
    

    isTokenExpired(token: string): boolean {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    }
    
    
 // Store token in localStorage
  storeToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }


  // Get user info (cached in local storage)
  public getUserInfo() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      return !this.isTokenExpired(token); // Ensure the token is not expired
    }
    return false;
  }

  // Guard the login page
canAccessLogin(): boolean {
  return !this.isAuthenticated();
}


  // Show toast notifications
  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }

  // Set current role (after login)
  public setCurrentRole(role: any) {
    this.currentRole = role;
    this.saveUserInfo();
  }

  // Save updated user info to local storage
  private saveUserInfo() {
    localStorage.setItem('userInfo', JSON.stringify(this.currentUser));
  }

  // Handle role change
  public changeRole(newRole: any) {
    this.setCurrentRole(newRole);
    this.fetchMenuByRole(newRole);
  }

  // Fetch menu based on the role
  private fetchMenuByRole(newRole: any) {
    const url = `${this.config.getBaseUrl()}api/Permission/GetMenuByRole?Role=${newRole}&moduleID=${this.currentModule}`;
    this.http.get(url).subscribe(
      (data: any) => {
        this.currentUser.Menu = data;
        this.saveUserInfo();
        this.router.navigate([this.currentUser.Menu[0].Application_URL_Desc]);
      },
      (error) => {
        console.error('Error fetching menu:', error);
        this.showToast('Error fetching menu');
      }
    );
  }

  // Change module for the user
  public changeModule(moduleID: any) {
    const url = `${this.config.getBaseUrl()}api/Permission/GetRoleByUserModule?UserOID=${this.currentUser.FKUser}&moduleID=${moduleID}`;
    this.http.get(url).subscribe(
      (data: any) => {
        this.currentUser.CurrentModule = moduleID;
        this.currentUser.Roles = data;
        this.saveUserInfo();
        this.changeRole(this.currentUser.Roles[0]?.AAUR_Seq || -1);
      },
      (error) => {
        console.error('Error fetching roles for module:', error);
        this.showToast('Error fetching roles');
      }
    );
  }

  // Get current user's role
  public getCurrentRole() {
    return this.currentRole;
  }

  // Get current module
  public getCurrentModule() {
    return this.currentModule;
  }

  // Logout and clear user info
  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  // Validate credentials (for login form)
  public validateCredentials(username: string, password: string): boolean {
    // Add real validation logic here (e.g., call an API)
    return username && password ? true : false;
  }
}
