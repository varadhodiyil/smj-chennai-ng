import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BaseRoutingModule } from "./base-routing.module";
import { DocumentComponent } from "./document/document.component";
import { BaseComponent } from "./base.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { ListingComponent } from "./document/listing/listing.component";
import { ChargesComponent } from "./charges/charges.component";
import { ChargesListingComponent } from "./charges/listing/listing.component";
@NgModule({
	declarations: [
		DocumentComponent,
		BaseComponent,
		DashboardComponent,
		ListingComponent,
		ChargesComponent,
		ChargesListingComponent,
	],
	imports: [
		CommonModule,
		BaseRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		DataTablesModule,
	],
})
export class BaseModule {}
