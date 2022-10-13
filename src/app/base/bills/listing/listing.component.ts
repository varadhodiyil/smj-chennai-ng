import { Component, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-listing",
	templateUrl: "./listing.component.html",
	styleUrls: ["./listing.component.scss"],
})
export class BillsListingComponent implements OnInit {
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
			search: false,
			ajax: (dataTablesParameters: any, callback) => {
				const params: any = {
					search: dataTablesParameters.search.value,
				};
				const searchParams = new URLSearchParams();
				Object.keys(params).forEach((key) =>
					searchParams.append(key, params[key])
				);
				that.apiService.getBills().subscribe((resp: any) => {
					callback({
						recordsTotal: resp.count,
						recordsFiltered: resp.count,
						data: resp.results,
					});
				});
			},
			columns: [
				{ data: "bill_number" },
				{ data: "party" },
				{ data: "bill_amount" },
				{ data: "payment_mode" },
				{ data: "payment_received_at" },
				{ data: "payment_received" },
				{ data: "remarks" },
				{
					data: "id",
					render: function (data: any, type: any, full: any) {
						return `<button class="btn btn-primary" bill_id="${data}" > View </button>`;
					},
				},
			],
		};
	}
	ngAfterViewInit(): void {
		this.renderer.listen("document", "click", (event) => {
			if (event.target.hasAttribute("bill_id")) {
				this.router.navigate([
					"/bills/" + event.target.getAttribute("bill_id"),
				]);
			}
		});
	}
}
