import { createContext, useContext, useState, useCallback } from "react";
import { PagedResponse } from "./types/responses/PagedResponse";
import useGetRequest from "./hooks/useGetRequest";

// Define the structure of queryParams
type QueryParams = {
  page: number;
  size: number;
  sortBy: string;
  sortDir: "asc" | "desc";
};

type DataTableContextType<T> = {
  data: T[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  updateQueryParams: (newParams: Partial<QueryParams>) => void;  // Use QueryParams type here
};

const DataTableContext = createContext<DataTableContextType<any> | null>(null);

export const useDataTable = <T,>() => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context as DataTableContextType<T>;
};

export const DataTableProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize queryParams with correct type
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    size: 20,
    sortBy: "id",
    sortDir: "asc",
  });

  // Use the queryParams with the `useGetRequest` hook
  const { data, isLoading, error, refetch: innerRefetch } = useGetRequest<PagedResponse<any>>("items/paged", queryParams);

  const refetch = useCallback(() => {
    innerRefetch(); // Trigger data refetch with updated queryParams
  }, [queryParams]);

  const updateQueryParams = (newParams: Partial<QueryParams>) => {
    setQueryParams(prevParams => ({
      ...prevParams,
      ...newParams,
    }));
  };

  return (
    <DataTableContext.Provider value={{ data: data?.content || [], isLoading, error, refetch, updateQueryParams }}>
      {children}
    </DataTableContext.Provider>
  );
};
