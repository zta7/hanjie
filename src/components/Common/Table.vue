<template>
  <q-layout container>
    <q-header class='text-black bg-white'>
      <div class='row q-gutter-x-xs q-gutter-y-md q-pa-md'>
        <slot name='leftHeader' />
        <q-space class='gt-xs' />
        <slot name='rightHeader' />
      </div>
      <q-separator />
    </q-header>
    <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
      <q-page-container>
        <q-table
          :rows='rows'
          :columns='columns'
          :selected='selected'
          flat
          selection='multiple'
          row-key='id'
          class='q-mx-md'
          :grid='$q.screen.lt.sm'
          @update:selected='v => $emit("update:selected", v)'>
          <template #header-cell='{ col }'>
            <q-th class='text-left'>
              {{ $t(`${prefix}.${col.label}`) }}
            </q-th>
          </template>
          <template #body-cell-action='{ col }'>
            <q-td>
              <q-btn v-if='col.editable' flat dense :label='$t("edit")' color='primary' @click='$emit("action:edit")' />
              <q-btn v-if='col.deleteable' flat dense :label='$t("delete")' color='primary' @click='$emit("action:delete")' />
              <!-- <slot name='actionBtn' /> -->
            </q-td>
          </template>
          <template #item='props'>
            <div
              class='q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3'
              :style="props.selected ? 'transform: scale(0.95);' : ''">
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
                <q-card-section>
                  <q-checkbox v-model='props.selected' dense />
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for='[k,v] of Object.entries(props.row)' :key='k'>
                    <q-item-section>
                      <q-item-label>{{ $t(`${prefix}.${k}`) }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>
                        {{ v }} {{ Boolean(props.cols) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-page-container>
      <q-page-scroller position='bottom-right' :scroll-offset='150' :offset='[25, 50]' :duration='100'>
        <q-btn fab icon='keyboard_arrow_up' color='accent' />
      </q-page-scroller>
    </q-page>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['rows', 'columns', 'selected', 'prefix'],
  emits: ['update:selected', 'action:edit', 'action:delete'],
  setup(props) {
    return {
      tableProps: props
    }
  }
})
</script>

