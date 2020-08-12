import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalculationResult } from 'src/common/calculation-result';

@Injectable({
  providedIn: 'root',
})
export class CalculationResultService {
  readonly url = 'http://localhost:8080/api/insurance-calc-result';

  constructor(private http: HttpClient) {}

  getCalculationResults(): Observable<CalculationResult[]> {
    return this.http.get(this.url).pipe(
      map((response: any[]) => {
        return response.map((item) => ({
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
      })
    );
  }
}
