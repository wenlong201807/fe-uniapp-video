<template>
    <view>
        <view v-for="(item, index) in payTypeList" :key="index">
            <view class="accordion-header">
                <view class="one-line__bettween">
                    <slot name="title" :item="item" :index="index" />
                    <u-switch v-model="item.isExpand" @change="(e) => handleItemCheck(e, index)"></u-switch>
                </view>
            </view>
            <transition name="accordion">
                <view
                    :class="{
                        'accordion-content': true,
                        'accordion-content-hidden': !item.isExpand,
                    }">
                    <slot name="content" :item="item" :childrenList="item.children" :index="index" />
                </view>
            </transition>
        </view>
    </view>
</template>

<script>
import ftCheckbox from './ft-checkbox.vue'
export default {
    props: {
        payTypeList: {
            type: Array,
            default: () => [
                {
                    title: 'Section 1',
                    content: 'This is the content for Section 1.',
                    isExpand: false,
                    children: [
                        {
                            isChecked: false,
                            name: '111',
                            content: 'asdfasdf',
                        },
                        {
                            isChecked: false,
                            name: '222',
                            content: 'asdfasdf',
                        },
                    ],
                },
            ],
        },
    },
    data() {
        return {
            actionNumber: 1,
        }
    },
    components: {
        ftCheckbox,
    },
    watch: {
        actionNumber: {
            handler(val) {
                console.log('ft-list-slot-watch', val)
            },
            deep: true,
        },
    },
    methods: {
        handleItemCheck(e, index) {
            this.actionNumber += 1
            this.$emit('change', { e, index, actionNumber: this.actionNumber })
        },
    },
}
</script>

<style lang="scss">
.accordion {
    overflow: hidden;
}

.accordion-item {
    border-bottom: 1rpx solid #ddd;
}

.accordion-header {
    font-size: 30rpx;
    padding: 16rpx;
    border-top: 1px solid #ccc;
}

.accordion-content {
    padding: 16rpx;
    background-color: #ffffff;
    transition: all 0.4s;
}
.accordion-content-hidden {
    height: 0;
    padding: 0;
    overflow: hidden;
}

/* 一行 两边对齐 */
.one-line__bettween {
    display: flex;
    height: 40rpx;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
</style>
