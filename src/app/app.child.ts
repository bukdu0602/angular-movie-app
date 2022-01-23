import { Component, Input } from '@angular/core';

// Define second directive.
@Component({
    selector: 'child',
    template: `<img src='http://image.tmdb.org/t/p/w185/{{posterPath}}'/>`,
})
// This is really just a component.
export class child {
    @Input()
    posterPath!: string
}
