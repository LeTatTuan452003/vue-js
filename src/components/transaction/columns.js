import { dateRangeFilterFn, formatCurrency, formatDate } from '@/lib/utils';
import { computed, h } from 'vue';

const columnsTransactions = [
  {
    accessorKey: 'transactionId',
    header: 'ID',
    enableSorting: true,
    columnClass: 'hidden-column',
    enableHiding: true
  },
  {
    accessorKey: 'originalTransactionId',
    header: 'Customer',
    enableSorting: true,
    enableGlobalFilter: true,
    colSpan: 4,
    footer: () => {
      return h('div', { class: 'flex justify-center text-xl' }, 'Total cost');
    }

  },
  {
    accessorKey: 'bundleId',
    header: 'Project',
    enableSorting: true,
    enableGlobalFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cellClass: 'hidden-column'
  },
  {
    accessorKey: 'storefront',
    header: 'Store',
    enableSorting: true,
    enableGlobalFilter: true,
    cellClass: 'hidden-column'
  },
  {
    accessorKey: 'productId',
    header: 'Product',
    enableSorting: true,
    enableGlobalFilter: true,
    cellClass: 'hidden-column'
  },
  {
    accessorKey: 'totalCost',
    header: 'Revenue',
    cell: (info) => {
      return h('p', { class: 'flex justify-end' }, formatCurrency(info.getValue()));
    },
    enableSorting: true,
    footer: info => {
      const totalByPage = computed(() => info.table.getRowModel().rows.reduce((total, row) => total + (row.original.totalCost), 0));
      const totalAllPage = computed(() => info.table.getFilteredRowModel().rows.reduce((total, row) => total + (row.original.totalCost), 0));
      return h('div', { class: 'flex flex-col' }, [
        h('div', { class: 'flex flex-row gap-5' }, [
          h('p', { class: 'w-max' }, 'One page'),
          h('p', { class: 'flex w-max text-currency-primary justify-end font-light ml-auto' }, formatCurrency(totalByPage.value))
        ]),
        h('div', { class: 'flex flex-row gap-7' }, [
          h('p', { class: 'w-max' }, 'All page'),
          h('p', { class: 'flex w-max text-currency-primary justify-end font-light ml-auto' }, formatCurrency(totalAllPage.value))
        ])
      ]);
    }
  },
  {
    accessorKey: 'offerType',
    header: 'Free Trial',
    enableSorting: true,
    enableGlobalFilter: false,
    colSpan: 4,
    cell: (info) =>
      h('input', {
        type: 'checkbox',
        checked: info.getValue() === 1,
        disabled: true
      })
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Purchase Date',
    cell: (info) => formatDate(new Date(info.getValue())),
    enableSorting: true,
    enableGlobalFilter: false,
    meta: { filterVariant: 'range' },
    filterFn: dateRangeFilterFn,
    cellClass: 'hidden-column'
  },
  {
    accessorKey: 'expiresDate',
    header: 'Expiration Date',
    cell: (info) => {
      if (info.getValue()) {
        return formatDate(new Date(info.getValue()));
      }
      return 'Unlimited time';
    },
    enableSorting: true,
    enableGlobalFilter: false,
    cellClass: 'hidden-column'
  },
  {
    accessorKey: 'type',
    header: 'Renewal',
    cellClass: 'hidden-column'
  }
];

export default columnsTransactions;
