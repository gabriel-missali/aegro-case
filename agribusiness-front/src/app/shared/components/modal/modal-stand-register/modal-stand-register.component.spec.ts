import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStandRegisterComponent } from './modal-stand-register.component';

describe('ModalStandRegisterComponent', () => {
  let component: ModalStandRegisterComponent;
  let fixture: ComponentFixture<ModalStandRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStandRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStandRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
