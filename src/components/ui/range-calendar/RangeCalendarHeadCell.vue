<script setup>
import { computed } from "vue";
import { RangeCalendarHeadCell, useForwardProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RangeCalendarHeadCell
    :class="
      cn(
        'w-8 rounded-md text-[0.8rem] font-normal text-slate-500 dark:text-slate-400',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>
