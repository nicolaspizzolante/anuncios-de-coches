"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  className?: string
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string
}

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  className?: string
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => {
    return (
      <div data-slot="table-container" className="relative w-full overflow-x-auto">
        <table
          ref={ref}
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    )
  }
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
)
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}