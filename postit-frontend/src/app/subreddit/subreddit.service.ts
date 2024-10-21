import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubredditModel } from './subreddit-response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  private selectedSubreddit : string | undefined;

  constructor(private http: HttpClient) {
    this.selectedSubreddit = localStorage.getItem('selectedSubreddit') || undefined;
  }

  setSelectedSubreddit(subreddit: string | undefined) {
    this.selectedSubreddit = subreddit;
    if (subreddit) {
      localStorage.setItem('selectedSubreddit', subreddit);
    } else {
      localStorage.removeItem('selectedSubreddit');
    }
    console.log(this.selectedSubreddit);
  }

  getSelectedSubreddit(): string | undefined {
    return this.selectedSubreddit;
  }
  
  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit');
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>('http://localhost:8080/api/subreddit',
      subredditModel);
  }
}
