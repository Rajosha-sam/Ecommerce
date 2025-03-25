import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewroledetailsComponent } from './viewroledetails.component';

describe('ViewroledetailsComponent', () => {
  let component: ViewroledetailsComponent;
  let fixture: ComponentFixture<ViewroledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewroledetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewroledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
