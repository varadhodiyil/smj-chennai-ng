import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BillsRoutingModule } from "./bills-routing.module";
import { BillsComponent } from "./bills.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BillsListingComponent } from "./listing/listing.component";
import { DataTablesModule } from "angular-datatables";

@NgModule({
	declarations: [BillsComponent, BillsListingComponent],
	imports: [
		CommonModule,
		BillsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		DataTablesModule,
	],
})
export class BillsModule {}
