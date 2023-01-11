<template lang="pug">
UiList(v-if="list.length" :type="2")
    template(v-for="i in 8" :key="i")
        UiItem(v-if="list[i + (page - 1) * 8]" @click="goToEditPage(i)")
            UiItemTextContent
                UiItemText1 {{ list[i + (page - 1) * 8].key }}
                UiItemText2 {{ list[i + (page - 1) * 8].value }}
div.no-item(v-else) No items
UiPagination(v-model="page" :total="total" showTotal :pageSize="8")
    template(#default="{ currentMinRow, currentMaxRow }")
        | {{ currentMinRow }} - {{ currentMaxRow }} / {{ total }}
</template>

<script setup lang="ts">
const list = useWordList()
const page = ref(1)
const total = computed(() => Math.max(1, list.length))
const goToEditPage = (i: number) => {
    useRouter().push({ path: '/edit/' + (i + (page.value - 1) * 8) })
}
</script>

<style scoped lang="scss">
.no-item {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
}
</style>