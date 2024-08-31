<template>
    <view class="input-list-wrap">
        <view>asdfasdasdag</view>
        <ft-cell :list="list" ref="listRef"></ft-cell>
        <view>asfdasdsadf======</view>
        <u-button @click="getData">getData</u-button>
    </view>
</template>

<script>
import ftCell from './components/ft-cell.vue'
export default {
    name: 'inputListWrap',
    components: {
        ftCell,
    },

    data() {
        return {
            list: [
                {
                    title: '111',
                    value: 'sdfasdf',
                },
                {
                    title: '2222',
                    value: '2222',
                },
                {
                    title: '3333',
                    value: '333',
                },
            ],
        }
    },

    methods: {
        getData() {
            console.log(this.$refs.listRef.getList())
        },
    },
}
</script>

<style scoped></style>
