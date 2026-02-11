/**
 * GitHub DTOs (Data Transfer Objects)
 * Public types exposed to the UI layer
 */

export interface RepoDto {
  id: string;
  name: string;
  description: string | null;
  language: string | null;
  starCount: number;
  updatedAt: string;
  htmlUrl: string;
}

export type ActivityEventType = "push" | "pr" | "create" | "issue" | "other";

export interface ActivityDto {
  id: string;
  type: ActivityEventType;
  repoName: string;
  title: string;
  createdAt: string;
}
