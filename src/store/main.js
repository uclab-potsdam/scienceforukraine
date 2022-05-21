import { defineStore, acceptHMRUpdate } from 'pinia'
import { csvParse, autoType } from 'd3-dsv'

import mappings from '@/assets/config/mappings'

export const useMainStore = defineStore('main', {
  state: () => ({
    entries: [],
    filters: mappings.filters,
    filter: Object.fromEntries(mappings.filters.map(f => {
      return f.type === 'toggle' ? [f.key, false] : [f.name, null]
    })),
    filterByMapExtent: false,
    query: '',
    view: 'list',
    bounds: {}
  }),
  getters: {
    filtered: (state) => {
      const checkBounds = state.filterByMapExtent || state.view === 'map'
      const query = state.query.toLowerCase()
      return state.entries.filter(d => {
        const inQuery = query === '' || new RegExp(`\\b${query}`, 'i').test(mappings.searchFields.map(key => d[key]).join(' '))
        const inBounds = !checkBounds || (state.bounds.north > d.lat && state.bounds.south < d.lat && (
          state.bounds.east > state.bounds.west ? (d.lng < state.bounds.east && d.lng > state.bounds.west) : (d.lng < state.bounds.east || d.lng > state.bounds.west)
        ))
        const inFilter = state.filters.every(f => {
          if (f.category == null || state.filter.category !== f.category) return true
          if (f.type === 'toggle') return state.filter[f.key] === false || d[f.key] === 1
          if (state.filter[f.name] === null) return true
          if (f.type === 'radio') return d[state.filter[f.name]] === 1
          if (f.type === 'select') return d[f.name] === state.filter[f.name]
          return true
        })
        return inQuery && inBounds && inFilter
      })
    },
    filteredForMap: state => {
      const query = state.query.toLowerCase()
      return state.entries.filter(d => {
        const inQuery = query === '' || new RegExp(`\\b${query}`, 'i').test(mappings.searchFields.map(key => d[key]).join(' '))
        const inFilter = state.filters.every(f => {
          if (f.type === 'toggle') return state.filter[f.key] === false || d[f.key] === 1
          if (state.filter[f.name] === null) return true
          if (f.type === 'radio') return d[state.filter[f.name]] === 1
          if (f.type === 'select') return d[f.name] === state.filter[f.name]
          return true
        })
        return inQuery && inFilter
      })
    },
    getItem: (state) => {
      return (id) => state.entries.find((item) => item.id === id) || {}
    }
  },
  actions: {
    async init (mode) {
      this.entries = csvParse(await fetch('https://ft0.ch/sfu/data.csv').then(res => res.text()), autoType)
      this.filters.filter(f => f.type === 'select').forEach(f => {
        f.options = [...new Set(this.entries.map(d => d[f.key]))].sort()
      })
      // this.filters = [...this.filters]
      // this.filters = config.filters.map(f => {
      //   const options = f.options === 'columns'
      //     ? f.columns
      //     : [...new Set(entries.map(d => d[f.column]))]
      //         .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
      //   return {
      //     id: dash(f.label),
      //     label: f.label,
      //     type: f.type,
      //     options: [
      //       ...['radio', 'list'].includes(f.type) ? [{ label: 'Any', value: null }] : [],
      //       ...options
      //     ]
      //   }
      // })
      // this.filter = Object.fromEntries(this.filters.map(d => [d.id, null]))
      // this.entries = entries.map(d => {
      //   return {
      //     title: d[config.mappings.title],
      //     id: d[config.mappings.id],
      //     web: d[config.mappings.web],
      //     mail: d[config.mappings.mail],
      //     meta: config.mappings.meta.map(m => d[m]),
      //     ...Object.fromEntries(config.filters.map(f => {
      //       const value = f.options === 'columns'
      //         ? Object.fromEntries(f.columns.map(c => [c, d[c] !== '']))
      //         : d[f.column]
      //       return [dash(f.label), value]
      //     })),
      //     fields: [
      //       ...config.fields.filter(f => !f.hidden).map(({ label, column }) => ({ label, value: d[column]?.split('\\n') })),
      //       ...config.filters.filter(f => f.options === 'columns').map(({ label, columns }) => ({ label, detail: true, value: [columns.filter(c => d[c] !== '').map(c => c.trim()).join(', ')] }))
      //     ],
      //     content: config.fields.map(({ column }) => d[column].toLowerCase()).join(' '),
      //     coords: [+d.lat, +d.lng]
      //   }
      // }).sort((a, b) => {
      //   return +a.id.slice(1) < +b.id.slice(1) ? 1 : -1
      // })
    }
    // async setMode (mode) {
    //   const entries = csvParse(await fetch(`https://ft0.ch/sfu/${mode}.csv`).then(res => res.text()))
    //   const config = mode === 'positions' ? configPositions : configTransfers
    //   this.filters = config.filters.map(f => {
    //     const options = f.options === 'columns'
    //       ? f.columns
    //       : [...new Set(entries.map(d => d[f.column]))]
    //           .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
    //     return {
    //       id: dash(f.label),
    //       label: f.label,
    //       type: f.type,
    //       options: [
    //         ...['radio', 'list'].includes(f.type) ? [{ label: 'Any', value: null }] : [],
    //         ...options
    //       ]
    //     }
    //   })
    //   this.filter = Object.fromEntries(this.filters.map(d => [d.id, null]))
    //   this.entries = entries.map(d => {
    //     return {
    //       title: d[config.mappings.title],
    //       id: d[config.mappings.id],
    //       web: d[config.mappings.web],
    //       mail: d[config.mappings.mail],
    //       meta: config.mappings.meta.map(m => d[m]),
    //       ...Object.fromEntries(config.filters.map(f => {
    //         const value = f.options === 'columns'
    //           ? Object.fromEntries(f.columns.map(c => [c, d[c] !== '']))
    //           : d[f.column]
    //         return [dash(f.label), value]
    //       })),
    //       fields: [
    //         ...config.fields.filter(f => !f.hidden).map(({ label, column }) => ({ label, value: d[column]?.split('\\n') })),
    //         ...config.filters.filter(f => f.options === 'columns').map(({ label, columns }) => ({ label, detail: true, value: [columns.filter(c => d[c] !== '').map(c => c.trim()).join(', ')] }))
    //       ],
    //       content: config.fields.map(({ column }) => d[column].toLowerCase()).join(' '),
    //       coords: [+d.lat, +d.lng]
    //     }
    //   }).sort((a, b) => {
    //     return +a.id.slice(1) < +b.id.slice(1) ? 1 : -1
    //   })
    // }
  }
})

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(acceptHMRUpdate(useMainStore, import.meta.webpackHot))
}
