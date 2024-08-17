<template>
    <view class="safe-wrap">
        <view class="card-wrap">
            <!-- 卡片标题，卡号 -->
            <view v-if="cardList.length > 0">
                <ft-card-list :cardList="cardList"></ft-card-list>
            </view>

            <!-- 默认提示 -->
            <view v-if="cardList.length === 0" class="none-data-container">暂无数据</view>
        </view>

        <!-- 上拉加载更多 -->
        <view v-if="cardList.length > 10" class="load-more-container" hover-class="background-light">
            {{ loadText }}
        </view>
    </view>
</template>

<script>
import ftCardList from './components/ft-card-list.vue'
export default {
    name: 'ApplyProgressList',
    components: { ftCardList },

    data() {
        return {
            scrollH: 500,
            loadText: '上拉加载更多',
            pageNumber: 1,
            pageSize: 10,
            cardList: [
                {
                    id: 1,
                    title: '建行生活卡',
                    cardNumber: '1234567890123456',
                    applyNumber: 'YGdfhbwsrhwrh',
                    isPass: true,
                },
            ],
        }
    },
    onLoad() {
        console.log(888, '父组件 onLoad')
        let res = uni.getSystemInfoSync()
        this.scrollH = res.windowHeight - 44
        this.initializeGetList()
    },
    onPullDownRefresh() {
        console.log(999, '父组件 onPullDownRefresh')
        this.pageNumber = 1
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
    onReachBottom() {
        console.log(999, '父组件 onReachBottom')
        if (this.loadText !== '上拉加载更多') {
            return
        }
        this.loadText = '正在加载中...'
        this.pageNumber++
        this.initializeGetList()
    },
    methods: {
        navigateToApplyProgressDetail(item) {
            if (!item.isPass) return

            uni.navigateTo({
                url: `./ApplyProgressDetail?id=${item.id}`,
            })
        },
        initializeGetList() {
            let page = this.pageNumber
            return this.$H
                .get(`/cardList?page=${this.pageNumber}&limit=${this.pageSize}`)
                .then((res) => {
                    const formatResultList = res.map((item) => {
                        return {
                            id: item.id,
                            title: item.title,
                            cardNumber: item.card_no,
                            applyNumber: item.apply_no,
                            isPass: !!item.is_pass,
                        }
                    })
                    this.cardList = page === 1 ? formatResultList : [...this.cardList, ...formatResultList]
                    this.loadText = formatResultList.length === 10 ? '上拉加载更多' : '没有更多了'
                })
                .catch(() => {
                    if (page > 1) {
                        this.pageNumber--
                    }
                    this.loadText = '上拉加载更多'
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.safe-wrap {
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
/* 无数据时展示 */
.none-data-container {
    display: flex;
    height: 200rpx;
    justify-content: center;
    align-items: center;
    color: #ccc;
}

/* 加载更多 */
.load-more-container {
    display: flex;
    height: 80rpx;
    justify-content: center;
    align-items: center;
    color: #ccc;
}

/* 触摸时高亮 */
.background-light {
    background-color: #f8f9fa;
}

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
