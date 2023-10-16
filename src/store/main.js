import { defineStore, acceptHMRUpdate } from 'pinia'
import { csvParse, autoType } from 'd3-dsv'

import mappings from '@/assets/config/mappings'
import institutionsMappings from '@/assets/config/institutionsMappings'

export const useMainStore = defineStore('main', {
  state: () => ({
    entries: [],
    filters: mappings.filters,
    institutionFilters: institutionsMappings.filters,
    filter: Object.fromEntries(mappings.filters.map(f => {
      return f.type === 'toggle' ? [f.key, false] : [f.name, null]
    })),
    query: ''
  }),
  getters: {
    filtered: (state) => {
      const query = state.query.toLowerCase()
      return state.entries.filter(d => {
        const inQuery = query === '' || new RegExp(`\\b${query}`, 'i').test(mappings.searchFields.map(key => d[key]).join(' '))
        const inFilter = state.filters.every(f => {
          if (f.category != null && state.filter.category !== f.category) return true
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
      this.entries = csvParse(await fetch('https://ft0.ch/sfu/data.csv', { cache: 'no-cache' }).then(res => res.text()), autoType).reverse().map(d => {
        const categories = ['Position', 'Scholarship', 'Joint application', 'Resources', 'Mentoring', 'Academic transfer']
        return { ...d, ...Object.fromEntries(categories.map((c, i) => [c, d.category === i ? 1 : 0])) }
      })
      this.filters.filter(f => f.type === 'select').forEach(f => {
        f.options = [...new Set(this.entries.map(d => d[f.key]))].sort()
      })
    },
    async initInstitutions (mode) {
      this.entries = csvParse(await fetch('https://ft0.ch/sfu/ua.csv', { cache: 'no-cache' }).then(res => res.text()), autoType).reverse()
      this.institutionFilters.filter(f => f.type === 'select').forEach(f => {
        f.options = [...new Set(this.entries.map(d => d[f.key]))].sort()
      })
    }
  }
})

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(acceptHMRUpdate(useMainStore, import.meta.webpackHot))
}
