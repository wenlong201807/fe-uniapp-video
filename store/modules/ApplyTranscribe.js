export default {
    namespaced: true,
    state: {
        count: 0,
        show: false,
        modalContentJSON: '',
        isShowModal: false,
        isChecked: true,
        isAllChecked: false,
        payTypeList: [
            {
                title: 'Section 1',
                content: 'This is the content for Section 1.',
                isExpand: false,
                children: [
                    {
                        isChecked: false,
                        name: '111',
                        content: 'asdfasdf',
                    },
                    {
                        isChecked: false,
                        name: '222',
                        content: 'asdfasdf',
                    },
                ],
            },
            {
                title: 'Section 2',
                content: `This is the content for Section 2This is the content for Section
                    2This is the content for Section 2This is the content for Section
                    2This is the content for Section 2This is the content for Section
                    2This is the content for Section 2This is the content for Section
                    2This is the content for Section 2This is the content for Section
                    2This is the content for Section 2This is the content for Section
                    2This is the content for Section 2This is the content for Section
                    2This is the content for Section 2.
                        `,
                isExpand: true,
                children: [
                    {
                        isChecked: false,
                        content: 'asdfasdf',
                    },
                    {
                        isChecked: false,
                        content: 'asdfasdf',
                    },
                    {
                        isChecked: false,
                        content: 'asdfasdf',
                    },
                ],
            },
            {
                title: 'Section 3',
                content: 'This is the content for Section 3.',
                isExpand: false,
                children: [
                    {
                        isChecked: false,
                        content: 'asdfasdf',
                    },
                    {
                        isChecked: false,
                        content: 'asdfasdf',
                    },
                    {
                        isChecked: false,
                        content: 'asdfasdf',
                    },
                ],
            },
        ],
    },
    mutations: {
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        },
        openModalMutation(state) {
            state.isShowModal = true
        },
        closeModalMutation(state) {
            state.isShowModal = false
        },
        handleChildCheckboxMutation(state, obj) {
            const { isChecked, index, indexParent, children } = obj
            console.log('vuex', obj)
            state.payTypeList[indexParent].children = children
            // state.payTypeList[indexParent].children[index].isChecked = isChecked
            console.log(state.payTypeList)
        },
        handleIsAllCheckedMutation(state, e) {
            state.isAllChecked = e

            state.payTypeList.forEach((item) => {
                item.isExpand = e
                item?.children.forEach((child) => {
                    child.isChecked = e
                })
            })
        },
        handleOtherMutation(state, { item, index }) {
            state.isShowModal = true
            state.modalContentJSON = JSON.stringify(item)
        },
        handleBlueMutation(state, { indexBox, index, itemBox, item }) {
            state.isShowModal = true
            state.modalContentJSON = JSON.stringify(item)
        },
        handleAccordionChangeMutation(state, { e, index }) {
            // const { e, index } = obj
            state.payTypeList[index].isExpand = e

            // 更新二级选项
            if (e) {
                state.payTypeList[index].children.forEach((child) => {
                    child.isChecked = true
                })
            }

            let booleanTrueNumber = 0
            state.payTypeList.forEach((item) => {
                if (!item.isExpand) {
                    state.isAllChecked = false
                } else {
                    booleanTrueNumber += 1
                }
            })

            console.log('booleanTrueNumber', booleanTrueNumber)

            if (booleanTrueNumber === state.payTypeList.length) {
                state.isAllChecked = true
            }
        },
    },
    actions: {
        increment({ commit }) {
            commit('increment')
        },
        decrement({ commit }) {
            commit('decrement')
        },
        openModalAction({ commit }) {
            commit('openModal')
        },
        closeModalAction({ commit }) {
            commit('closeModal')
        },
    },
    // getters: {
    //     count(state) {
    //         return state.count
    //     },
    // },
}
