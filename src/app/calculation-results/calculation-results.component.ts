import { CalculationResultService } from '../services/calculation-result.service';
import { Component, OnInit } from '@angular/core';
import { CalculationResult } from 'src/common/calculation-result';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-calculation-results',
  templateUrl: './calculation-results.component.html',
  styleUrls: ['./calculation-results.component.scss'],
})
export class CalculationResultsComponent implements OnInit {
  readonly monthlyFee = 'monthlyFee';

  displayedColumns: string[] = [
    'vehiclePlateNumber',
    'vehicleFirstRegistration',
    'vehiclePurchasePrice',
    'vehicleProducer',
    'vehicleMileage',
    'vehiclePreviousIndemnity',
    'calcParameters',
    'annualFee',
  ];
  dataSource = new MatTableDataSource();

  showMonthlyFee(checked: boolean) {
    console.log(checked);

    if (checked) {
      this.displayedColumns.push(this.monthlyFee);
    } else {
      this.displayedColumns = this.displayedColumns.filter(
        (item) => item !== this.monthlyFee
      );
    }
  }

  constructor(private calculationResultService: CalculationResultService) {}

  ngOnInit(): void {
    this.calculationResultService
      .getCalculationResults()
      .subscribe((calculationResults: CalculationResult[]) => {
        this.dataSource.data = calculationResults;
      });
  }
}
