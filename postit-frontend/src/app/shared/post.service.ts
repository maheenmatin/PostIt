import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PostModel } from "./post-model";
import { lastValueFrom, Observable } from "rxjs";
import { CreatePostPayload } from "../post/create-post/create-post.payload";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>("http://localhost:8080/api/posts");
  }

  async getAllPostsAsync(): Promise<PostModel[]> {
    return await lastValueFrom(this.getAllPosts());
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post("http://localhost:8080/api/posts", postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>("http://localhost:8080/api/posts/" + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>("http://localhost:8080/api/posts?username" + name);
  }

  getAllPostsBySubreddit(subreddit: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>("http://localhost:8080/api/posts?subreddit" + subreddit);
  }
}
