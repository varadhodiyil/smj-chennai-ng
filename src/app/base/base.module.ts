import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BaseRoutingModule } from "./base-routing.module";
import { DocumentComponent } from "./document/document.component";
import { BaseComponent } from "./base.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [DocumentComponent, BaseComponent, DashboardComponent],
	imports: [CommonModule, BaseRoutingModule, ReactiveFormsModule, FormsModule],
})
export class BaseModule {}
