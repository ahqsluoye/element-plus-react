interface User {
    id: number | string;
    date: string;
    name: string;
    hasChildren?: boolean;
    children?: User[];
    address: string;
}

export const tableData: User[] = [
    {
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
        children: [
            {
                id: 32,
                date: '2018-07-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St, Los Angeles',
                children: [
                    {
                        id: 4,
                        date: '2016-05-03',
                        name: 'wangxiaohu',
                        address: 'No. 189, Grove St, Los Angeles',
                        children: [
                            {
                                id: 51,
                                date: '2019-08-01',
                                name: 'wangxiaohu',
                                address: 'No. 189, Grove St, Los Angeles',
                            },
                            {
                                id: 52,
                                date: '2020-09-01',
                                name: 'wangxiaohu',
                                address: 'No. 189, Grove St, Los Angeles',
                            },
                        ],
                    },
                    {
                        id: 41,
                        date: '2019-08-01',
                        name: 'wangxiaohu',
                        address: 'No. 189, Grove St, Los Angeles',
                    },
                    {
                        id: 42,
                        date: '2020-09-01',
                        name: 'wangxiaohu',
                        address: 'No. 189, Grove St, Los Angeles',
                    },
                ],
            },
            {
                id: 31,
                date: '2017-06-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ],
    },

    {
        id: 5,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
];

export const tableData1: User[] = [
    {
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        hasChildren: true,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
];
