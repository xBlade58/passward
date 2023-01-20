import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Password } from '../create-credential/Password';
import { FileSystemService } from '../filesystem.service';


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
    this.dataSource.filterPredicate = this.getFilterPredicate();
    this.loadCredentials();

  }



  ngAfterViewInit() {
    this.dataSource.sort=this.sort;
  }

  applyFilter(event: KeyboardEvent) {

    if(event.target != null){
      const nTarget = event.target as HTMLInputElement;
      this.currSearchFilter= nTarget.value;
      this.filterByStringAndTag();
    }
  }

  changeSelected(chip: string){
    const index = this.selectedChips.indexOf(chip);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(chip);
    }
    this.filterByStringAndTag()
  }

  filterByStringAndTag() {
    if(this.currSearchFilter === '') {
        this.dataSource.filter = 'empty'
    } else {
      this.dataSource.filter = this.currSearchFilter
    }
  }
  getFilterPredicate(){
    return (data: Password, filter: string) => {
      
      //if no term inserted
      if(filter === 'empty'){
        if(this.selectedChips.length === 0) return true;
        return checkForTags(this.selectedChips, data.tag)
      }

      const matchFilter = []

      const colTitle = data.title;
      const colUsername = data.username;
      const colUrl = data.url;

      const matchTitle = colTitle.toLowerCase().startsWith(filter.toLowerCase())
      const matchUsername = colUsername.toLowerCase().startsWith(filter.toLowerCase())
      const matchUrl = colUrl.toLowerCase().startsWith(filter.toLowerCase())

      matchFilter.push(matchTitle, matchUsername, matchUrl);
      const matchStrings = matchFilter.some((el)=> el == true);

      //if key term but no tags
      if(this.selectedChips.length === 0) {
        return matchStrings
      }
      return checkForTags(this.selectedChips, data.tag) && matchStrings;
    }
  }

  loadCredentials() {
    this.fsService.loadCrendentials().then((data: Password[]) => {
      this.dataSource.data = data;
    })
  }

  showCreateForm() {
    this.router.navigate(['/create-credential']);
  }

  editCred(row: Password){
      this.router.navigate(['/edit-credential'], {state:
        {data: {id: row.id, title: row.title, username: row.username, url: row.url, tag: row.tag}
      }});
  }


}
function checkForTags(selectedChips: string[], tag: string) {
  return selectedChips.includes(tag)
}

