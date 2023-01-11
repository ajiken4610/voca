<template lang="pug">
UiTable(
  v-if="list.length",
  :thead="['KEY', 'VAL', '']",
  :tbody="['key', 'value', { slot: 'edit', align: 'right' }]",
  :data="listData",
  fullwidth
)
  template(#edit="{ data }")
    UiIconButton(icon="edit", @click="goToEditPage(data.index)")
    UiIconButton(icon="delete", @click="removeWord(data.index)")
  template(#default)
    UiPagination(
      v-model="page",
      :total="total",
      showTotal,
      :pageSize="8",
      position="center"
    )
.no-item(v-else) No items
.margin
</template>

<script setup lang="ts">
import { useConfirm } from "balm-ui";
import type { WordData } from "@/composables/useWordList";

const itemsPerPage = 8;
const list = useWordList();
const page = ref(1);
const total = computed(() => Math.max(1, list.length));
const goToEditPage = (i: number) => {
  console.log(i);
  useRouter().push({ path: "/edit/" + (i + (page.value - 1) * itemsPerPage) });
};
const removeWord = (i: number) => {
  const index = i + (page.value - 1) * itemsPerPage;
  const word = list[index];
  useConfirm()(`Remove ${word.key}?`).then((result: void) => {
    if (result as unknown as boolean) {
      list.splice(index, 1);
    }
  });
};
const listData = computed(() => {
  const ret: (WordData & { index?: number })[] = list.slice(
    (page.value - 1) * itemsPerPage,
    (page.value - 1) * itemsPerPage + itemsPerPage
  );
  ret.forEach((val, i) => {
    val.index = i;
  });
  return ret;
});
</script>

<style scoped lang="scss">
.no-item {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.margin {
  margin-top: 1rem;
}
</style>
