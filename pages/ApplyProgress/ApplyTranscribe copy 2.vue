<template>
    <view class="apply-transcribe-wrap">
        <u-collapse ref="uCollapseRef" :value="['payBinding']" :border="false">
            <u-collapse-item title="支付绑定" name="payBinding">
                <!-- <ft-expand :isAllChecked="isAllChecked" @handleIsAllChecked="handleIsAllChecked"> </ft-expand> -->
                <!-- 各类支付方式 -->
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
                            <!-- <ft-checkbox
                                icon
                                alignItemsMap="top"
                                :childrenList="childrenList"
                                :isChecked="itemBox.isChecked"
                                :index="indexBox"
                                :indexParent="index"
                                :content="itemBox.content"
                                @handleChildCheckbox="handleChildCheckbox">
                                <template v-slot:label="{ content }">
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
                                </template>
                                <template v-slot:icon>
                                    <u-icon name="checkbox-mark"></u-icon>
                                </template>
                            </ft-checkbox> -->

                            <view>
                                <my-checkbox
                                    v-model="itemBox.isChecked"
                                    label="同意协议"
                                    @change="(e) => handleChildCheckbox(e)">
                                    <!-- slot 内容 -->
                                    <view>✔️</view>
                                </my-checkbox>
                            </view>
                        </view>
                    </template>
                </ft-dynamic-list-slot>
            </u-collapse-item>
        </u-collapse>

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
        handleUpdateCollapsInitHeight() {
            this.$nextTick(() => {
                this.$refs.uCollapseRef.init()
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

<style lang="scss" scope>
.apply-transcribe-wrap {
    /deep/ .u-collapse-item__content__text {
        padding: 0;
    }
}

.title__other {
    color: red;
}
.content__blue {
    color: blue;
}
</style>
