import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./base.component";
import { ChargesComponent } from "./charges/charges.component";
import { ChargesListingComponent } from "./charges/listing/listing.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DocumentComponent } from "./document/document.component";
import { ListingComponent } from "./document/listing/listing.component";

const routes: Routes = [
	{
		path: "",
		component: BaseComponent,
		children: [
			{
				path: "dashboard",
				component: DashboardComponent,
			},
			{
				path: "document",
				component: DocumentComponent,
			},
			{
				path: "document/:id",
				component: DocumentComponent,
			},
			{
				path: "documents",
				component: ListingComponent,
			},
			{
				path: "charge",
				component: ChargesComponent,
			},
			{
				path: "charge/:id",
				component: ChargesComponent,
			},
			{
				path: "charges",
				component: ChargesListingComponent,
			},
			{
				path: "**",
				redirectTo: "dashboard",
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BaseRoutingModule {}
