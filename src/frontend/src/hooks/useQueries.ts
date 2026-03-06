import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CampInfo } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllCamps() {
  const { actor, isFetching } = useActor();
  return useQuery<CampInfo[]>({
    queryKey: ["camps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCamps();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddCamp() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      location,
      timing,
      instructor,
    }: {
      name: string;
      location: string;
      timing: string;
      instructor: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addCamp(name, location, timing, instructor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["camps"] });
    },
  });
}
