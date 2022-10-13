import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () => import("./auth/auth.module").then((a) => a.AuthModule),
	},

	{
		path: "",
		loadChildren: () => import("./base/base.module").then((b) => b.BaseModule),
		canActivate: [AuthGuard],
	},
	{
		path: "**",
		redirectTo: "dashboard",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
