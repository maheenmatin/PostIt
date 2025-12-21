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

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(API_ENDPOINTS.posts);
  }

  async getAllPostsAsync(): Promise<PostModel[]> {
    return await lastValueFrom(this.getAllPosts());
  }

  createPost(postPayload: CreatePostPayload): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.posts, postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${API_ENDPOINTS.posts}/${id}`);
  }

  getPostsByUser(username: string): Observable<PostModel[]> {
    const params = new HttpParams().set("username", username);
    return this.http.get<PostModel[]>(API_ENDPOINTS.posts, { params });
  }

  getPostsByCommunity(communityId: number): Observable<PostModel[]> {
    const params = new HttpParams().set("communityId", communityId);
    return this.http.get<PostModel[]>(API_ENDPOINTS.posts, { params });
  }
}
