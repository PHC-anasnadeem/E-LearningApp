import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { MatSelectModule } from '@angular/material/select'; 



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,  
  imports: [IonicModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatSelectModule
    
  ],
})
export class SignUpComponent  implements OnInit {
  public model: any = {};
  public profilePicture: File | null = null;
  public password: string = '';
  public confirmPassword: string = '';
  public message: any = {};

  constructor() { 

  }

  ngOnInit() {}

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  }
  

  onSignUpSubmit(model: any) {
    if (model.password !== model.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle signup logic here
    console.log('Signup model:', model);
  }

}
