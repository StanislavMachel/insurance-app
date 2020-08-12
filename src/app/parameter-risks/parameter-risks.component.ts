import { Component, OnInit } from '@angular/core';
import { ParameterRisksService } from '../services/parameter-risks.service';
import { ParameterRisk } from '../../common/parameter-risk';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';

@Component({
  selector: 'app-parameter-risks',
  templateUrl: './parameter-risks.component.html',
  styleUrls: ['./parameter-risks.component.scss'],
})
export class ParameterRisksComponent implements OnInit {
  displayedColumns: string[] = ['parameterName', 'coefficient'];
  dataSource = new MatTableDataSource();

  constructor(private parameterRisksService: ParameterRisksService) {}

  ngOnInit(): void {
    this.parameterRisksService
      .getParameterRisks()
      .subscribe((paremeterRisks: ParameterRisk[]) => {
        this.dataSource.data = paremeterRisks;
        console.log(paremeterRisks);
      });
  }
}
