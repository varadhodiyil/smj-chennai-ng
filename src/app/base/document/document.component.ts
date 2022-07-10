import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";

@Component({
	selector: "app-document",
	templateUrl: "./document.component.html",
	styleUrls: ["./document.component.scss"],
})
export class DocumentComponent implements OnInit {
	documentForm: FormGroup;
	now = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
	constructor(private fb: FormBuilder, private apiService: ApiService) {
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

	ngOnInit(): void {}
	saveDocument() {
		this.apiService.saveDocument(this.documentForm.value).subscribe({
			next: (d) => console.log(d),
			error: (e) => console.log(e),
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
		this.documentForm.controls["sgst"].setValue(0);
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
