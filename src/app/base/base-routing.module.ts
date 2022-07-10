import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./base.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DocumentComponent } from "./document/document.component";

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
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BaseRoutingModule {}
