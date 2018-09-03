export default [{
    name: '新闻管理',
    icon: 'icon-xinwen',
    children: [{
        name: '新建新闻内容',
        router: {
            name: 'nadd',
            params: {
                id: 0,
                type: 'add'
            }
        }
    }, {
        name: '新闻内容管理',
        router: {
            name: 'nlist'
        },
        child: [{
            name: '已发布',
            router: {
                name: '/news/nlist/publish'
            }
        }, {
            name: '草稿箱',
            router: {
                name: '/news/nlist/drafts'
            }
        }]
    }, {
        name: '新闻中心配置',
        router: {
            name: 'nconfig'
        }
    }]
}]