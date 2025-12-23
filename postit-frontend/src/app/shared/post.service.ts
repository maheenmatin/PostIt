import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { lastValueFrom, Observable } from "rxjs";
import { PostModel } from "./post-model";
import { CreatePostPayload } from "../post/create-post/create-post.payload";
import { API_ENDPOINTS } from "./api.constants";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private http: HttpClient) {}

  // Fetch the full feed of posts.
  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(API_ENDPOINTS.posts);
  }

  // Convenience wrapper for async/await use cases in components.
  async getAllPostsAsync(): Promise<PostModel[]> {
    return await lastValueFrom(this.getAllPosts());
  }

  // Create a new post within a community.
  createPost(postPayload: CreatePostPayload): Observable<PostModel> {
    return this.http.post<PostModel>(API_ENDPOINTS.posts, postPayload);
  }

  // Load a single post for the detail view.
  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${API_ENDPOINTS.posts}/${id}`);
  }

  // Filter posts by username (backend expects ?username=...).
  getPostsByUser(username: string): Observable<PostModel[]> {
    const params = new HttpParams().set("username", username);
    return this.http.get<PostModel[]>(API_ENDPOINTS.posts, { params });
  }

  // Filter posts by community (backend expects ?communityId=...).
  getPostsByCommunity(communityId: number): Observable<PostModel[]> {
    const params = new HttpParams().set("communityId", communityId);
    return this.http.get<PostModel[]>(API_ENDPOINTS.posts, { params });
  }
}
