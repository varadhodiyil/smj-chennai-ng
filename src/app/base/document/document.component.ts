import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ApiService } from "../../services/api.service";

@Component({
	selector: "app-document",
	templateUrl: "./document.component.html",
	styleUrls: ["./document.component.scss"],
})
export class DocumentComponent implements OnInit {
	documentForm: FormGroup;
	now = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
	isEdit = false;
	message = "";
	constructor(
		private fb: FormBuilder,
		private apiService: ApiService,
		private _route: ActivatedRoute
	) {
		this.documentForm = this.fb.group({
			party: ["", Validators.required],
			docket_date: ["", Validators.compose([Validators.required])],
			docket_number: ["", Validators.required],
			no_of_pack: ["", Validators.required],
			station: ["", Validators.required],
			weight: ["", Validators.required],
			rate: ["", Validators.required],
			charge: [50, Validators.required],
			other_charge: [0, Validators.required],
			total: [0, Validators.required],
			paid: [0, Validators.required],
			dispatch: ["", Validators.required],
			pay_mode: ["", Validators.required],
			bill_status: ["", Validators.required],
			remarks: ["", Validators.required],
			cgst: [0, Validators.required],
			igst: [0],
			sgst: [0],
			round_amt: [0, Validators.required],
			type: ["", Validators.required],
			service_type: ["", Validators.required],
		});
	}

	ngOnInit(): void {
		this._route.paramMap.subscribe((params: ParamMap) => {
			this.documentForm.get("docket_number")?.setValue(params.get("id"));
			this.getDocument();
		});
		this.documentForm.get("weight")?.valueChanges.subscribe((d) => {
			this.calculateGST();
			this.calculateTotal();
		});
		this.documentForm.get("rate")?.valueChanges.subscribe((d) => {
			this.calculateGST();
			this.calculateTotal();
		});
	}
	saveDocument() {
		if (!this.isEdit) {
			this.apiService.saveDocument(this.documentForm.value).subscribe({
				next: (d: any) => (this.message = d.message),
				error: (e) => console.log(e),
			});
		}
		if (this.isEdit) {
			this.apiService
				.updateDocument(
					this.documentForm.controls["docket_number"].value,
					this.documentForm.value
				)
				.subscribe({
					next: (d: any) => (this.message = d.message),
					error: (e) => console.log(e),
				});
		}
	}

	getDocument() {
		if (!this.documentForm.controls["docket_number"].value) {
			return;
		}
		this.apiService
			.getDocument(this.documentForm.controls["docket_number"].value)
			.subscribe((d: any) => {
				if (d.status) {
					this.isEdit = true;
					const result = d.result;
					delete result.id;
					delete result.created_at;
					delete result.updated_at;
					if (result.igst !== 0 || result.igst !== null) {
						result["service_type"] = "Other State";
					} else {
						result["service_type"] = "Same State";
					}
					this.documentForm.setValue(result);
				}
			});
	}
	initialCharge() {
		const price =
			this.documentForm.controls["rate"].value *
			this.documentForm.controls["weight"].value;
		return (
			price +
			this.documentForm.controls["charge"].value +
			this.documentForm.controls["other_charge"].value
		);
	}

	calculateGST() {
		let total = this.initialCharge();
		this.documentForm.controls["cgst"].setValue(total);
		this.documentForm.controls["sgst"].setValue(0);
		this.documentForm.controls["cgst"].setValue(0);
		this.documentForm.controls["igst"].setValue(0);
		this.documentForm.controls["round_amt"].setValue(0);
		if (this.documentForm.controls["service_type"].value === "Same State") {
			total = (total * 2.5) / 100;
			const actual = total;
			total = Math.ceil(total);
			const round = total - actual;
			this.documentForm.controls["cgst"].setValue(total);
			this.documentForm.controls["sgst"].setValue(total);
			this.documentForm.controls["round_amt"].setValue(round);
		}

		if (this.documentForm.controls["service_type"].value === "Other State") {
			total = (total * 5) / 100;
			const actual = total;
			total = Math.ceil(total);

			const round = total - actual;
			this.documentForm.controls["round_amt"].setValue(round);
			this.documentForm.controls["igst"].setValue(total);
		}
		return;
	}
	calculateTotal() {
		const total =
			this.initialCharge() +
			this.documentForm.controls["cgst"].value +
			this.documentForm.controls["igst"].value +
			this.documentForm.controls["sgst"].value;
		this.documentForm.controls["total"].setValue(total);
	}
}
