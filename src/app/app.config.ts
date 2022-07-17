import { environment } from "../environments/environment";

export class AppConfig {
	private APP_DOMAIN = environment.host;

	public LOGIN = `${this.APP_DOMAIN}/login/`;
	public DOCUMENT = `${this.APP_DOMAIN}/documents/`;

	public PROFILE = `${this.APP_DOMAIN}/profile/`;
	public PARTY = `${this.APP_DOMAIN}/party/`;

	public CHARGE = `${this.APP_DOMAIN}/charges/`;
	public DASHBOARD_PARTY = `${this.APP_DOMAIN}/dashboard/party`;
	public DASHBOARD_SUMMARAY = `${this.APP_DOMAIN}/dashboard/summary`;
}
