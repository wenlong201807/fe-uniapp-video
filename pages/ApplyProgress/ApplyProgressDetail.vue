<template>
    <view>
        <view class="f-divider"></view>

        <!-- 制卡信息 -->
        <view class="card-wrap">
            <view class="card-wrap-item" v-for="item in cardInfoMessageList" :key="item.title">
                <text class="item-left">{{ item.title }}</text>
                <text class="item-right">{{ item.content }}</text>
            </view>
        </view>

        <view class="f-divider"></view>

        <!-- 邮寄卡过程 -->
        <custom-step :list="progressList">
            <view slot="ProgressDetailSlot">
                <view class="right-message-button">
                    <u-button
                        type="primary"
                        size="mini"
                        @click="navigateToMailDetail"
                        :customStyle="midddleCustomStyles"
                        text="物流信息"></u-button>
                </view>
            </view>
        </custom-step>

        <view class="bottom-divider"></view>

        <!-- 底部定位 按钮 -->
        <view class="fix-bottom-wrap">
            <view class="main-button-wrap">
                <u-button type="primary" :customStyle="bottomCustomStyles" text="申请重寄"></u-button>
            </view>
        </view>
    </view>
</template>

<script>
import customStep from './components/ft-steps.vue'
export default {
    name: 'ApplyProgressDetail',
    components: {
        customStep,
    },
    data() {
        return {
            id: 0,
            bottomCustomStyles: {
                borderRadius: '20px',
                backgroundColor: 'blue',
            },
            midddleCustomStyles: {
                width: '200rpx',
                height: '68rpx',
                borderRadius: '44rpx',
                border: '2rpx solid #005BAB',
                backgroundColor: '#fff',
                color: 'blue',
                fontWeight: 400,
                fontSize: '28rpx',
                color: '#005BAB',
            },
            cardInfoMessageList: [{ title: '申请编号', content: 'AP2342353463' }],
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
    onLoad(e) {
        if (!e.id) {
            uni.showToast({
                title: '非法参数',
                icon: 'none',
            })
            return uni.navigateBack({
                delta: 1,
            })
        }

        this.id = e.id

        this.$H
            .get('/card_detail/' + this.id, {
                token: false,
                noJump: true,
                toast: false,
            })
            .then((result) => {
                console.log(77, result)
                const {
                    apply_no: apply_number,
                    apply_result,
                    apply_type,
                    email_date,
                    created_time: accept_date,
                } = result.cardDetail || {}

                this.cardInfoMessageList = [
                    { title: '申请编号', content: apply_number },
                    { title: '申请卡种', content: apply_type },
                    { title: '受理日期', content: accept_date },
                    {
                        title: '办卡结果',
                        content: apply_result,
                    },
                    { title: '邮寄日期', content: email_date },
                ]
            })
    },
    onPullDownRefresh() {
        this.initializeGetList()
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
        navigateToMailDetail() {
            uni.navigateTo({
                url: `./MailDetail?id=${this.id}`,
            })
        },
        initializeGetList() {
            uni.showLoading()
            const id = this.id

            return this.$H
                .get('/card_detail/' + id, {
                    token: false,
                    noJump: true,
                    toast: false,
                })
                .then((result) => {
                    console.log(77, result)
                    const {
                        apply_no: apply_number,
                        apply_result,
                        apply_type,
                        email_date,
                        created_time: accept_date,
                    } = result.cardDetail || {}

                    this.cardInfoMessageList = [
                        { title: '申请编号', content: apply_number },
                        { title: '申请卡种', content: apply_type },
                        { title: '受理日期', content: accept_date },
                        {
                            title: '办卡结果',
                            content: apply_result,
                        },
                        { title: '邮寄日期', content: email_date },
                    ]

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
/* 分割线 */
.f-divider {
    height: 18rpx;
    background-color: #f5f5f4;
}

.right-message-button {
    width: 200rpx;
    height: 68rpx;
    background: #ffffff;
    border-radius: 44rpx;
    border: 2rpx solid #005bab;
}

/* 制卡信息 */
.card-wrap {
    .card-wrap-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 0 30rpx;
        height: 100rpx;
        font-size: 28rpx;
        color: #272727;
        font-weight: 400;
        border-bottom: 1rpx solid #f5f5f4;
    }

    .item-left {
        display: flex;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }
    .item-right {
        display: flex;
        height: 100%;
        width: 300rpx;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }
}

/* 底部按钮 */
.fix-bottom-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1001;
    height: 120rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f7f8fa;

    .main-button-wrap {
        width: 100%;
        border-radius: 44rpx;
        margin: 0 30rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 30rpx;
        color: #ffffff;
        background: #005bab;
    }
}

.bottom-divider {
    height: 128rpx;
}
</style>
