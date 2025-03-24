export const columns = [
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
    },
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
    },
    cell: ({ getValue }) => {
      const price = getValue();
      return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
    }
  },
  {
    header: 'Fecha de registro',
    accessorKey: 'firstRegistrationDate'
  },
  {
    header: 'Kilometraje',
    accessorKey: 'mileage'
  },
  {
    header: 'Caja de cambios',
    accessorKey: 'gearbox'
  }
];