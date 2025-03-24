'use client'

import { useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { Announcement } from '@/types/index'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MoreHorizontal, Loader2 } from 'lucide-react'

interface CustomColumnMeta {
  sortIcon?: boolean
}

export const columns: ColumnDef<Announcement, any>[] = [
  {
    header: 'ID',
    accessorKey: 'id'
  },
  {
    header: 'Marca',
    accessorKey: 'make',
    enableColumnFilter: false,
    enableSorting: true,
    meta: {
      sortIcon: true,
    } as CustomColumnMeta,
  },
  {
    header: 'Modelo',
    accessorKey: 'model',
    enableColumnFilter: false
  },
  {
    header: 'Versión',
    accessorKey: 'trim'
  },
  {
    header: 'Precio',
    accessorKey: 'salePriceGross',
    enableSorting: true,
    meta: {
      sortIcon: true,
    } as CustomColumnMeta,
    cell: ({ getValue }) => {
      const price = getValue<number>()
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(price)
    }
  },
  {
    header: 'Fecha de registro',
    accessorKey: 'firstRegistrationDate'
  },
  {
    header: 'Kilometraje',
    accessorKey: 'mileage',
    cell: ({ getValue }) => {
      const mileage = getValue<number>()
      return new Intl.NumberFormat('es-ES').format(mileage)
    }
  },
  {
    header: 'Caja de cambios',
    accessorKey: 'gearbox'
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [open, setOpen] = useState(false)
      const [isLoading, setIsLoading] = useState(true)
      const { id, model, make, trim, mainImage } = row.original

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                disabled={!mainImage}
                onClick={() => {
                  setIsLoading(true)
                  setOpen(true)
                }}>
                Ver imagen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Modal con Suspense */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader style={{ textAlign: 'start' }}>
                <DialogTitle>{make} {model} (ID: {id})</DialogTitle>
              </DialogHeader>
              <p>{trim}</p>
              {isLoading && (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                  <span className="ml-2 text-gray-500">Cargando imagen...</span>
                </div>
              )}
              <img
                src={mainImage}
                alt={`Coche ID ${id}`}
                className={`w-full h-auto rounded-md ${isLoading ? 'hidden' : 'block'}`}
                onLoad={() => setIsLoading(false)}
              />
            </DialogContent>
          </Dialog>
        </>
      )
    },
  }
]