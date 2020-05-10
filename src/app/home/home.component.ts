import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    gameOption = "basegame";

    constructor(private router: Router) {}

    ngOnInit(): void {}

    generate(): void {
        console.log(`routing to "/${this.gameOption}"`);
        this.router.navigate([`/${this.gameOption}`]);
    }
}
