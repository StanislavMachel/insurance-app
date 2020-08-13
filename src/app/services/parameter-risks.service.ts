import { Pageble } from './../../common/pageble';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParameterRisk } from 'src/common/parameter-risk';
import { Page } from 'src/common/page';

@Injectable({
  providedIn: 'root',
})
export class ParameterRisksService {
  readonly url = 'http://localhost:8080/api/parameter-risk';

  constructor(private http: HttpClient) {}

  getParameterRisks(pageble: Pageble): Observable<Page<ParameterRisk[]>> {
    let params = '';
    if (pageble != null) {
      params += `page=${pageble.page}&size=${pageble.size}`;
    }

    return this.http.get<Page<ParameterRisk[]>>(`${this.url}?${params}`);
  }
}
