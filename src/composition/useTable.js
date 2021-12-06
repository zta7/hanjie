import { ref, onMounted } from 'vue'
import { Dialog } from 'quasar'
import confirmDialog from 'components/Dialogs/Confirm'
import alertDialog from 'components/Dialogs/Alert'
import { debounce } from 'lodash'

export const useTable = $api => {
  const loading = ref(true)
  const rows = ref([])
  const selected = ref([])
  const pagination = ref({
    sortBy: '',
    descending: '',
    page: 1,
    rowsPerPage: 5,
    rowsNumber: 10
  })
  const filter = ref({})
  const onRequest = debounce(props => {
    loading.value = true
    if (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      $api({
        pagination: props.pagination,
        filter: props.filter
      }).then(r => {
        console.log(r, props.filter)
        loading.value = false
        rows.value.splice(0, rows.value.length, ...r.rows)
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
        pagination.value.rowsNumber = r.rowsNumber
      })
    }
    else {
      //  方便手动触发
      $api({
        pagination: pagination.value,
        filter: filter.value
      }).then(r => {
        loading.value = false
        rows.value.splice(0, rows.value.length, ...r.rows)
        pagination.value.rowsNumber = r.rowsNumber
      })
    }
  }, 200)

  const useDelete = $api => {
    const onDelete = row => {
      Dialog.create({
        component: confirmDialog,
        componentProps: {
          content: 'areYouSureToDelete'
        }
      }).onOk(async() => {
        $api({ ...row }).then(() => {
          onRequest()
        })
      })
    }
    return { onDelete }
  }

  const usePut = ($api, dialogProps) => {
    const onPut = row => {
      Dialog.create({
        ...dialogProps,
        componentProps: {
          target: row
        }
      }).onOk(values => {
        $api(values).then(r => {
          onRequest()
        })
      })
    }
    return { onPut }
  }

  const useBatchPut = ($api, dialogProps) => {
    const onBatchPut = () => {
      if (selected.value.length === 0) {
        Dialog.create({
          component: alertDialog,
          componentProps: {
            content: 'pleaseSelectDataToBeEdited'
          }
        })
      }
      else {
        Dialog.create({
          ...dialogProps,
          componentProps: {
            target: selected.value
          }
        }).onOk(values => {
          $api(values).then(r => {
            selected.value
            onRequest()
          })
        })
      }
    }
    return { onBatchPut }
  }

  const useExport = ($api, header) => {
    const loading = ref(false)
    const onExport = () => {
      const XLSX = require('xlsx')
      let ws, wb, wbout
      if (selected.value && selected.value.length > 0) {
        ws = XLSX.utils.json_to_sheet(selected.value, header)
        wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, '')
        wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'binary'
        })
        require('downloadjs')(wbout, 'sheetjs.xlsx', 'application/octet-stream')
      }
      else {
        loading.value = true
        $api().then(r => {
          ws = XLSX.utils.json_to_sheet(r.rows)
          wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, '')
          wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'binary'
          })
          require('downloadjs')(wbout, 'sheetjs.xlsx', 'application/octet-stream')
          loading.value = false
        })
      }
    }
    return {
      loading,
      onExport
    }
  }

  onMounted(() => {
    onRequest()
  })

  return {
    selected,
    loading,
    rows,
    pagination,
    filter,
    onRequest,
    useExport,
    useDelete,
    useBatchPut,
    usePut
  }
}
