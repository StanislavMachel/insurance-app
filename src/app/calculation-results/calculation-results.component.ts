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
  displayedColumns: string[] = [
    'vehiclePlateNumber',
    'vehicleFirstRegistration',
    'vehiclePurchasePrice',
    'vehicleProducer',
    'vehicleMileage',
    'vehiclePreviousIndemnity',
    'monthlyFee',
    'annualFee',
    'calcParameters',
  ];
  dataSource = new MatTableDataSource();

  constructor(private calculationResultService: CalculationResultService) {}

  ngOnInit(): void {
    this.calculationResultService
      .getCalculationResults()
      .subscribe((calculationResults: CalculationResult[]) => {
        this.dataSource.data = calculationResults;
      });
  }
}
