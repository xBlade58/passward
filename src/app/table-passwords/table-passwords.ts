import { Component, ViewChild} from '@angular/core';

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
  displayedColumns=['title', 'username', 'url'];
  dataSource: MatTableDataSource<PasswordData>;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor() {
    // Create 10 passwords
    const passwords: PasswordData[]=[];

    let passNetflix = {title: 'Netflix', username: 'mert', url: 'https://netflix.com'}
    passwords.push(passNetflix)

    // Assign the data to the data source for the table to render
    this.dataSource=new MatTableDataSource(passwords);
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort=this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue=filterValue.trim(); // Remove whitespace
    filterValue=filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter=filterValue;
  }
}



export interface PasswordData {
  title: string;
  username: string;
  url: string
}
