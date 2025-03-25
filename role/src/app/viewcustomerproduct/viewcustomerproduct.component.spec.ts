import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcustomerproductComponent } from './viewcustomerproduct.component';

describe('ViewcustomerproductComponent', () => {
  let component: ViewcustomerproductComponent;
  let fixture: ComponentFixture<ViewcustomerproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewcustomerproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcustomerproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
