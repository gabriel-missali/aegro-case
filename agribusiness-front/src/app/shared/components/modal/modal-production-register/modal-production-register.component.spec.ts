import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductionRegisterComponent } from './modal-production-register.component';

describe('ModalProductionRegisterComponent', () => {
  let component: ModalProductionRegisterComponent;
  let fixture: ComponentFixture<ModalProductionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProductionRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
