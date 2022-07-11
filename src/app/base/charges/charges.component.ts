import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

declare const $: any;
@Component({
	selector: "app-charges",
	templateUrl: "./charges.component.html",
	styleUrls: ["./charges.component.scss"],
})
export class ChargesComponent implements OnInit {
	chargesForm: FormGroup;
	isEdit = false;
	id: string = "";
	message = "";
	now = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
	constructor(
		private apiService: ApiService,
		private fb: FormBuilder,
		private _route: ActivatedRoute
	) {
		this.chargesForm = this.fb.group({
			party: ["", Validators.required],
			dispatch_expense: [0, Validators.required],
			dispatch_paid_on: [0, Validators.required],
			door_delivery_expense: [0, Validators.required],
			door_delivery_paid_on: ["", Validators.required],
			pay_method: ["", Validators.required],
			any_other_expense: [null],
			any_other_expense_paid_on: [null],
			any_other_expense_pay_method: [null],
			document: [null, Validators.required],
			total: [
				0,
				Validators.compose([Validators.required, Validators.min(0.1)]),
			],
			paid: [0, Validators.compose([Validators.required, Validators.min(0.1)])],
			lr_date: ["", Validators.required],
		});
	}

	ngOnInit(): void {
		const that = this;
		$(document).ready(() => {
			$.noConflict();
			$(".basicAutoComplete").autoComplete({
				resolver: "custom",
				events: {
					search: function (qry: any, callback: (arg0: any) => void) {
						// let's do a custom ajax call
						$.ajax(that.apiService.PARTIES, {
							data: { search: qry },
						}).done(function (res: { results: any }) {
							const results = res.results.map((e: any) => {
								return { text: e["name"], id: e["id"] };
							});
							callback(results);
						});
					},
				},
			});

			$(".basicAutoComplete").on(
				"autocomplete.select",
				function (evt: any, item: any) {
					that.chargesForm.controls["party"].setValue(item.text);
				}
			);
		});

		this._route.paramMap.subscribe((params: ParamMap) => {
			this.getCharge(params.get("id"));
		});

		this.chargesForm.get("document")?.valueChanges.subscribe((d) => {
			this.getDocument();
		});
	}

	getCharge(id: string | null) {
		if (id === null) {
			return;
		}
		this.apiService.getCharge(id).subscribe((d: any) => {
			const result = d.result;
			delete result.id;
			delete result.created_at;
			this.chargesForm.setValue(result);
			this.isEdit = true;
			this.id = id;
		});
	}

	saveCharges() {
		if (this.isEdit) {
			this.apiService
				.updateCharge(this.id, this.chargesForm.value)
				.subscribe((d: any) => {
					this.message = d.message;
				});
		} else {
			this.apiService.saveCharge(this.chargesForm.value).subscribe((d: any) => {
				{
					this.message = d.message;
				}
			});
		}
	}

	getDocument() {
		if (!this.chargesForm.controls["document"].value) {
			return;
		}
		this.apiService
			.getDocument(this.chargesForm.controls["document"].value)
			.subscribe((d: any) => {
				if (d.status) {
					this.chargesForm.controls["party"].setValue(d.result.party);
					this.chargesForm.controls["total"].setValue(d.result.total);
				}
			});
	}
}
