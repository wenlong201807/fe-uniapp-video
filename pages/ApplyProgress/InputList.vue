<template>
    <view class="input-list-wrap">
        <view class="one-line">
            <u-button
                :class="{ check: index === current }"
                v-for="(item, index) in buttonList"
                :key="index"
                @click="changeItem(index)"
                >{{ item }}</u-button
            >
        </view>
        <ft-cell-list :list="defaultList" ref="listChildrenRef"></ft-cell-list>
        <u-button @click="getChildrenData">getChildrenData</u-button>

        <!-- <ft-cell :list="list" ref="listRef"></ft-cell> -->
        <!-- <u-button @click="getData">getData</u-button> -->
    </view>
</template>

<script>
import ftCell from './components/ft-cell.vue'
import ftCellList from './components/ft-cell-list.vue'
export default {
    name: 'inputListWrap',
    components: {
        ftCell,
        ftCellList,
    },

    data() {
        return {
            current: 0,
            list: [
                {
                    title: '111',
                    value: 'sdfasdf',
                },
                {
                    title: '2222',
                    value: '222211',
                },
                {
                    title: '3333',
                    value: '33344',
                },
            ],
            buttonList: ['公司电话', '住宅电话', '其他电话'],
            listChildren: [
                {
                    title: '公司电话',
                    children: [
                        {
                            title: '区号',
                            value: '',
                            className: 'quhao',
                        },
                        {
                            title: '座机',
                            value: '',
                            className: 'zuoji',
                        },
                        {
                            title: '手机号码',
                            value: '',
                            className: 'phone',
                        },
                    ],
                },
                {
                    title: '住宅电话',
                    children: [
                        {
                            title: '区号',
                            value: '',
                            className: 'quhao',
                        },
                        {
                            title: '座机',
                            value: '',
                            className: 'zuoji',
                        },
                    ],
                },
                {
                    title: '其他电话',
                    children: [
                        {
                            title: '手机号码',
                            value: '',
                            className: 'phone',
                        },
                    ],
                },
            ],
            defaultList: [],
        }
    },
    mounted() {
        this.changeItem(0)
    },
    methods: {
        changeItem(index) {
            this.current = index
            this.defaultList = this.listChildren.filter((_, i) => i === index)
        },
        getData() {
            console.log(this.$refs.listRef.getList())
        },
        getChildrenData() {
            console.log(this.$refs.listChildrenRef.getList())
        },
    },
}
</script>

<style scoped>
.check {
    background-color: red;
}
.one-line {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /* border: 1px solid black; */
}
</style>
