import { GitHubRepository } from "../../repositories";
import type { GitHubEventResp } from "../../repositories";
import type { ActivityDto, ActivityEventType } from "./types";

/**
 * Maps GitHub event types to our simplified ActivityEventType
 */
const mapEventType = (type: string): ActivityEventType => {
  switch (type) {
    case "PushEvent":
      return "push";
    case "PullRequestEvent":
      return "pr";
    case "CreateEvent":
      return "create";
    case "IssuesEvent":
    case "IssueCommentEvent":
      return "issue";
    default:
      return "other";
  }
};

/**
 * Extracts a human-readable title from a GitHub event
 */
const extractEventTitle = (event: GitHubEventResp): string => {
  const { type, payload } = event;

  switch (type) {
    case "PushEvent": {
      const commitCount = payload.commits?.length ?? 0;
      const firstCommitMsg =
        payload.commits?.[0]?.message?.split("\n")[0] ?? "code changes";
      return commitCount > 1
        ? `${commitCount} commits: ${firstCommitMsg}`
        : firstCommitMsg;
    }
    case "PullRequestEvent":
      return `${payload.action ?? "updated"} PR: ${payload.pull_request?.title ?? "pull request"}`;
    case "CreateEvent":
      return `Created ${payload.ref_type ?? "ref"}: ${payload.ref ?? ""}`;
    case "IssuesEvent":
      return `${payload.action ?? "updated"} issue: ${payload.issue?.title ?? "issue"}`;
    case "IssueCommentEvent":
      return `Commented on: ${payload.issue?.title ?? "issue"}`;
    default:
      return type.replace("Event", "");
  }
};

/**
 * Get Activity Use Case
 * Fetches and transforms GitHub events into ActivityDTOs
 */
export const getActivityUsecase = async (
  username: string
): Promise<ActivityDto[]> => {
  const events = await GitHubRepository.getEvents(username);

  return events.map((event) => ({
    id: event.id,
    type: mapEventType(event.type),
    repoName: event.repo.name.split("/")[1] ?? event.repo.name,
    title: extractEventTitle(event),
    createdAt: event.created_at,
  }));
};
