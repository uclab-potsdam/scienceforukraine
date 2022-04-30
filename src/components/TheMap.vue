<template>
  <!-- <div class="map"> -->
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :zoomAnimation="true"
      :center="[47.41322, -1.219482]"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <l-control-layers />
      <l-marker v-for="(item, i) in items" :key="i" :lat-lng="item.coords" @click="$router.push({ name: mode, params: { id: item.id }})">
        <l-tooltip>
          {{ item.title }}
        </l-tooltip>
      </l-marker>
  </l-map>
  <!-- </div> -->
</template>
<script>
import {
  LMap,
  // LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip
// LPopup,
// LPolyline,
// LPolygon,
// LRectangle
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { useMainStore } from '@/store/main'
export default {
  name: 'TheMap',
  components: {
    LMap,
    // LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip
    // LPopup,
    // LPolyline,
    // LPolygon,
    // LRectangle,
  },
  props: ['mode'],
  setup () {
    // const center = ref([0, 3000000])
    // const projection = ref('EPSG:3857')
    // const zoom = ref(3)
    // const rotation = ref(0)
    const store = useMainStore()
    return {
      store,
      zoom: 5
      // projection,
      // zoom,
      // rotation
    }
  },
  computed: {
    items () {
      return this.store.filtered
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.map {
  background: var(--text);
}
</style>
