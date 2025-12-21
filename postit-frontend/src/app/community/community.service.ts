import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../shared/api.constants";
import { CommunityModel } from "./community.model";

@Injectable({
  providedIn: "root",
})
export class CommunityService {
  private selectedCommunity?: string;

  constructor(private http: HttpClient) {
    // Persist the selection so the home feed can filter consistently.
    this.selectedCommunity = localStorage.getItem("selectedCommunity") || undefined;
  }

  // Store/remove the selected community name for filtering.
  setSelectedCommunity(community: string | undefined) {
    this.selectedCommunity = community;
    if (community) {
      localStorage.setItem("selectedCommunity", community);
      return;
    }

    localStorage.removeItem("selectedCommunity");
  }

  getSelectedCommunity(): string | undefined {
    return this.selectedCommunity;
  }

  // Fetch all communities for lists and sidebars.
  getAllCommunities(): Observable<Array<CommunityModel>> {
    return this.http.get<Array<CommunityModel>>(API_ENDPOINTS.community);
  }

  // Create a community from the form data.
  createCommunity(community: CommunityModel): Observable<CommunityModel> {
    return this.http.post<CommunityModel>(API_ENDPOINTS.community, community);
  }

  // Fetch a single community by id for the detail page.
  getCommunity(id: number): Observable<CommunityModel> {
    return this.http.get<CommunityModel>(`${API_ENDPOINTS.community}/${id}`);
  }
}
