import { dateRangeFilterFn, formatDate, objectFilterFn } from '@/lib/utils';
import { h } from 'vue';
import ActionCell from '@/components/commons/ActionCell.vue';
import MultiSelect from '@/components/form/MultiSelect.vue';

const getColumnsUser = (showUpdateUser, showDeleteUser) => {
    return [
        {
            accessorKey: 'user',
            header: 'USER',
            enableSorting: true,
            enableGlobalFilter: true,
            cell: (info) => h('div', { class: 'flex flex-col' }, [
                h('p', {}, info.getValue().name),
                h('p', {}, info.getValue().email)
            ]),
            filterFn: objectFilterFn,
        },
        {
            accessorKey: 'roles',
            header: 'ROLES',
            enableSorting: true,
            enableGlobalFilter: true,
            cell: (info) => {
                return h(MultiSelect,
                    {
                        options: info.getValue(),
                        modelValue: info.getValue().map(item => item.name),
                        placeholder: 'Role',
                        isSelect: false
                    }
                );
            }
            ,
        },
        {
            accessorKey: 'projects',
            header: 'PROJECTS',
            enableSorting: true,
            cell: (info) => {
                if (!Array.isArray(info.getValue()) || !info.getValue()[0])
                    return 'No projects';
                return h(MultiSelect,
                    {
                        options: info.getValue(),
                        modelValue: info.getValue().map(item => item.name),
                        placeholder: 'Project',
                        isSelect: false
                    }
                );
            }
            ,
        },
        {
            accessorKey: 'createdAt',
            header: 'JOIN DATE',
            enableSorting: true,
            enableGlobalFilter: true,
            cell: (info) => formatDate(new Date(info.getValue())).slice(0, 10),
            filterFn: dateRangeFilterFn,
        },
        {
            accessorKey: '_id',
            header: 'ACTIONS',
            cell: (info) => {
                return h(ActionCell,
                    {
                        value: info.getValue(),
                        onUpdate: showUpdateUser,
                        onDelete: showDeleteUser,
                    }
                );
            },
            enableGlobalFilter: true,
        },
    ];
};
export default getColumnsUser;
