<template>
    <view>
        <view
            class="card-title-wrap"
            v-for="item in cardList"
            :key="item.title"
            @click="navigateToApplyProgressDetail(item)">
            <view
                :class="{
                    'right-top-type': true,
                    'type-success-style': !!item.isPass,
                    'type-fail-style': !!item.isPass,
                }"
                >{{ item.isPass ? '通过' : '拒绝' }}</view
            >
            <view class="card-title">{{ item.title }}</view>
            <view class="card-number">{{ item.cardNumber }}</view>
            <view class="card-wrap-item">
                <text class="item-left">申请编号</text>
                <text class="item-right">{{ item.applyNumber }}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        cardList: {
            type: Array,
            default: () => [],
            validator: (array) => array.every((item) => typeof item === 'object'),
        },
    },
    data() {
        return {}
    },

    methods: {
        navigateToApplyProgressDetail(item) {
            if (!item.isPass) return

            uni.navigateTo({
                url: `./ApplyProgressDetail?id=${item.id}`,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.card-wrap {
    min-height: calc(100vh - 44px);
    padding: 16rpx 0;
    background-color: #ccc;
}

/* 一个卡片内容 */
.card-title-wrap {
    overflow: hidden;
    position: relative;
    margin: 16rpx 16rpx;
    padding: 20rpx 40rpx;
    border-radius: 20rpx;
    background-color: #fff;

    .right-top-type {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        width: 60rpx;
        height: 40rpx;
        background-color: #ccc;
        color: #fff;
    }

    .type-success-style {
        background-color: green;
    }
    .type-fail-style {
        background-color: red;
    }

    .card-title {
        width: 100%;
        font-size: 30rpx;
        font-weight: 500;
    }

    .card-number {
        width: 100%;
    }

    .card-wrap-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
