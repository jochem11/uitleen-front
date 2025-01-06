export type Column<T> = {
    key: keyof T | null;
    title: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    actions?: (row: T) => React.ReactNode;
  }