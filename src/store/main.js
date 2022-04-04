import { defineStore } from 'pinia'
import { csvParse } from 'd3-dsv'

import configPositions from '@/assets/config/positions'
import configTransfers from '@/assets/config/transfers'

export const useMainStore = defineStore('main', {
  state: () => ({
    entries: [],
    filters: [],
    filter: {}
  }),
  getters: {
    filtered: state => {
      return state.entries.filter(d =>
        state.filters.every(({ id }) => state.filter[id] == null || state.filter[id] === d[id] || d[id][state.filter[id]])
      )
    },
    getItem: (state) => {
      return (id) => state.entries.find((item) => item.id === id) || {}
    }
  },
  actions: {
    async setMode (mode) {
      const entries = csvParse(await fetch(`./${mode}.csv`).then(res => res.text()))
      const config = mode === 'positions' ? configPositions : configTransfers
      this.filters = config.filters.map(f => {
        return {
          id: dash(f.label),
          label: f.label,
          type: f.type,
          options: f.options === 'columns'
            ? f.columns
            : [...new Set(entries.map(d => d[f.column]))].sort((a, b) => {
                if (a.toLowerCase() < b.toLowerCase()) {
                  return -1 // nameA comes first
                } else {
                  return 1
                }
              })
        }
      })
      this.filter = Object.fromEntries(this.filters.map(d => [d.id, null]))
      this.entries = entries.map(d => {
        return {
          title: d[config.mappings.title],
          id: d[config.mappings.id],
          web: d[config.mappings.web],
          mail: d[config.mappings.mail],
          meta: config.mappings.meta.map(m => d[m]),
          ...Object.fromEntries(config.filters.map(f => {
            const value = f.options === 'columns'
              ? Object.fromEntries(f.columns.map(c => [c, d[c] !== '']))
              : d[f.column]
            return [dash(f.label), value]
          })),
          fields: config.fields.map(({ label, column }) => ({ label, value: d[column]?.split('\\n') }))
        }
      }).sort((a, b) => {
        return +a.id.slice(1) < +b.id.slice(1) ? 1 : -1
      })
    }
  }
})

function dash (str) {
  return str.toLowerCase().replace(/ /g, '-')
}
