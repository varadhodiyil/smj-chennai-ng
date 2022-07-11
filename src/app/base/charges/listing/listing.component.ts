import { Component, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-charge-listing",
	templateUrl: "./listing.component.html",
	styleUrls: ["./listing.component.scss"],
})
export class ChargesListingComponent implements OnInit {
	dtOptions: DataTables.Settings = {
		pagingType: "full_numbers",
		pageLength: 10,
	};
	dtTrigger: Subject<any> = new Subject<any>();
	documents = new Array<any>();
	constructor(
		private apiService: ApiService,
		private renderer: Renderer2,
		private router: Router
	) {}

	ngOnInit(): void {
		const that = this;
		this.dtOptions = {
			pagingType: "full_numbers",
			pageLength: 10,
			serverSide: true,
			processing: true,
			scrollX: true,
			ajax: (dataTablesParameters: any, callback) => {
				const params: any = {
					search: dataTablesParameters.search.value,
				};
				const searchParams = new URLSearchParams();
				Object.keys(params).forEach((key) =>
					searchParams.append(key, params[key])
				);
				that.apiService
					.getCharges(searchParams.toString())
					.subscribe((resp: any) => {
						callback({
							recordsTotal: resp.count,
							recordsFiltered: resp.count,
							data: resp.results,
						});
					});
			},
			columns: [
				{ data: "party" },
				{ data: "document" },
				{ data: "lr_date" },
				{ data: "dispatch_expense" },
				{ data: "dispatch_paid_on" },
				{ data: "door_delivery_expense" },
				{ data: "door_delivery_paid_on" },
				{ data: "pay_method" },
				{ data: "any_other_expense" },
				{ data: "any_other_expense_paid_on" },
				{ data: "any_other_expense_pay_method" },
				{ data: "total" },
				{ data: "paid" },
				{
					data: "id",
					render: function (data: any, type: any, full: any) {
						return `<button class="btn btn-primary" document_id="${data}" > View </button>`;
					},
				},
			],
		};
	}
	ngAfterViewInit(): void {
		this.renderer.listen("document", "click", (event) => {
			if (event.target.hasAttribute("document_id")) {
				this.router.navigate([
					"/charge/" + event.target.getAttribute("document_id"),
				]);
			}
		});
	}
}
