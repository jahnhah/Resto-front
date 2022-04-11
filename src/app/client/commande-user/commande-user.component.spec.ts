import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeUserComponent } from './commande-user.component';

describe('CommandeUserComponent', () => {
  let component: CommandeUserComponent;
  let fixture: ComponentFixture<CommandeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
