<template>
    <view class="aacollapse-item">
        <view class="aacollapse-item__title" @click="openCollapse(!is_open)">
            <text class="aacollapse-item__title-text" :class="{ 'open--active': is_open }">{{ title }}</text>
            <view class="down_arrow" :class="{ 'down_arrow--active': is_open }"></view>
        </view>

        <view ref="boxRef" class="uni-collapse-item__content">
            <view ref="contentRef" class="uni-collapse-item__content-box">
                <view class="aacollapse-item__content-box">
                    sfbsfbs
                    <view v-for="item in accordionItems" :key="item.title">{{ item.title }}</view>
                </view>
            </view>
        </view>
        <view>asdfasdasdag</view>
    </view>
</template>

<script>
export default {
    name: 'UaaCollapseItem',

    data() {
        return {
            height: 0,
            title: 'segvfw',
            is_open: false,
            accordionItems: [
                {
                    title: '第一组',
                    items: [
                        { label: '选项 1', selected: false },
                        { label: '选项 2', selected: false },
                        { label: '选项 3', selected: false },
                    ],
                },
                {
                    title: '第二组',
                    items: [
                        { label: '选项 A', selected: false },
                        { label: '选项 B', selected: false },
                        { label: '选项 C', selected: false },
                    ],
                },
            ],
        }
    },
    watch: {
        height(newValue) {
            console.log('watch:', newValue)
        },
    },

    methods: {
        calcHeight(cb) {
            const query = wx.createSelectorQuery()
            query
                .select('#canvas')
                .boundingClientRect(function (res) {
                    console.log(res.height) // 输出元素的高度
                    this.height = res.height
                    cb(res.height)
                })
                .exec()
        },
        // 开启或关闭折叠面板
        openCollapse(open) {
            console.log(open)
            // 关闭其他已打开
            const len = this.accordionItems.length + 1
            // this.accordionItems.push({
            //     title: '第一组' + len,
            // })

            this.is_open = open
            this.calcHeight((h) => {
                console.log(h, '毁掉函数获取高度')
            })
            // this.openOrClose(open)
        },
        // openOrClose(open) {
        //     const boxNode = this.boxNode?.style
        //     const contentNode = this.contentNode?.style
        //     let hide = open ? 'flex' : 'none'
        //     const opacity = open ? '1' : '0'
        //     let ani_transform = open ? 'translateY(0)' : 'translateY(-100%)'
        //     boxNode.setProperty('display', hide)
        //     this.$nextTick(() => {
        //         contentNode.setProperty('transform', ani_transform)
        //         contentNode.setProperty('opacity', opacity)
        //     })
        // },
    },
}
</script>

<style scoped>
.aacollapse-item {
    background-color: blanchedalmond;
}

.aacollapse-item__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px;
    background-color: pink;
}

.down_arrow {
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    border-right: 1px #999 solid;
    border-bottom: 1px #999 solid;
    margin-top: -3px;
    transition-property: transform;
    transition-duration: 0.2s;
}

.down_arrow--active {
    transform: rotate(-135deg);
    margin-top: 0px;
}

.aacollapse-item__title-text {
    flex: 1;
    color: #000;
    font-size: 14px;
}

.open--active {
    /* background-color: #f0f0f0; */
    color: #bbb;
}

.is-disabled {
    color: #999;
}

.aacollapse-item__content {
    /* display: none; */
    /* position: relative; */
}

.aacollapse-item__content-box {
    /* position: relative; */
    transition: all 6s;
    width: 100%;
    /* transition-property: transform, opacity; */
    /* transition-duration: 0.2s; */
    /* transform: translateY(-100%);
    opacity: 0; */
}
</style>
