<template>
    <view class="accordion-container">
        <view class="accordion-header" @tap="toggleAccordion">
            <!-- 自定义标题 -->
            <slot name="title">
                <text>{{ title }}</text>
            </slot>
            <!-- 自定义图标 -->
            <slot name="icon">
                <text :class="{ 'rotate-icon': isOpen }">🐰</text>
            </slot>
        </view>
        <!-- 内容部分 -->
        <view v-show="isOpen" class="accordion-content">
            <slot name="content">
                <text>{{ content }}</text>
            </slot>
        </view>
    </view>
</template>

<script>
export default {
    name: 'MyAccordion',
    props: {
        title: {
            type: String,
            default: '手风琴标题',
        },
        content: {
            type: String,
            default: '手风琴内容',
        },
        isOpenDefault: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isOpen: this.isOpenDefault,
            contentHeight: 0,
        }
    },
    mounted() {
        this.calculateHeight()
        if (this.isOpen) {
            this.$refs.content.styles.height = this.contentHeight + 'px'
            this.$refs.content.classList.add('open')
        }
    },
    methods: {
        toggleAccordion() {
            this.isOpen = !this.isOpen
            if (this.isOpen) {
                this.$refs.content.styles.height = this.contentHeight + 'px'
                this.$refs.content.classList.add('open')
            } else {
                this.$refs.content.styles.height = '0px'
                this.$refs.content.classList.remove('open')
            }
        },
        calculateHeight() {
            this.$nextTick(() => {
                const content = this.$refs.content
                this.contentHeight = content.scrollHeight
            })
        },
    },
}
</script>

<style scoped>
.accordion-container {
    border-bottom: 1px solid #ddd;
}

.accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx 20rpx;
    background-color: #f9f9f9;
}

.accordion-content {
    overflow: hidden;
    height: 0;
    transition: height 0.3s ease, opacity 0.3s ease;
    opacity: 0;
}

.accordion-content.open {
    height: auto;
    opacity: 1;
}

.rotate-icon {
    transform: rotate(180deg);
    transition: transform 0.3s ease-out;
}

@keyframes slide-down {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
