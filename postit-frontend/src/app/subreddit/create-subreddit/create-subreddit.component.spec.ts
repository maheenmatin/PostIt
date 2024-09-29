import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubredditComponent } from './create-subreddit.component';

describe('CreateSubredditComponent', () => {
  let component: CreateSubredditComponent;
  let fixture: ComponentFixture<CreateSubredditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubredditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubredditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
