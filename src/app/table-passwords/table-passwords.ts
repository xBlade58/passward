import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, } from '@angular/core';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
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
  tags= ['University', 'Games', 'Streaming', 'Entertainment'];
  currView: string = 'main';
  isMain: boolean = true

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;



  constructor(private fsService: FileSystemService, private changeDetectorRef: ChangeDetectorRef) {
    const passwords: Password[] = []
    this.dataSource=new MatTableDataSource(passwords);
    this.loadCredentials();

  }

  ngOnInit() {
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

  showMain() {
    this.isMain = true;
    this.currView = 'main'
  }

  loadCredentials() {
    this.fsService.loadCrendentials().subscribe((data: Password[]) => {
      console.log("Got in table-passwords: " + data)
      this.dataSource.data = data;
    })
  }

  showCreateForm() {
    this.currView = 'create'
    this.isMain = false

  }

  editCred(row: Password){
    console.log("Row id: " + row.id)
    this.currView = 'edit'
    this.isMain = false
  }


}

export interface PasswordData {
  title: string;
  username: string;
  url: string;
  tag: string
}


