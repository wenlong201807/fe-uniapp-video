<template>
    <view class="checkbox-container" @tap="toggleCheck">
        <view class="checkbox-box" :class="{ checked: isChecked }">
            <!-- 自定义的 slot 内容，用于替换默认的内容 -->
            <slot>
                <text v-if="isChecked">✔️</text>
            </slot>
        </view>
        <view class="checkbox-label">
            <slot name="label">{{ label }}</slot>
        </view>
    </view>
</template>

<script>
export default {
    name: 'MyCheckbox',
    props: {
        // 用于绑定选中的状态
        value: {
            type: Boolean,
            default: false,
        },
        // 自定义的 label 文本
        label: {
            type: String,
            default: '',
        },
    },
    computed: {
        // 计算属性，用于双向绑定
        isChecked() {
            return this.value
        },
    },
    methods: {
        // 切换选中状态，并 emit 事件
        toggleCheck() {
            const newValue = !this.isChecked
            this.$emit('input', newValue) // 支持 v-model
            this.$emit('change', newValue) // 触发自定义 change 事件
        },
    },
}
</script>

<style scoped>
.checkbox-container {
    display: flex;
    align-items: center;
}
.checkbox-box {
    width: 24px;
    height: 24px;
    border: 2px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
}
.checkbox-box.checked {
    background-color: #42b983;
}
.checkbox-label {
    margin-left: 10px;
}
</style>
