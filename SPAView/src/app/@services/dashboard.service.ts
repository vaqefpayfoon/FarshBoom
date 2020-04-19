import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { BrandDto, ProjectDto } from '../@models/dashboard';

@Injectable({providedIn: 'root'})

export class DashboardService {
  baseUrl = environment.apiUrl + 'dashboard';

  constructor(private http: HttpClient) {}
  brnads: BrandDto[];
  projects: ProjectDto[]

  getBrnads(): Observable<BrandDto[]> {
    return this.http.get<BrandDto[]>(this.baseUrl + "/getBrnads", { observe: 'response'})
    .pipe(map((response: any) => { this.brnads = response.body;
      return this.brnads;
    }));
  }

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.baseUrl + "/getProjects", { observe: 'response'})
    .pipe(map((response: any) => { this.projects = response.body;
      return this.projects;
    }));
  }

}
