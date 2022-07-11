import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChargesListingComponent } from "./listing.component";

describe("ListingComponent", () => {
	let component: ChargesListingComponent;
	let fixture: ComponentFixture<ChargesListingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChargesListingComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ChargesListingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
