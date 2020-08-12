import { CalculationResultsComponent } from './calculation-results/calculation-results.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParameterRisksComponent } from './parameter-risks/parameter-risks.component';

const routes: Routes = [
  { path: 'calculation-results', component: CalculationResultsComponent },
  { path: 'parameter-risks', component: ParameterRisksComponent },
  { path: '**', redirectTo: '/parameter-risks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
