import {Component, ViewChild} from '@angular/core';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'

/**
 * @title Data table with sorting and filtering.
 */
@Component({
  selector: 'table-passwords',
  styleUrls: ['table-passwords.css'],
  templateUrl: 'table-passwords.html',
})
export class TablePassword {
  displayedColumns=['title', 'username', 'url', 'tag'];
  dataSource: MatTableDataSource<PasswordData>;
  selectedChips: string[] = [];
  tags= ['University', 'Games', 'Streaming', 'Entertainment'];


  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor() {
    // Create 10 passwords
    const passwords: PasswordData[]=[];

    let passNetflix = {title: 'Netflix', username: 'mert', url: 'https://netflix.com', tag: 'Streaming'}
    let passAmazon = {title: 'Amazon', username: 'jakob', url: 'https://amazon.com', tag: 'Streaming'}
    let passCineplexx = {title: 'Cineplexx', username: 'jaypan', url: 'https://cineplexx.at', tag: 'Entertainment'}

    passwords.push(passNetflix)
    passwords.push(passAmazon)
    passwords.push(passCineplexx)

    // Assign the data to the data source for the table to render
    this.dataSource=new MatTableDataSource(passwords);

  }

  ngAfterViewInit() {
    this.dataSource.sort=this.sort;
  }

  applyFilter(event: KeyboardEvent) {

    if(event.target != null){
      const nTarget = event.target as HTMLInputElement;
      let filterValue = nTarget.value;
      filterValue=filterValue.trim(); // Remove whitespace
      filterValue=filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter=filterValue;
    }
  }

  changeSelected(chip: string){
    const index = this.selectedChips.indexOf(chip);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(chip);
    }

    console.log('this.selecteChips:' + this.selectedChips)
    this.filterByTags()
  }

  filterByTags() {
    this.dataSource.filterPredicate = this.getFilterPredicate();
    this.dataSource.filter='empty';
  }
  getFilterPredicate(){
    console.log('Doing predicate..')
    return (data: PasswordData, filter: string) => {
      //TODO: consider filter:string as well
      const incl = this.selectedChips.includes(data.tag);
      return incl;
    }
  }
}

export interface PasswordData {
  title: string;
  username: string;
  url: string;
  tag: string
}


