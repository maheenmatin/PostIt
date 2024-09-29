import { Component, Input } from "@angular/core";
import { PostModel } from "../post-model";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { VoteButtonComponent } from "../vote-button/vote-button.component";

@Component({
  selector: 'app-post-tile',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, VoteButtonComponent],
  templateUrl: './post-tile.component.html',
  styleUrl: './post-tile.component.css'
})
export class PostTileComponent {
  faComments = faComments;
  @Input() posts!: PostModel[];

  constructor(private router: Router) { }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
