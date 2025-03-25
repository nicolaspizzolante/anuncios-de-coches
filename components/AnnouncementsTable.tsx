"use client"

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState
} from "@tanstack/react-table"
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { columns } from './Columns'
import { Announcement, AnnouncementsTableProps } from '@/types/index'

export default function AnnouncementsTable({ data }: AnnouncementsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState<string>("")

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<Announcement>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const make = row.getValue("make")?.toString().toLowerCase() ?? ""
      const model = row.getValue("model")?.toString().toLowerCase() ?? ""
      const trim = row.getValue("trim")?.toString().toLowerCase() ?? ""
      const searchTerm = filterValue.toLowerCase()

      return (make.includes(searchTerm) || model.includes(searchTerm) || trim.includes(searchTerm))
    },
    initialState: { pagination: { pageSize: 10 } },
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const filteredRows = table.getFilteredRowModel().rows.length
  const maxRowsSeen = Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredRows)

  return (
    <div className="w-full">
      {/* Input para buscar por marca, modelo o versión */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por marca, modelo o versión"
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* La tabla */}
      <div className="overflow-x-auto">
        <div className="rounded-md border w-full">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                        {(header.column.columnDef.meta as { sortIcon?: boolean })?.sortIcon && (
                          <span className="inline-flex ml-1">
                            <ArrowUp
                              size={14}
                              className={header.column.getIsSorted() === 'asc' ? 'text-gray-800' : 'text-gray-300'}
                            />
                            <ArrowDown
                              size={14}
                              className={header.column.getIsSorted() === 'desc' ? 'text-gray-800' : 'text-gray-300'}
                              style={{ marginLeft: '-3px' }}
                            />
                          </span>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Contador de anuncios mostrados por pagina y botones Anterior y Siguiente*/}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {Math.min(maxRowsSeen, filteredRows)} de {filteredRows} anuncio(s)
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}