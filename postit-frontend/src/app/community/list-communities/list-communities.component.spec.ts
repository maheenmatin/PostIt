import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListCommunitiesComponent } from "./list-communities.component";

describe("ListCommunitiesComponent", () => {
  let component: ListCommunitiesComponent;
  let fixture: ComponentFixture<ListCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommunitiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
