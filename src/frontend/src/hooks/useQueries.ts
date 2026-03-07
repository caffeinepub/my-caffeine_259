import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExternalBlob } from "../backend";
import type { AdmissionEntry, CampInfo } from "../backend.d";
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

export function useSubmitAdmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      address,
      contact,
      email,
      dateOfBirth,
      idProof,
      idProofFileUrl,
    }: {
      name: string;
      address: string;
      contact: string;
      email: string;
      dateOfBirth: string;
      idProof: string;
      idProofFileUrl: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitAdmission(
        name,
        address,
        contact,
        email,
        dateOfBirth,
        idProof,
        idProofFileUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admissions"] });
      queryClient.invalidateQueries({ queryKey: ["admissionCount"] });
    },
  });
}

export function useGetAllAdmissions(username: string, password: string) {
  const { actor } = useActor();
  return useQuery<AdmissionEntry[]>({
    queryKey: ["admissions", username, password],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAdmissions(username, password);
    },
    enabled: false,
    retry: false,
  });
}

export function useGetAdmissionCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["admissionCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getAdmissionCount();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1000,
  });
}
