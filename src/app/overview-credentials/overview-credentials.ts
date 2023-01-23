import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Credential } from '../@types/Credential';
import { FileSystemService } from '../filesystem.service';


@Component({
  selector: 'overview-credentials',
  styleUrls: ['overview-credentials.css'],
  templateUrl: 'overview-credentials.html'
})
export class OverviewCredentials {
  displayedColumns = ['title', 'username', 'url', 'tags'];
  dataSource: MatTableDataSource<Credential>;
  selectedChips: string[] = [];
  availableTags: string[] = []
  currSearchFilter: string = '';

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private fsService: FileSystemService, private router: Router) {
    const credentials: Credential[] = []
    this.dataSource = new MatTableDataSource(credentials);
    this.dataSource.filterPredicate = this.getFilterPredicate();
    this.loadCredentials();

  }



  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: KeyboardEvent) {

    if (event.target != null) {
      const nTarget = event.target as HTMLInputElement;
      this.currSearchFilter = nTarget.value;
      this.filterByStringAndTag();
    }
  }

  changeSelected(chip: string) {
    const index = this.selectedChips.indexOf(chip);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(chip);
    }
    this.filterByStringAndTag()
  }

  filterByStringAndTag() {
    if (this.currSearchFilter === '') {
      this.dataSource.filter = 'empty'
    } else {
      this.dataSource.filter = this.currSearchFilter
    }
  }
  getFilterPredicate() {
    return (data: Credential, filter: string) => {

      //if no term inserted
      if (filter === 'empty') {
        if (this.selectedChips.length === 0) return true;
        return checkForTags(this.selectedChips, data.tags)
      }

      const matchFilter = []

      const colTitle = data.title;
      const colUsername = data.username;
      const colUrl = data.url;

      const matchTitle = colTitle.toLowerCase().startsWith(filter.toLowerCase())
      const matchUsername = colUsername.toLowerCase().startsWith(filter.toLowerCase())
      const matchUrl = colUrl.toLowerCase().startsWith(filter.toLowerCase())

      matchFilter.push(matchTitle, matchUsername, matchUrl);
      const matchStrings = matchFilter.some((el) => el == true);

      //if key term but no tags
      if (this.selectedChips.length === 0) {
        return matchStrings
      }
      return checkForTags(this.selectedChips, data.tags) && matchStrings;
    }
  }

  loadCredentials() {
    this.fsService.loadCrendentials().then((data: Credential[]) => {
      this.availableTags = Array.from(extractTags(data));
      this.dataSource.data = data;
    })
  }

  showCreateForm() {
    this.router.navigate(['/create-credential'], {
      state: { data: { tags: this.availableTags } }
    });
  }

  editCred(row: Credential) {
    this.router.navigate(['/edit-credential'], {
      state:
      {
        data: { id: row.id, title: row.title, username: row.username, url: row.url, tags: row.tags, avTags: this.availableTags }
      }
    });
  }


}

function checkForTags(selectedChips: string[], credTags: string[]) {
  const hasTag = credTags.some(t => selectedChips.includes(t))
  return hasTag
}

function extractTags(data: Credential[]): Set<string> {
  let setOfTags = new Set<string>();
  Array.prototype.forEach.call(data, cred => {
    for (let i = 0; i < cred.tags.length; i++) {
      setOfTags.add(cred.tags[i])
    }
  })
  return setOfTags
}



