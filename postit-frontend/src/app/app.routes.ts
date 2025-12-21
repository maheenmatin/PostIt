import { Routes } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home.component";
import { CreatePostComponent } from "./post/create-post/create-post.component";
import { CreateCommunityComponent } from "./community/create-community/create-community.component";
import { ListCommunitiesComponent } from "./community/list-communities/list-communities.component";
import { ViewCommunityComponent } from "./community/view-community/view-community.component";
import { ViewPostComponent } from "./post/view-post/view-post.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "view-post/:id", component: ViewPostComponent },
  { path: "user-profile/:name", component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: "list-communities", component: ListCommunitiesComponent },
  { path: "community/:id", component: ViewCommunityComponent },
  { path: "create-post", component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: "create-community", component: CreateCommunityComponent, canActivate: [AuthGuard] },
  { path: "sign-up", component: SignupComponent },
  { path: "login", component: LoginComponent },
];
