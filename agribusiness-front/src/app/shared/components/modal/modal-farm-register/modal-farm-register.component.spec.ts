import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFarmRegisterComponent } from './modal-farm-register.component';

describe('ModalFarmRegisterComponent', () => {
  let component: ModalFarmRegisterComponent;
  let fixture: ComponentFixture<ModalFarmRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFarmRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFarmRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
