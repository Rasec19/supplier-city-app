import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMainCardsComponent } from './content-main-cards.component';

describe('ContentMainCardsComponent', () => {
  let component: ContentMainCardsComponent;
  let fixture: ComponentFixture<ContentMainCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentMainCardsComponent]
    });
    fixture = TestBed.createComponent(ContentMainCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
