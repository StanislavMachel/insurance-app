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

  constructor(private calculationResultService: CalculationResultService) {}

  ngOnInit(): void {
    this.calculationResultService
      .getCalculationResults({ page: 0, size: this.pageSize })
      .subscribe((pageOfCalculationResults: Page<CalculationResult[]>) => {
        this.dataSource.data = pageOfCalculationResults.content;
        this.paginator.length = pageOfCalculationResults.totalElements;
      });
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

  getPaginatorData() {
    this.calculationResultService
      .getCalculationResults({
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
      })
      .subscribe((pageOfCalculationResults: Page<CalculationResult[]>) => {
        this.dataSource.data = pageOfCalculationResults.content;
        this.paginator.length = pageOfCalculationResults.totalElements;
      });
  }
}
