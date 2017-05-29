import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedService {
	private rssToJsonServiceBaseUrl: string = 'https://api.rss2json.com/v1/api.json?rss_url=';
	private feed = 'http://www.vegokoll.se/vegokoll_rss';

	constructor(public http: Http) {}

	getFeedContent() {
        return new Promise(resolve => {
			this.http.get( this.rssToJsonServiceBaseUrl + this.feed )
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}
}