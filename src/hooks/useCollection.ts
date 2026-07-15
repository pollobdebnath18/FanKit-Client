import { useQuery } from "@tanstack/react-query";
import { CollectionAPI, type CollectionFilters } from "../api/collection.api";

export const useCollection = (filters: CollectionFilters) => {
  return useQuery({
    queryKey: ["collections", filters],
    queryFn: () => CollectionAPI.getAllCollection(filters),
  });
};
