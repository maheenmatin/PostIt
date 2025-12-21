import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EditorComponent, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { PostService } from "../../shared/post.service";
import { CommunityService } from "../../community/community.service";
import { CommunityModel } from "../../community/community.model";
import { CreatePostPayload } from "./create-post.payload";

@Component({
  selector: "app-create-post",
  standalone: true,
  imports: [ReactiveFormsModule, EditorComponent, CommonModule],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js" }],
  templateUrl: "./create-post.component.html",
  styleUrl: "./create-post.component.css",
})
export class CreatePostComponent {
  createPostForm = new FormGroup({
    postName: new FormControl("", Validators.required),
    communityName: new FormControl("", Validators.required),
    url: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
  });
  postPayload: CreatePostPayload = {
    postName: "",
    url: "",
    description: "",
    communityName: "",
  };
  communities: Array<CommunityModel> = [];

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
      "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
    base_url: "/tinymce",
    suffix: ".min",
    branding: false,
  };

  constructor(private router: Router, private postService: PostService, private communityService: CommunityService) {}

  ngOnInit() {
    // Populate the community dropdown for post creation.
    this.communityService.getAllCommunities().subscribe({
      next: (data) => {
        this.communities = data;
      },
      error: (error) => console.error("Error loading communities", error),
    });
  }

  createPost() {
    // Validate form fields before constructing payload.
    const { postName, communityName, url, description } = this.createPostForm.value;
    if (!postName || !communityName || !url || !description) {
      return;
    }

    this.postPayload = {
      postName,
      communityName,
      url,
      description,
    };

    this.postService.createPost(this.postPayload).subscribe({
      next: () => {
        // Return to the feed after successful creation.
        this.router.navigateByUrl("/");
      },
      error: (error) => console.error("Error creating post", error),
    });
  }

  discardPost() {
    this.router.navigateByUrl("/");
  }
}
