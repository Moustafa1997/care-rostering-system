import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { CreateGroupRequest } from "@/types/group";

interface GroupResponse {
  success: boolean;
  message: string;
  data?: any;
}

export function useCreateGroup() {
  const { success, error: showError } = useToast();

  const result = useApi<GroupResponse>("/groups/manager", {
    method: "POST",
    mutationOptions: {
      onSuccess: () => {
        success("Group created successfully");
      },
      onError: (error) => {
        console.error("Create group error:", error);
        showError("Failed to create group");
      }
    }
  }) as UseMutationResult<GroupResponse, any, CreateGroupRequest>;

  const createGroup = async (groupData: CreateGroupRequest) => {
    try {
      console.log("Creating group:", groupData);
      await result.mutateAsync(groupData);
      console.log("Create group completed");
    } catch (error) {
      console.error("Error in createGroup:", error);
      showError("Failed to create group");
      throw error;
    }
  };

  return {
    createGroup,
    isLoading: result.isPending,
    error: result.error
  };
}

export function useUpdateGroup() {
  const { success, error: showError } = useToast();
  const [endpoint, setEndpoint] = useState<string>("");

  const result = useApi<GroupResponse>(endpoint, {
    method: "PUT",
    mutationOptions: {
      onSuccess: () => {
        success("Group updated successfully");
      },
      onError: (error) => {
        console.error("Update group error:", error);
        showError("Failed to update group");
      }
    }
  }) as UseMutationResult<GroupResponse, any, CreateGroupRequest>;

  const updateGroup = async (
    groupId: string,
    groupData: CreateGroupRequest
  ) => {
    if (!groupId) {
      console.error("No group ID provided");
      return;
    }

    try {
      console.log("Updating group:", groupId, groupData);
      const updateEndpoint = `/groups/manager/${groupId}`;
      console.log("Setting endpoint to:", updateEndpoint);
      setEndpoint(updateEndpoint);
      // Wait for the endpoint to be set before mutating
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log("Calling mutate for group:", groupId);
      await result.mutateAsync(groupData);
      console.log("Update group mutation completed");
    } catch (error) {
      console.error("Error in updateGroup:", error);
      showError("Failed to update group");
      throw error;
    }
  };

  return {
    updateGroup,
    isLoading: result.isPending,
    error: result.error
  };
}

export function useDeleteGroup() {
  const { success, error: showError } = useToast();
  const [endpoint, setEndpoint] = useState<string>("");

  const result = useApi<GroupResponse>(endpoint, {
    method: "DELETE",
    mutationOptions: {
      onSuccess: () => {
        success("Group deleted successfully");
      },
      onError: (error) => {
        console.error("Delete group error:", error);
        showError("Failed to delete group");
      }
    }
  }) as UseMutationResult<GroupResponse, any, void>;

  const deleteGroup = async (groupId: string) => {
    if (!groupId) {
      console.error("No group ID provided");
      return;
    }

    try {
      console.log("Deleting group:", groupId);
      const deleteEndpoint = `/groups/manager/${groupId}`;
      console.log("Setting endpoint to:", deleteEndpoint);
      setEndpoint(deleteEndpoint);
      // Wait for the endpoint to be set before mutating
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log("Calling mutate for group:", groupId);
      await result.mutateAsync();
      console.log("Delete group mutation completed");
    } catch (error) {
      console.error("Error in deleteGroup:", error);
      showError("Failed to delete group");
      throw error;
    }
  };

  return {
    deleteGroup,
    isLoading: result.isPending,
    error: result.error
  };
}
