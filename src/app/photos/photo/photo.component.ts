import { Component, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

const CLOUD : string = environment.ApiUrl + '/imgs/';

@Component({
    selector:'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    private _url : string = '';

    /**
     * @property 
     */
    @Input() description = '';
    /**
     * Adapta a url de acordo com o dado recebido
     * @property
     * @setter  
     */
    @Input() set url(url: string) {
        if(!url.startsWith('data')) {
            this._url = CLOUD + url;
        } else {
            this._url = url;
        }
    }
    /**
     * @property
     * @getter
     */
    get url() : string {
        return this._url
    }
}