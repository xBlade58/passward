import { Component } from '@angular/core';

export interface Tile {
  color: string;
  borderColor: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PassWard';

}
