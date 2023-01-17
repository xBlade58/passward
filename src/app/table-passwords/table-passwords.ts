import { Component, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Password } from '../create-credential/Password';
import { FileSystemService } from '../filesystem.service';
const electron =(<any>window).require('electron');


@Component({
  selector: 'table-passwords',
  styleUrls: ['table-passwords.css'],
  templateUrl: 'table-passwords.html'
})
export class TablePassword {
  displayedColumns=['title', 'username', 'url', 'tag'];
  dataSource: MatTableDataSource<Password>;
  selectedChips: string[] = [];
  tags= ['music', 'Games', 'Streaming', 'Entertainment'];
  currView: string = 'main';
  isMain: boolean = true
  currSearchFilter: string = '';

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;



  constructor(private fsService: FileSystemService, private router: Router) {
    const passwords: Password[] = []
    this.dataSource=new MatTableDataSource(passwords);
    this.loadCredentials();

  }

  ngOnInit() {
    this.dataSource.filterPredicate = this.getFilterPredicate();
    electron.ipcRenderer.on('storage:passwordSaved', () => {
      this.loadCredentials();
      //this.showMain();
    })
    electron.ipcRenderer.on('storage:passwordEdited', () => {
      this.loadCredentials();
      //this.showMain();
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort=this.sort;
  }

  applyFilter(event: KeyboardEvent) {

    if(event.target != null){
      const nTarget = event.target as HTMLInputElement;
      this.currSearchFilter= nTarget.value;
      this.dataSource.filter = this.currSearchFilter.trim().toLowerCase();
      //this.filterByTags();
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
    //this.filterByTags()
    this.dataSource.filter = this.currSearchFilter.trim().toLowerCase();

  }

  filterByTags() {
    this.dataSource.filterPredicate = this.getFilterPredicate();
    this.dataSource.filter=this.currSearchFilter;
  }
  getFilterPredicate(){
    console.log('Doing predicate..')
    return (data: Password, filter: string) => {

      const matchFilter = []
      let isChipTag = false
      if(this.selectedChips.length != 0){
        //isChipTag = this.selectedChips.includes(data.tag);
        //isChipTag = false
      }


      const colTitle = data.title;
      const colUsername = data.username;
      const colUrl = data.url;

      const matchTitle = colTitle.toLowerCase().includes(filter)
      const matchUsername = colUsername.toLowerCase().includes(filter)
      const matchUrl = colUrl.toLowerCase().includes(filter)

      matchFilter.push(matchTitle, matchUsername, matchUrl);

      return isChipTag && matchFilter.some((el)=> el == true);
    }
  }

  loadCredentials() {
    this.fsService.loadCrendentials().subscribe((data: Password[]) => {
      console.log("Got in table-passwords: " + data)
      this.dataSource.data = data;
    })
  }

  showCreateForm() {
    this.router.navigate(['/create-credential']);
  }

  editCred(row: Password){
    console.log("Row Username: " + row.username)
      this.router.navigate(['/edit-credential'], {state:
        {data: {id: row.id, title: row.title, username: row.username, url: row.url, tag: row.tag}
      }});
  }


}
