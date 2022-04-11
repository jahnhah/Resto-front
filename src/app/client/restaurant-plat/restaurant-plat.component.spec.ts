import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPlatComponent } from './restaurant-plat.component';

describe('RestaurantPlatComponent', () => {
  let component: RestaurantPlatComponent;
  let fixture: ComponentFixture<RestaurantPlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantPlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
