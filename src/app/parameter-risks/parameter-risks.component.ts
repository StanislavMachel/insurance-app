import { Component, OnInit, ViewChild } from '@angular/core';
import { ParameterRisksService } from '../services/parameter-risks.service';
import { ParameterRisk } from '../../common/parameter-risk';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { Page } from 'src/common/page';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-parameter-risks',
  templateUrl: './parameter-risks.component.html',
  styleUrls: ['./parameter-risks.component.scss'],
})
export class ParameterRisksComponent implements OnInit {
  displayedColumns: string[] = ['parameterName', 'coefficient'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  pageSize = 10;
  pageSizeOptions: number[] = [this.pageSize, 20, 50];

  constructor(private parameterRisksService: ParameterRisksService) {}

  ngOnInit(): void {
    this.parameterRisksService
      .getParameterRisks({ page: 0, size: this.pageSize })
      .subscribe((pageOfParemeterRisks: Page<ParameterRisk[]>) => {
        this.dataSource.data = pageOfParemeterRisks.content;
        this.paginator.length = pageOfParemeterRisks.totalElements;
      });
  }

  getPaginatorData() {
    this.parameterRisksService
      .getParameterRisks({
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
      })
      .subscribe((pageOfParemeterRisks: Page<ParameterRisk[]>) => {
        this.dataSource.data = pageOfParemeterRisks.content;
        this.paginator.length = pageOfParemeterRisks.totalElements;
      });
  }
}
