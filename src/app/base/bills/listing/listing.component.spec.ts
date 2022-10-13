import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BillsListingComponent } from "./listing.component";

describe("BillsListingComponent", () => {
	let component: BillsListingComponent;
	let fixture: ComponentFixture<BillsListingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BillsListingComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(BillsListingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
