import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Dashboard } from "./dashboard";
declare const google: any;
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	parties = new Array<Dashboard>();
	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.apiService.getPartyBalance().subscribe((d: any) => {
			this.parties = d.result;
		});
		this.apiService.getSummary().subscribe((d: any) => {
			this.initChart(d.result);
		});
	}

	initChart(result: { expense: []; income: [] }) {
		google.charts.load("current", { packages: ["corechart"] });

		// Set a callback to run when the Google Visualization API is loaded.
		google.charts.setOnLoadCallback(() => {
			const expense = new google.visualization.DataTable();
			expense.addColumn("date", "Date");
			expense.addColumn("number", "Expense");

			result.expense.forEach((d: any) => {
				expense.addRow([new Date(d.key), d.value]);
			});
			drawChart(expense, "expense");

			const income = new google.visualization.DataTable();
			income.addColumn("date", "Date");
			income.addColumn("number", "Income");

			result.income.forEach((d: any) => {
				income.addRow([new Date(d.key), d.value]);
			});
			drawChart(income, "income");
		});

		// Callback that creates and populates a data table,
		// instantiates the pie chart, passes in the data and
		// draws it.
		function drawChart(data: any, div_id: string) {
			// Create the data table.

			// Set chart options
			var options = {
				title: `Monthly ${div_id} `,
				width: "100%",
				height: "500",
				hAxis: {
					format: "MMM dd, yyyy",
					// gridlines: { count: 15 },
				},
			};

			// Instantiate and draw our chart, passing in some options.
			// var incomeChart = new google.visualization.LineChart(
			// 	document.getElementById("income")
			// );
			// incomeChart.draw(data, options);

			var chart = new google.visualization.LineChart(
				document.getElementById(div_id)
			);
			chart.draw(data, options);
		}
	}
}
