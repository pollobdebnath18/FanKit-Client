import { useQuery } from "@tanstack/react-query";
import { AddressesAPI, type AddressesResponse } from "../api/addresses.api";

export const useAddresses = (enabled = true) => {
  return useQuery<AddressesResponse>({
    queryKey: ["addresses"],
    queryFn: AddressesAPI.getMine,
    enabled,
  });
};
