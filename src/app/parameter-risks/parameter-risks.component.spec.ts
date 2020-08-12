import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterRisksComponent } from './parameter-risks.component';

describe('ParameterRisksComponent', () => {
  let component: ParameterRisksComponent;
  let fixture: ComponentFixture<ParameterRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
