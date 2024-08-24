<template>
    <view class="apply-transcribe-wrap">
        <view>
            <view class="header">
                <view>支付绑定</view>
                <view :class="['', { 'rotate-icon': !isHidden }]" @click="handleIsHidden">
                    <!-- {{ isHidden ? '展开' : '收起' }} -->
                    <u-icon name="arrow-down" color="#2979ff" size="28"></u-icon>
                </view>
            </view>
            <view
                :class="[
                    'content',
                    {
                        hiddenAnimation: isHidden,
                        showAnimation: !isHidden,
                    },
                ]">
                <ft-expand :isAllChecked="isAllChecked" @handleIsAllChecked="handleIsAllChecked"> </ft-expand>
                <ft-dynamic-list-slot
                    :isAllChecked="isAllChecked"
                    @handleIsAllChecked="handleIsAllChecked"
                    :payTypeList.async="payTypeList"
                    @change="handleAccordionChange">
                    <template v-slot:title="{ item, index }">
                        <view>
                            <text>Header=={{ item.title }} ==={{ index }}</text>
                            <text class="title__other" @click="handleOther(item, index)">other data</text>
                        </view>
                    </template>
                    <template v-slot:content="{ item, childrenList, index }">
                        <view v-for="(itemBox, indexBox) in childrenList" :key="indexBox">
                            <view>
                                <my-checkbox
                                    v-model="itemBox.isChecked"
                                    label="同意协议"
                                    @change="(e) => handleChildCheckbox(e)">
                                    <view>
                                        <text>黑色字体</text>
                                        <text>{{ content }}</text>
                                        <text
                                            class="content__blue"
                                            @click.stop="handleBlue(indexBox, index, itemBox, item)"
                                            >other blue</text
                                        >
                                        <text>黑色sfbdf字体</text>
                                    </view>
                                </my-checkbox>
                            </view>
                        </view>
                    </template>
                </ft-dynamic-list-slot>
            </view>
            <!-- </view> -->
        </view>

        <view>sadfasdfasdfsadfasdf</view>

        <u-modal :show="isShowModal" @confirm="handleConfirmModal" @cancel="handleCancelModal" showCancelButton>
            <view class="slot-content">{{ modalContentJSON }} </view>
        </u-modal>
    </view>
</template>

<script>
import FtExpand from './components/ft-expand.vue'
import ftDynamicListSlot from './components/ft-dynamic-list-slot.vue'
import ftCheckbox from './components/ft-checkbox.vue'

export default {
    name: 'Collapse',
    components: {
        FtExpand,
        ftDynamicListSlot,
        ftCheckbox,
    },
    data() {
        return {
            isHidden: true,
            show: false,
            modalContentJSON: '',
            isShowModal: false,
            isChecked: true,
            isAllChecked: false,
            payTypeList: [
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
                {
                    title: 'Section 2',
                    content: `This is the content for Section 2This is the content for Section
                    2This is the coent for Section 2.
                        `,
                    isExpand: false,
                    children: [
                        {
                            isChecked: false,
                            content: 'asdfasdf',
                        },
                        {
                            isChecked: false,
                            content: 'asdfasdf',
                        },
                    ],
                    checkboxList: [],
                },
                {
                    title: 'Section 3',
                    content: 'This is the content for Section 3.',
                    isExpand: false,
                    children: [
                        {
                            isChecked: false,
                            content: 'asdfasdf',
                        },
                        {
                            isChecked: false,
                            content: 'asdfasdf',
                        },
                    ],
                },
            ],
        }
    },
    onload() {
        this.handleUpdateCollapsInitHeight()
    },
    // watch
    methods: {
        handleIsHidden() {
            this.isHidden = !this.isHidden
        },
        handleUpdateCollapsInitHeight() {
            this.$nextTick(() => {
                // this.$refs.uCollapseRef.init()
            })
        },
        handleCancelModal() {
            this.isShowModal = false
        },
        handleConfirmModal() {
            this.isShowModal = false
        },
        handleChildCheckbox(obj) {
            console.log(999, '父组件', 'handleChildCheckbox:', obj)
            const { isChecked, index, indexParent, children } = obj
            this.payTypeList[indexParent].children[index].isChecked = e
            // this.$set(this.payTypeList[indexParent], 'children', children)
        },
        // handleChildCheckbox(obj) {
        //     console.log(999, '父组件', 'handleChildCheckbox:', obj)
        //     const { isChecked, index, indexParent, children } = obj
        //     this.payTypeList[indexParent].children[index].isChecked = isChecked
        //     // this.$set(this.payTypeList[indexParent], 'children', children)
        // },
        handleIsAllChecked(e) {
            this.isAllChecked = e

            this.payTypeList.forEach((item) => {
                item.isExpand = e
                item?.children.forEach((child) => {
                    child.isChecked = e
                })
            })

            this.handleUpdateCollapsInitHeight()
        },
        handleOther(item, index) {
            this.isShowModal = true
            this.modalContentJSON = JSON.stringify(item)
        },
        handleBlue(indexBox, index, itemBox, item) {
            this.modalContentJSON = JSON.stringify(item)
            this.isShowModal = true
        },
        handleAccordionChange(obj) {
            const { e, index } = obj
            this.payTypeList[index].isExpand = e

            // 二级选项选中
            if (e) {
                this.payTypeList[index].children.forEach((child) => {
                    child.isChecked = true
                })
            }

            let booleanTrueNumber = 0
            this.payTypeList.forEach((item) => {
                if (item.isExpand) {
                    booleanTrueNumber += 1
                }
            })
            console.log(booleanTrueNumber, this.payTypeList.length)
            if (booleanTrueNumber === this.payTypeList.length) {
                this.isAllChecked = true
            } else {
                this.isAllChecked = false
            }

            this.handleUpdateCollapsInitHeight()
        },
    },
}
</script>

<style>
@keyframes hiddenAnimation {
    0% {
        opacity: 1;
        transform: translateY(-0%);
    }

    80% {
        opacity: 0.8;
        transform: translateY(-80%);
    }

    100% {
        opacity: 0;
        height: 0;
        overflow: hidden;
        transform: translateY(-100%);
    }
}

@keyframes showAnimation {
    0% {
        opacity: 0;
        height: 0;
        transform: translateY(-100%);
    }

    10% {
        opacity: 0.1;
        transform: translateY(-90%);
    }

    100% {
        opacity: 1;
        height: auto;
        overflow: visible;
        transform: translateY(0%);
    }
}

.rotate-icon {
    transform: rotate(-180deg);
    transition: transform 0.3s ease-out;
}

.header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
}
.content {
    background-color: pink;
    animation: all 0.4s;
}
.hiddenAnimation {
    animation-fill-mode: forwards;
    animation-name: hiddenAnimation;
}
.showAnimation {
    animation-fill-mode: forwards;
    animation-name: showAnimation;
}
</style>

<style lang="scss" scope>
.title__other {
    color: red;
}
.content__blue {
    color: blue;
}
</style>
