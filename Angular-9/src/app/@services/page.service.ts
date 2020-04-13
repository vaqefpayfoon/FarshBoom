import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../@models/pagination';
import { Page, PageContent } from '../@models/Page';
import { StringModel, NameModel } from '../@models/dropDown';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PageService {
  baseUrl = environment.apiUrl + 'page';

  constructor(private http: HttpClient) {}
  pages: Page[];
  pageContents: PageContent[];
  pageContent: PageContent;

  getPageContents(): Observable<PageContent[]> {
    return this.http.get<PageContent[]>(this.baseUrl + "/getPageContents", { observe: 'response'})
    .pipe(map((response: any) => { this.pageContents = response.body;
      return this.pageContents;
    }));
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.baseUrl + "/getPages", { observe: 'response'})
    .pipe(map((response: any) => { this.pages = response.body;
      return this.pages;
    }));
  }


  getPageContent(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<Page>(this.baseUrl + "/getPageContent", { observe: 'response', params }).pipe(map((response: any) => {
      const pageContent = response.body;
      this.pageContent = pageContent.pageContent;
      return this.pageContent;
    }));
  }

  pageId: any;
  savePage(model: Page) {
    return this.http.post(this.baseUrl + '/savePage', model, {observe: 'response'}).pipe(
      map((response: any) => {
        const createdPage = response.body;
         this.pageId = createdPage.id;
      })
    );
  }

  updatePage(model: Page) {
    return this.http.post(this.baseUrl + '/updatePage', model, {observe: 'response'}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deletePage(id: number) {
    let name: StringModel = {id: id, name: ''};
    return this.http.post(this.baseUrl + '/deletePage', name, {observe: 'response'}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

}