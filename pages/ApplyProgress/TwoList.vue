<template>
    <view>
        <my-checkbox v-model="isChecked" label="同意协议">
            <!-- slot 内容 -->
            <view>✔️</view>
        </my-checkbox>

        <view>=====================</view>
        <my-accordion :title="'自定义标题'" :content="'这是默认内容'">
            <template v-slot:title>
                <text>📄 自定义标题</text>
            </template>
            <template v-slot:icon>
                <text>🔽</text>
            </template>
            <template v-slot:content>
                <text>这是自定义内容，可以是任何内容。</text>
            </template>
        </my-accordion>
    </view>
</template>

<script>
import MyCheckbox from './components/my-checkbox'
import MyAccordion from './components/my-accordion'

export default {
    name: 'Collapse',
    components: {
        MyCheckbox,
        MyAccordion,
    },
    data() {
        return {
            isChecked: false,
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

    // watch
    methods: {},
}
</script>

<style lang="scss" scope></style>
