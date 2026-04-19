"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  page: number;
  totalPages: number;
  limit: number;
};

export default function GlobalPagination({
  page,
  totalPages,
  limit,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(page,totalPages,limit)

  // 👉 PAGE CHANGE
  const handlePageChange = (type: "next" | "prev") => {
    const params = new URLSearchParams(searchParams.toString());

    let newPage = page;

    if (type === "next" && page < totalPages) {
      newPage = page + 1;
    }

    if (type === "prev" && page > 1) {
      newPage = page - 1;
    }
    console.log(newPage)

    params.set("page", String(newPage));

    router.push(`?${params.toString()}`);
  };

  // 👉 LIMIT CHANGE
  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", value);
    params.set("page", "1"); // reset page

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* LIMIT */}
      <Field
        orientation="horizontal"
        className="w-fit items-center gap-2 px-3 py-1.5 rounded-xl border border-black/10 bg-white/70 backdrop-blur-sm shadow-sm"
      >
        <FieldLabel
          htmlFor="select-rows-per-page"
          className="text-xs font-black uppercase tracking-widest text-black/50"
        >
          Rows
        </FieldLabel>

        <Select value={String(limit)} onValueChange={handleLimitChange}>
          <SelectTrigger
            id="select-rows-per-page"
            className="h-7 w-[70px] text-xs rounded-lg border border-black/10 bg-white shadow-sm focus:ring-1 focus:ring-black text-black"
          >
            <SelectValue placeholder="10" />
          </SelectTrigger>

          <SelectContent align="end" className="rounded-xl text-xs bg-white border border-black/10 shadow-xl">
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {/* PAGINATION */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/10 bg-white/70 backdrop-blur-sm shadow-sm">

          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange("prev")}
              className={`h-7 px-2 text-xs rounded-lg font-black transition-all border-0 ${page === 1
                  ? "pointer-events-none opacity-30 text-black/40"
                  : "cursor-pointer text-black hover:bg-black hover:text-white"
                }`}
            />
          </PaginationItem>

          <span className="px-3 py-0.5 text-xs font-black text-black bg-black/5 rounded-lg">
            {page} / {totalPages}
          </span>

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange("next")}
              className={`h-7 px-2 text-xs rounded-lg font-black transition-all border-0 ${page === totalPages
                  ? "pointer-events-none opacity-30 text-black/40"
                  : "cursor-pointer text-black hover:bg-black hover:text-white"
                }`}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  );
}