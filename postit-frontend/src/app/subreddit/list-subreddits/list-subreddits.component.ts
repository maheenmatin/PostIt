import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-subreddits',
  standalone: true,
  imports: [SideBarComponent, RouterLink, CommonModule],
  templateUrl: './list-subreddits.component.html',
  styleUrl: './list-subreddits.component.css'
})
export class ListSubredditsComponent implements OnInit {
  subreddits!: Array<SubredditModel>;
  constructor(private subredditService: SubredditService) { }
  
  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    })
  }

  filterSubreddit(name: string | undefined): void {
    if (name) {
      this.subredditService.setSelectedSubreddit(name);
    }
  }
}
