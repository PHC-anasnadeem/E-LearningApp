import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  private baseUrl: string = environment.apiUrl;

  // Define other config properties if needed (e.g., app-specific keys)
  private appKey: string = 'phc.org.pk.12345678912345678912345678'; // Replace with your actual app key

  constructor() {}

  // Get the base API URL
  getBaseUrl(): string {
    return this.baseUrl;
  }

  // Get the app key (optional)
  getAppKey(): string {
    return this.appKey;
  }

  // You can add more configuration settings here as needed
  getOtherConfigSettings() {
    return {
      featureFlag: true, // Example feature flag
      apiVersion: 'v1',  // Example API version
    };
  }

  // Example method to get environment-specific settings (e.g., for different environments)
  getEnvironmentSettings(): any {
    const environment = window['env'] || 'development'; // 'env' can be set globally
    switch (environment) {
      case 'production':
        return {
          apiUrl: 'https://prod-api.example.com/',
        };
      case 'staging':
        return {
          apiUrl: 'https://localhost:44387/',
        };
      default:
        return {
          apiUrl: this.baseUrl,
        };
    }
  }




}
