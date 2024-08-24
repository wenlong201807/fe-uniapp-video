<template>
    <!-- :style="{ alignItems: alignItemsMap[alignItems] }" -->
    <view class="one-line__start" @click="handleCheckedOrNot(!isChecked)">
        <view class="one-line__start__box__wrap">
            <template v-if="icon">
                <slot name="icon"></slot>
            </template>
            <template v-else>
                <u-icon v-show="localSelected" name="photo"></u-icon>
            </template>
        </view>
        <slot name="label" :content="content" ref="labeRef"></slot>
    </view>
</template>

<script>
export default {
    props: {
        childrenList: {
            type: Array,
            default: () => [
                {
                    isChecked: false,
                    name: '111',
                    content: 'asdfasdf',
                },
            ],
        },
        content: {
            type: String,
            default: '默认标题',
        },
        isChecked: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Number,
            default: 0,
        },
        indexParent: {
            type: Number,
            default: 0,
        },
        icon: {
            // 添加这个属性，则传入 iconSlot
            type: Boolean,
            default: false,
        },
        alignItems: {
            type: String,
            default: 'top',
        },
    },

    data() {
        return {
            localSelected: this.isChecked,
            alignItemsMap: {
                top: 'flex-start',
                mid: 'center',
                bottom: 'flex-end',
            },
        }
    },
    watch: {
        isChecked(newValue) {
            this.localIsAllChecked = newValue
        },
    },

    methods: {
        handleCheckedOrNot(e) {
            this.localIsAllChecked = e
            // const currentChildren = this.childrenList.map((child, index) => {
            //     if (index === this.index) {
            //         child.isChecked = !this.isChecked
            //     }

            //     return child
            // })
            this.$emit('handleChildCheckbox', {
                // children: currentChildren,
                isChecked: !this.isChecked,
                index: this.index,
                indexParent: this.indexParent,
            })
        },
    },
}
</script>

<style lang="scss">
/* 一行 两边对齐 */
.one-line__start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 6rpx 0;
    width: 100%;
    .uni-view {
        line-height: 1;
    }

    &__box__wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30rpx;
        width: 30rpx;
        line-height: 1.8;
        border-radius: 100%;
        border: 1rpx solid #ccc;
        margin-right: 16rpx;
    }
}
</style>
