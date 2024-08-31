<template>
    <u-cell-group>
        <u-cell v-for="(item, index) in localList" :key="index" class="one-line">
            <view slot="title" class="one-line__title">{{ item.title }}</view>
            <view slot="right-icon" class="one-line__input">
                <view v-for="(itemTwo, indexTwo) in item.children">
                    <u--input
                        :key="indexTwo"
                        :placeholder="itemTwo.title"
                        v-model="itemTwo.value"
                        inputAlign="right"
                        :class="itemTwo.className"
                        @change="(e) => change(e, itemTwo)">
                        <u--text
                            v-if="indexTwo + 1 < item.children.length"
                            text="-"
                            slot="suffix"
                            margin="0 3px 0 0"
                            type="tips"></u--text>
                    </u--input>
                </view>
            </view>
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
    watch: {
        list: {
            handler(newValue) {
                this.localList = newValue
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        getList() {
            return this.localList
        },
        change(e, item) {
            // console.log('change', e)
            item.value = e
            // this.emit('change', item)
        },
    },
}
</script>

<style lang="scss">
.one-line__title {
    width: 120rpx;
    border: 1px solid black;
}
.one-line__input {
    flex: 1;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
.one-line {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /* border: 1px solid black; */
    ::v-deep .u-cell__body {
        width: 100%;
        /* background-color: pink; */
    }
    ::v-deep .uni-input-placeholder {
        text-align: right;
    }
}
.quhao {
    max-width: 80rpx;
    margin-right: 2rpx;
    background-color: bisque;
}
.zuoji {
    max-width: 110rpx;
    margin-right: 2rpx;
    background-color: goldenrod;
}
.phone {
    flex: 1;
    background-color: pink;
}
</style>
import text from 'uview-ui/libs/config/props/text'
