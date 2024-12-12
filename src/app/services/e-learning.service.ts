import { Injectable } from '@angular/core';
// import { AppConfig } from '../app.config';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// import { WindowRef } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ELearningService {

  baseService: string = '';
  public SearchModel: any = {};
  public SaveModel: any = {};
  public ViewModel: any = {};
  public ChallanModel: any = {};
  public SelectedIndex: number = 0;
  nativeWindow: any;

  constructor(

    public dialog: MatDialog,
    private http: HttpClient,

  ) {
    // this.baseService = this.config.getBaseUrl();
  }

  public signUp(data: any = {}) {
    // let baseService: string = this.config.getBaseUrl();
    // return this.http.post(this.baseService + 'api/Plans/SaveTeam', data).pipe(
    //   map(res => {
    //     return res;
    //   })
    // );
  }
}
