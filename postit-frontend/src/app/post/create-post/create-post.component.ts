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
    postName: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(255)],
    }),
    communityName: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  postPayload: CreatePostPayload = {
    postName: "",
    description: "",
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
    if (this.createPostForm.invalid) {
      this.createPostForm.markAllAsTouched();
      return;
    }

    const { postName, communityName, description } = this.createPostForm.getRawValue();

    this.postPayload = {
      postName,
      description,
      // communityName is required by your form, but optional in the payload type.
      // If you ever allow "no community selected", this prevents sending empty strings.
      ...(communityName ? { communityName } : {}),
    };

    this.postService.createPost(this.postPayload).subscribe({
      next: (post) => {
        // Navigate to the newly created post after successful creation.
        this.router.navigate(["/view-post", post.postId]);
      },
      error: (error) => console.error("Error creating post", error),
    });
  }

  discardPost() {
    this.router.navigateByUrl("/");
  }
}
