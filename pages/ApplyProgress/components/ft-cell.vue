<template>
    <u-cell-group>
        <u-cell :title="item.title" v-for="(item, index) in localList" :key="index">
            <u--input
                slot="right-icon"
                placeholder="请输入内容"
                v-model="item.value"
                @change="(e) => change(e, item)"></u--input>
        </u-cell>
    </u-cell-group>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            value: '',
            localList: this.list,
        }
    },
    methods: {
        getList() {
            return this.localList
        },
        change(e, item) {
            // console.log('change', e)
            item.value = e
            this.emit('change', item)
        },
    },
}
</script>
import { props } from 'uview-ui/libs/mixin/mixin';
