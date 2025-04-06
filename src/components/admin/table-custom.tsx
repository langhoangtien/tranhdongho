import { ChevronDown } from "lucide-react";
import { TableHead } from "../ui/table";

interface SortableHeaderProps {
  field: string;
  label: string;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  field,
  label,
  sortField,
  sortOrder,
  onSort,
}) => {
  const isActive = sortField === field;

  return (
    <TableHead onClick={() => onSort(field)}>
      <span className="w-full flex items-center justify-start cursor-pointer space-x-2">
        <span>{label}</span>
        <span
          className={`transition-transform duration-200 ${
            isActive
              ? sortOrder === "asc"
                ? "rotate-180"
                : "rotate-0"
              : "opacity-50"
          }`}
        >
          <ChevronDown size={16} className="text-primary" />
        </span>
      </span>
    </TableHead>
  );
};
