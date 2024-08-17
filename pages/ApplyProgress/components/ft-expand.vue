<template>
    <view class="marteial_wrap">
        <view class="marteial_wrap__desc">为了方便日后用卡，请选择常用的电子支付方式</view>
        <view class="one-line__bettween">
            <view class="one-line__bettween__left">全选</view>
            <u-switch class="one-line__bettween__right" v-model="localIsAllChecked" @change="handleAllCheck"></u-switch>
        </view>
    </view>
</template>

<script>
export default {
    name: 'Expand',
    props: {
        isAllChecked: {
            type: Boolean,
            debugger: false,
        },
    },
    components: {},
    data() {
        return {
            dynamicHeight: 0,
            isCollapse: false,
            localIsAllChecked: this.isAllChecked,
        }
    },
    watch: {
        isAllChecked(newValue) {
            this.localIsAllChecked = newValue
        },
    },
    onload() {},
    methods: {
        handleAllCheck(e) {
            this.localIsAllChecked = e
            this.$emit('handleIsAllChecked', e)
        },
    },
}
</script>

<style lang="scss">
.marteial_wrap {
    overflow: hidden;
    height: 120rpx;
    box-sizing: border-box;
    background-color: #fff;
    transition: height 1s;

    &__desc {
        padding: 0 16rpx;
        color: #ccc;
    }
}
/* 一行 两边对齐 */
.one-line__bettween {
    display: flex;
    box-sizing: border-box;
    height: 60rpx;
    padding: 0 16rpx;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &__left {
        font-size: 32rpx;
    }
}
</style>
