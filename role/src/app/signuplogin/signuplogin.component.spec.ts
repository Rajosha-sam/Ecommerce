import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuploginComponent } from './signuplogin.component';

describe('SignuploginComponent', () => {
  let component: SignuploginComponent;
  let fixture: ComponentFixture<SignuploginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignuploginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignuploginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
