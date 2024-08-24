<template>
    <view class="rxlc-step">
        <view class="rxlc-content">
            <view class="content-list" v-for="(item, index) in list" :key="index">
                <view class="content-list-lt">
                    <view class="list-icon-title">
                        <view class="lt-icon">
                            <view
                                :class="{
                                    'lt-icon-box': true,
                                    'lt-icon-box-custom': item.title === '邮寄',
                                }"></view>
                        </view>
                        <view class="lt-text">
                            <view
                                :class="{
                                    'lt-text-title': true,
                                    'lt-text-title-active': index === 0,
                                }">
                                <view>{{ item.title }}</view>
                                <slot name="ProgressDetailSlot" v-if="item.title === '邮寄'"></slot>
                            </view>
                            <view
                                :class="{
                                    'lt-text-desc': true,
                                    'lt-text-desc-active': index === 0,
                                }"
                                >{{ item.time }}</view
                            >
                        </view>
                    </view>
                    <view class="white-line"></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => [],
            validator: (array) => array.every((item) => typeof item === 'object'),
        },
    },
    data() {
        return {}
    },
    methods: {
        clickToMailDetail() {
            uni.navigateTo({
                url: './MailDetail',
            })
        },
    },
}
</script>

<style lang="scss">
.rxlc-step {
    width: 100%;
    padding: 16px 8px 20px 8px;
    box-sizing: border-box;
    .rxlc-content {
        width: 100%;
        /* box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
    border-radius: 10px; */
        position: relative;
        .content-list {
            width: 100%;
            display: table;
            .content-list-lt {
                display: table-cell;
                /* background: #3db8ba; */
                padding-left: 10px;
                position: relative;
                color: #ccc;
                font-family: Noto Sans S Chinese Medium;
                font-size: 16px;
                .list-icon-title {
                    display: table;
                    .lt-icon {
                        display: table-cell;
                        .lt-icon-box {
                            position: relative;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            background: #ccc;
                            margin-right: 7px;
                            z-index: 23;
                        }
                        .lt-icon-box-custom {
                            background: blue;
                        }
                    }
                    .lt-text {
                        display: table-cell;
                        width: 100%;
                        padding-right: 10px;
                        font-weight: 550;
                        font-size: 16px;
                        line-height: 18px;
                        .lt-text-title {
                            font-family: PingFangSC, PingFang SC;
                            font-weight: 500;
                            font-size: 32rpx;
                            color: #005bab;
                            line-height: 44rpx;

                            margin-bottom: 4rpx;

                            &-active {
                                font-weight: 400;
                                font-size: 28rpx;
                                color: #005bab;
                                line-height: 40rpx;
                            }
                        }
                        .lt-text-title-right {
                            display: flex;
                            width: 100%;
                            justify-content: space-between;
                            align-items: center;
                        }
                        .lt-text-desc {
                            font-family: PingFangSC, PingFang SC;
                            font-weight: 400;
                            font-size: 28rpx;
                            color: #646566;
                            margin-bottom: 8px;
                        }
                    }
                }
                .white-line {
                    width: 1px;
                    height: 100%;
                    position: absolute;
                    top: 18px;
                    /* top: 34px; */
                    left: 16px;
                    background: #ccc;
                    opacity: 0.4;
                    z-index: 22;
                }
            }
            .content-list-rt {
                width: 70%;
                display: table-cell;
                .list-rt-content {
                    padding: 22px 14px 0px 14px;
                    color: #333333;
                    font-size: 14.5px;
                    line-height: 18px;
                }
                .cat-line {
                    margin-left: 24px;
                    margin-top: 20px;
                    border-bottom: 1px solid #efefef;
                }
            }
            &:first-child {
                .content-list-lt {
                    border-radius: 10px 0 0 0;
                }
            }
            &:last-child {
                .content-list-lt {
                    border-radius: 0 0 0 10px;
                    .white-line {
                        width: 0px;
                    }
                }
                .content-list-rt {
                    .cat-line {
                        margin-left: 10px;
                        margin-top: 20px;
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
</style>
