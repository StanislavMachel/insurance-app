import { CalculationResultService } from '../services/calculation-result.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalculationResult } from 'src/common/calculation-result';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from 'src/common/page';
import { MatPaginator } from '@angular/material/paginator';

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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  pageSize = 10;
  pageSizeOptions: number[] = [this.pageSize, 20, 50];
  withIndemnityRisk: boolean = false;

  constructor(private calculationResultService: CalculationResultService) {}

  ngOnInit(): void {
    this.getCalculationResult(0, this.pageSize);
  }

  showMonthlyFee(checked: boolean) {
    if (checked) {
      this.displayedColumns.push(this.monthlyFee);
    } else {
      this.displayedColumns = this.displayedColumns.filter(
        (item) => item !== this.monthlyFee
      );
    }
  }

  calculationWithIndemnityRisk(checked: boolean) {
    this.withIndemnityRisk = checked;
    this.getPaginatorData();
  }

  readonly vehicleValue = 'vehicle_value';
  readonly vehicleAge = 'vehicle_age';
  readonly previousIndemnity = 'previous_indemnity';

  private getIncludeParams() {
    return this.withIndemnityRisk
      ? [this.vehicleValue, this.vehicleAge, this.previousIndemnity]
      : [this.vehicleValue, this.vehicleAge];
  }

  getPaginatorData() {
    this.getCalculationResult(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  private getCalculationResult(pageIndex: number, pageSize: number) {
    this.calculationResultService
      .getCalculationResults(
        {
          page: pageIndex,
          size: pageSize,
        },
        this.getIncludeParams()
      )
      .subscribe((pageOfCalculationResults: Page<CalculationResult[]>) => {
        this.dataSource.data = pageOfCalculationResults.content;
        this.paginator.length = pageOfCalculationResults.totalElements;
      });
  }
}
