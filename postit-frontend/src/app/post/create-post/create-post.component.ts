import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { PostService } from "../../shared/post.service";
import { SubredditService } from "../../subreddit/subreddit.service";
import { SubredditModel } from "../../subreddit/subreddit-response";
import { CreatePostPayload } from "./create-post.payload";
import { EditorComponent, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-create-post",
  standalone: true,
  imports: [ReactiveFormsModule, EditorComponent, CommonModule],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js" }],
  templateUrl: "./create-post.component.html",
  styleUrl: "./create-post.component.css",
})
export class CreatePostComponent {
  createPostForm!: FormGroup;
  postPayload: CreatePostPayload;
  subreddits!: Array<SubredditModel>;

  init: EditorComponent["init"] = {
    license_key: "gpl",
    height: 500,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
    base_url: "/tinymce",
    suffix: ".min",
    branding: false,
  };

  constructor(private router: Router, private postService: PostService, private subredditService: SubredditService) {
    this.postPayload = {
      postName: "",
      url: "",
      description: "",
      subredditName: "",
    };
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl("", Validators.required),
      subredditName: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe(
      (data) => {
        this.subreddits = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get("postName")!.value;
    this.postPayload.subredditName = this.createPostForm.get("subredditName")!.value;
    this.postPayload.url = this.createPostForm.get("url")!.value;
    this.postPayload.description = this.createPostForm.get("description")!.value;

    this.postService.createPost(this.postPayload).subscribe(
      (data) => {
        this.router.navigateByUrl("/");
      },
      (error) => {
        throwError(error);
      }
    );
  }

  discardPost() {
    this.router.navigateByUrl("/");
  }
}
