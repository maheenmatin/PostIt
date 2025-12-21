import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "./api.constants";
import { VotePayload } from "./vote-button/vote-payload";

@Injectable({
  providedIn: "root",
})
export class VoteService {
  constructor(private http: HttpClient) {}

  vote(votePayload: VotePayload): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.votes, votePayload);
  }
}
