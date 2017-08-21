import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rating'
})
export class RatingPipe implements PipeTransform {

    transform(rating: number, args?: any): any {
        const stars = Math.round(rating / 2.0);
        let output = '';
        for (let i = 0; i < stars; i++) {
            output += '\u2605';
        }

        for (let j = stars; j < 5; j++) {
            output += '\u2606';
        }

        if (output === '') {
            output = '-';
        }

        return output;
    }
}
