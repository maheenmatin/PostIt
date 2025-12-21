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
    this.selectedCommunity = localStorage.getItem("selectedCommunity") || undefined;
  }

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

  getAllCommunities(): Observable<Array<CommunityModel>> {
    return this.http.get<Array<CommunityModel>>(API_ENDPOINTS.community);
  }

  createCommunity(community: CommunityModel): Observable<CommunityModel> {
    return this.http.post<CommunityModel>(API_ENDPOINTS.community, community);
  }

  getCommunity(id: number): Observable<CommunityModel> {
    return this.http.get<CommunityModel>(`${API_ENDPOINTS.community}/${id}`);
  }
}
