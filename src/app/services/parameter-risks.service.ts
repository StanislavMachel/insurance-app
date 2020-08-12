import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParameterRisk } from 'src/common/parameter-risk';

@Injectable({
  providedIn: 'root',
})
export class ParameterRisksService {
  readonly url = 'http://localhost:8080/api/parameter-risk';

  constructor(private http: HttpClient) {}

  getParameterRisks(): Observable<ParameterRisk[]> {
    return this.http.get<ParameterRisk[]>(this.url);
  }
}
