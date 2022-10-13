import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BillsComponent } from "./bills.component";
import { BillsListingComponent } from "./listing/listing.component";

const routes: Routes = [
	{
		path: "",
		component: BillsComponent,
	},
	{
		path: "listing",
		component: BillsListingComponent,
	},
	{
		path: ":id",
		component: BillsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BillsRoutingModule {}
