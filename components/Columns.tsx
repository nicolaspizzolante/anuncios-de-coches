import { ColumnDef } from "@tanstack/react-table"
import { Announcement } from '@/types/index'

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
  }
]