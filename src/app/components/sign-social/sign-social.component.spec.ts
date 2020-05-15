import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignSocialComponent } from './sign-social.component';

describe('SignSocialComponent', () => {
  let component: SignSocialComponent;
  let fixture: ComponentFixture<SignSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
