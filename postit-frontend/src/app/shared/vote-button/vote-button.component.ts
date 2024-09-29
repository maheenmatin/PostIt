import { Component, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-vote-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './vote-button.component.html',
  styleUrl: './vote-button.component.css'
})
export class VoteButtonComponent {
  @Input() post!: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor!: string;
  downvoteColor!: string;
  isLoggedIn!: boolean;

    constructor(
    private authService: AuthService,
    private postService: PostService, private toastr: ToastrService) {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }
}
