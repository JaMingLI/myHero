// Re-export React Query hooks for isolation
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

// Export query keys
export { QUERY_KEYS } from "./query-keys";
