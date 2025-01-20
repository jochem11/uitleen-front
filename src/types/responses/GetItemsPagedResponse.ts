import { PagedResponse } from "./PagedResponse";

export type GetItemsPagedResponse = PagedResponse<GetItemsResponse>;

type GetItemsResponse = {
    id: number;
    name: string;
    description: string;
    caterogyId: number;
    itemStatusId: number;
  };
  