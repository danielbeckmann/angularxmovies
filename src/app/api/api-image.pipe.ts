import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'app/api/api.service';

@Pipe({
    name: 'apiImage'
})
export class ApiImagePipe implements PipeTransform {

    constructor(private apiService: ApiService) { }

    transform(imageName: string, size?: any): any {
        // Define a default image size
        if (!size) {
            size = 'w92';
        }

        if (imageName) {
            return this.apiService.getImageBaseUrl() + size + imageName;
        }

        return;
    }
}
