import { Component, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ApiService } from "src/app/services/api.service";

declare const $: any;

@Component({
	selector: "app-listing",
	templateUrl: "./listing.component.html",
	styleUrls: ["./listing.component.scss"],
})
export class ListingComponent implements OnInit {
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
			ajax: (dataTablesParameters: any, callback) => {
				const params: any = {
					search: dataTablesParameters.search.value,
				};
				const searchParams = new URLSearchParams();
				Object.keys(params).forEach((key) =>
					searchParams.append(key, params[key])
				);
				that.apiService
					.getAllDocuments(searchParams.toString())
					.subscribe((resp: any) => {
						callback({
							recordsTotal: resp.count,
							recordsFiltered: resp.count,
							data: resp.results,
						});
					});
			},
			columns: [
				{ data: "id" },
				{ data: "party" },
				{ data: "weight" },
				{ data: "station" },
				{ data: "charge" },
				{ data: "other_charge" },
				{ data: "paid" },
				{ data: "dispatch" },
				{ data: "bill_status" },
				{ data: "total" },
				{
					data: "docket_number",
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
					"/document/" + event.target.getAttribute("document_id"),
				]);
			}
		});
	}
}
