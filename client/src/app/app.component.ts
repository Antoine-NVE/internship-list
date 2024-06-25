import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactService } from './services/contact.service';
import { CompanyService } from './services/company.service';
import { CompanyStatus } from './models/company.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'client';

    constructor(
        private companyService: CompanyService,
        private contactService: ContactService
    ) {}

    ngOnInit(): void {
        // this.contactService
        //     .create({
        //         object: 'test',
        //         date: new Date(),
        //         companyId: '667a8226df761ffb7fa66670',
        //     })
        //     .subscribe({
        //         next: (message) => console.log(message),
        //         error: (error) => console.error(error),
        //     });
        //
        // this.contactService.readOne('6676913c4c4b5336c345963c').subscribe({
        //     next: (contact) => console.log(contact),
        //     error: (error) => console.error(error),
        // });
        //
        // this.contactService.update({
        //     _id: '6676913c4c4b5336c345963c',
        //     object: 'Yo',
        //     date: new Date(),
        //     companyId: '666ea0b2aff3dc1352813845',
        // }).subscribe({
        //     next: (message) => console.log(message),
        //     error: (error) => console.error(error),
        // });
        //
        // this.contactService.delete('66769705309ab1b7ea72ad15').subscribe({
        //     next: (message) => console.log(message),
        //     error: (error) => console.error(error),
        // });
        //
        //
        // this.companyService
        //     .create({
        //         name: 'Pixine',
        //         discovery: 'Appel',
        //         status: CompanyStatus.Waiting,
        //     })
        //     .subscribe({
        //         next: (message) => console.log(message),
        //         error: (error) => console.error(error),
        //     });
        //
        // this.companyService.readAll().subscribe({
        //     next: (companies) => console.log(companies),
        //     error: (error) => console.error(error),
        // });
        //
        // this.companyService.readOne('666ea0b2aff3dc1352813845').subscribe({
        //     next: (company) => console.log(company),
        //     error: (error) => console.error(error),
        // });
        //
        // this.companyService
        //     .update({
        //         _id: '666ea0b2aff3dc1352813845',
        //         name: 'Pixine',
        //         discovery: 'Internet',
        //         status: CompanyStatus.Declined,
        //     })
        //     .subscribe({
        //         next: (message) => console.log(message),
        //         error: (error) => console.error(error),
        //     });
        //
        // this.companyService.delete('666ea0b2aff3dc1352813845').subscribe({
        //     next: (message) => console.log(message),
        //     error: (error) => console.error(error),
        // });
    }
}
