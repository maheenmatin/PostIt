import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ViewCommunityComponent } from "./view-community.component";

describe("ViewCommunityComponent", () => {
  let component: ViewCommunityComponent;
  let fixture: ComponentFixture<ViewCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCommunityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
