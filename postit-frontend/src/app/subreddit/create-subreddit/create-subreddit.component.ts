import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { SubredditModel } from "../subreddit-response";
import { Router } from "@angular/router";
import { SubredditService } from "../subreddit.service";
import { throwError } from "rxjs";

@Component({
  selector: "app-create-subreddit",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./create-subreddit.component.html",
  styleUrl: "./create-subreddit.component.css",
})
export class CreateSubredditComponent {
  createSubredditForm!: FormGroup;
  subredditModel!: SubredditModel;
  title = new FormControl("");
  description = new FormControl("");

  constructor(private router: Router, private subredditService: SubredditService) {
    this.createSubredditForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
    });
    this.subredditModel = {
      name: "",
      description: "",
    };
  }

  discard() {
    this.router.navigateByUrl("/");
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get("title")!.value;
    this.subredditModel.description = this.createSubredditForm.get("description")!.value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe(
      (data) => {
        this.router.navigateByUrl("/list-subreddits");
      },
      (error) => {
        throwError(error);
      }
    );
  }
}
