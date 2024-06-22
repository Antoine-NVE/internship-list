import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactService } from './services/contact.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'client';

    constructor(private ContactService: ContactService) {}

    ngOnInit(): void {
        // this.ContactService.create({
        //     object: 'test',
        //     date: new Date(),
        //     companyId: '666ea0b2aff3dc1352813845',
        // }).subscribe({
        //     next: (message) => console.log(message),
        //     error: (error) => console.error(error),
        // });
        //
        // this.ContactService.readOne('6676913c4c4b5336c345963c').subscribe({
        //     next: (contact) => console.log(contact),
        //     error: (error) => console.error(error),
        // });
        //
        // this.ContactService.update({
        //     _id: '6676913c4c4b5336c345963c',
        //     object: 'Yo',
        //     date: new Date(),
        //     companyId: '666ea0b2aff3dc1352813845',
        // }).subscribe({
        //     next: (message) => console.log(message),
        //     error: (error) => console.error(error),
        // });
        //
        // this.ContactService.delete('66769705309ab1b7ea72ad15').subscribe({
        //     next: (message) => console.log(message),
        //     error: (error) => console.error(error),
        // });
    }
}
