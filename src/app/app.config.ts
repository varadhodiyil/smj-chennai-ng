import { environment } from "../environments/environment";

export class AppConfig {
	private APP_DOMAIN = environment.host;

	public LOGIN = `${environment.host}/login/`;
}
