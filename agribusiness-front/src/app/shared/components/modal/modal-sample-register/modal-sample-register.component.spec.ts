import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSampleRegisterComponent } from './modal-sample-register.component';

describe('ModalSampleRegisterComponent', () => {
  let component: ModalSampleRegisterComponent;
  let fixture: ComponentFixture<ModalSampleRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSampleRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSampleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
