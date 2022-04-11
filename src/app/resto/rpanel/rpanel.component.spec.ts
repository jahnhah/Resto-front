import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpanelComponent } from './rpanel.component';

describe('RpanelComponent', () => {
  let component: RpanelComponent;
  let fixture: ComponentFixture<RpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
