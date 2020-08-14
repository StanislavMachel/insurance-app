import { Pageble } from './../../common/pageble';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalculationResult } from 'src/common/calculation-result';
import { Page } from './../../common/page';

@Injectable({
  providedIn: 'root',
})
export class CalculationResultService {
  readonly url = 'http://localhost:8080/api/insurance-calc-result';

  constructor(private http: HttpClient) {}

  getCalculationResults(
    pageble: Pageble,
    includeParameterNames: string[] = null
  ): Observable<Page<CalculationResult[]>> {
    let params = '';
    if (pageble != null) {
      params += `page=${pageble.page}&size=${pageble.size}`;
    }

    if (includeParameterNames != null) {
      params += `&includeParameterNames=${includeParameterNames.toString()}`;
    }

    return this.http.get(`${this.url}?${params}&sort=id,ASC`).pipe(
      map((page: Page<any>) => {
        console.log(page);

        page.content = page.content.map((item) => ({
          vehiclePlateNumber: item.vehicle.plateNumber,
          vehicleFirstRegistration: item.vehicle.firstRegistration,
          vehiclePurchasePrice: item.vehicle.purchasePrice,
          vehicleProducer: item.vehicle.producer,
          vehicleMileage: item.vehicle.mileage,
          vehiclePreviousIndemnity: item.vehicle.previousIndemnity,
          monthlyFee: item.monthlyFee,
          annualFee: item.annualFee,
          calcParameters: item.parameterRisks.map((item) => item.parameterName),
        }));

        return page;
      })
    );
  }
}
