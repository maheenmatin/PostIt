import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../shared/api.constants";
import { CommentPayload } from "./comment.payload";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${API_ENDPOINTS.comments}/by-post/${postId}`);
  }

  postComment(commentPayload: CommentPayload): Observable<void> {
    return this.httpClient.post<void>(API_ENDPOINTS.comments, commentPayload);
  }

  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${API_ENDPOINTS.comments}/by-user/${name}`);
  }
}
