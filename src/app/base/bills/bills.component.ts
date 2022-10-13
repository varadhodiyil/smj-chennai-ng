import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-bills",
	templateUrl: "./bills.component.html",
	styleUrls: ["./bills.component.scss"],
})
export class BillsComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private apiService: ApiService,
		private _route: ActivatedRoute
	) {
		this.billsForm = this.fb.group({
			bill_number: ["", Validators.required],
			party: ["", Validators.required],
			bill_amount: [
				"",
				Validators.compose([Validators.required, Validators.min(0)]),
			],
			payment_mode: ["", Validators.required],
			payment_received_at: ["", Validators.required],
			payment_received: ["", Validators.required],
			balance: [""],
			remarks: ["", Validators.required],
		});
	}
	billsForm: FormGroup;
	id_: number | undefined;
	isEdit = false;
	now = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
	message = "";
	ngOnInit(): void {
		this._route.paramMap.subscribe((params: ParamMap) => {
			const id = params.get("id");
			if (!id) {
				return;
			}
			this.id_ = parseInt(id);
			this.getBill();
		});

		this.billsForm.get("payment_received")?.valueChanges.subscribe((d) => {
			this.billsForm
				.get("balance")
				?.setValue(
					this.billsForm.controls["bill_amount"].value -
						this.billsForm.controls["payment_received"].value
				);
		});
	}

	getBill() {
		if (!this.id_) {
			return;
		}
		this.apiService.getBill(this.id_).subscribe((d: any) => {
			d.result.balance = d.result.bill_amount - d.result.payment_received;
			delete d.result.id;
			delete d.result.created_at;
			delete d.result.updated_at;
			this.billsForm.setValue(d.result);
			this.isEdit = true;
		});
	}

	saveDocument() {
		if (!this.isEdit) {
			this.apiService.saveBills(this.billsForm.value).subscribe({
				next: (d: any) => (this.message = d.message),
				error: (e) => (this.message = e.error.errors),
			});
		} else {
			if (!this.id_) {
				return;
			}
			this.apiService.updateBills(this.id_, this.billsForm.value).subscribe({
				next: (d: any) => (this.message = d.message),
				error: (e) => (this.message = e.error.errors),
			});
		}
	}
}
