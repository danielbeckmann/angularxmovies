import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Config } from 'app/api/config';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class ApiService {
    private apiBaseUrl: string = environment.apiBaseUrl;
    private imageBaseUrl: string = environment.imageBaseUrl;
    private apiKey: string = environment.apiKey;

    constructor(private http: Http, private slimLoadingBarService: SlimLoadingBarService) {
        // Get api config, which maybe has updated image base url
        const config = this.loadConfigFromLocalStorage();
        if (config) {
            this.handleConfig(config);
        } else {
            this.get('configuration')
                .toPromise()
                .then(response => this.handleConfig(response.json() as Config))
                .catch(this.handleError);
        }
    }

    private handleConfig(config: Config) {
        this.imageBaseUrl = config.images.base_url;
        localStorage.setItem('config', JSON.stringify(config));
    }

    // TODO: add real error handling
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private loadConfigFromLocalStorage(): any {
        const config = localStorage.getItem('config');
        if (config) {
            try {
                return JSON.parse(config);
            } catch (error) {
                return;
            }
        }

        return;
    }

    /**
     * Performs a request on the moviedb with `get` http method. Includes the api key.
     */
    get(action: string, params?: Map<string, any>): Observable<Response> {
        const url = `${this.apiBaseUrl}/${action}`;

        const urlParams = new URLSearchParams();
        urlParams.set('api_key', environment.apiKey);

        if (params) {
            params.forEach((value, key) => {
                urlParams.set(key, value);
            });
        }

        this.slimLoadingBarService.start();

        return this.http.get(url, { search: urlParams })
            .finally(() => this.slimLoadingBarService.complete());
    }

    /**
     * Returns the image base url.
     */
    getImageBaseUrl(): string {
        return this.imageBaseUrl;
    }
}
