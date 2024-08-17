<template>
    <view>
        <view class="mail-detail-wrap">
            <!-- 卡片标题，卡号 -->
            <view class="card-title-wrap">
                <text class="card-title">asdasdfx显示一行文字，多余用省略号asdgasdasd啊师傅</text>
                <text>12312523525</text>
            </view>

            <!-- 约投 -->
            <view class="contact-wrap">
                <view class="contact-title">约投</view>
                <view class="card-wrap-item" v-for="item in cardSendMessageList" :key="item.title">
                    <text class="item-left">{{ item.title }}</text>
                    <text class="item-right">{{ item.content }}</text>
                </view>
            </view>
        </view>

        <!-- 制卡过程 -->
        <custom-step :list="progressList"></custom-step>

        <view class="bottom-divider"></view>
    </view>
</template>

<script>
import customStep from './components/ft-steps.vue'
export default {
    name: 'MailDetail',
    components: {
        customStep,
    },
    data() {
        return {
            bottomCustomStyles: {
                borderRadius: '20px',
                backgroundColor: 'blue',
            },
            cardSendMessageList: [
                { title: '运单编号:', content: 'AP2342353463' },
                { title: '投递时间:', content: '2022/08/10' },
            ],
            progressList: [
                { title: '邮寄', time: '2022/08/12' },
                { title: '审批通过待制卡', time: '2022/08/12' },
                { title: '正在审批中', time: '2022/08/12' },
                { title: '已受理客户申请', time: '2022/08/12' },
                { title: '已受理客户申请2', time: '2022/08/12' },
                { title: '已受理客户申请3', time: '2022/08/12' },
                { title: '已受理客户申请4', time: '2022/08/12' },
                { title: '已受理客户申请5', time: '2022/08/12' },
                { title: '已受理客户申请6', time: '2022/08/12' },
                { title: '已受理客户申请7', time: '2022/08/12' },
                { title: '已受理客户申请8', time: '2022/08/12' },
                { title: '已受理客户申请9', time: '2022/08/12' },
                { title: '已受理客户申请10', time: '2022/08/12' },
            ],
        }
    },
    onLoad() {
        this.initializeGetEmailMessage()
    },
    onPullDownRefresh() {
        this.initializeGetEmailMessage()
            .then(() => {
                uni.showToast({
                    title: '刷新成功',
                    icon: 'none',
                })
                uni.stopPullDownRefresh()
            })
            .catch(() => {
                uni.stopPullDownRefresh()
            })
    },
    methods: {
        initializeGetEmailMessage() {
            uni.showLoading()
            return this.$H
                .get('/category')
                .then((res) => {
                    this.list = res
                    uni.hideLoading()
                })
                .catch((err) => {
                    uni.hideLoading()
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.mail-detail-wrap {
    padding: 16rpx 0;
    background-color: #ccc;
}
/* 标题，卡号 */
.card-title-wrap {
    margin: 0 16rpx 16rpx;
    padding: 20rpx 40rpx;
    border: 1px solid #ccc;
    border-radius: 20rpx;
    background-color: #fff;

    .card-title {
        display: inline-block;
        overflow: hidden;
        width: 100%;
        font-size: 30rpx;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
/* 制卡信息 */
.contact-wrap {
    margin: 0 16rpx;
    padding: 20rpx 40rpx;
    border: 1px solid #ccc;
    border-radius: 20rpx;
    background-color: #fff;

    .contact-title {
        margin-bottom: 10rpx;
        font-size: 40rpx;
        color: 'green';
    }

    .card-wrap-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .item-left {
        color: blue;
    }
    .item-right {
        width: 200rpx;
        color: grey;
    }
}

.bottom-divider {
    height: 1px;
}
</style>
