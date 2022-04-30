import { defineStore, acceptHMRUpdate } from 'pinia'
import { csvParse } from 'd3-dsv'

import configPositions from '@/assets/config/positions'
import configTransfers from '@/assets/config/transfers'

export const useMainStore = defineStore('main', {
  state: () => ({
    entries: [],
    filters: [],
    filter: {},
    query: ''
  }),
  getters: {
    filtered: state => {
      const query = state.query.toLowerCase()
      return state.entries.filter(d =>
        state.filters.every(({ id }) => state.filter[id] == null || state.filter[id] === d[id] || d[id][state.filter[id]]) &&
        (query === '' || new RegExp(`^${query}`).test(d.content) || new RegExp(`\\s${query}`).test(d.content))
      )
    },
    getItem: (state) => {
      return (id) => state.entries.find((item) => item.id === id) || {}
    }
  },
  actions: {
    async setMode (mode) {
      const entries = csvParse(await fetch(`https://ft0.ch/sfu/${mode}.csv`).then(res => res.text()))
      const config = mode === 'positions' ? configPositions : configTransfers
      this.filters = config.filters.map(f => {
        const options = f.options === 'columns'
          ? f.columns
          : [...new Set(entries.map(d => d[f.column]))]
              .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
        return {
          id: dash(f.label),
          label: f.label,
          type: f.type,
          options: [
            ...['radio', 'list'].includes(f.type) ? [{ label: 'Any', value: null }] : [],
            ...options
          ]
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
          fields: [
            ...config.fields.filter(f => !f.hidden).map(({ label, column }) => ({ label, value: d[column]?.split('\\n') })),
            ...config.filters.filter(f => f.options === 'columns').map(({ label, columns }) => ({ label, detail: true, value: [columns.filter(c => d[c] !== '').map(c => c.trim()).join(', ')] }))
          ],
          content: config.fields.map(({ column }) => d[column].toLowerCase()).join(' '),
          coords: [+d.lat, +d.lng]
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

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(acceptHMRUpdate(useMainStore, import.meta.webpackHot))
}
