<template>
  <!-- <div class="map"> -->
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      v-model:bounds="bounds"
      :zoomAnimation="true"
      :center="[47.41322, -1.219482]"
      :worldCopyJump="true"
      @update:bounds="boundsUpdated"
      @ready="ready"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" :attribution="attribution"/>
      <template v-if="mini">
        <LCircleMarker v-for="(item, i) in items" :key="i" :lat-lng="item.coords" :radius="1" :opacity="0.7" className="marker-mini">
        </LCircleMarker>
      </template>
      <template v-else>
        <LCircleMarker v-for="(item, i) in items" :key="i" :lat-lng="item.coords" @click="$router.push({ name: mode, params: { id: item.id }})" :radius="5" :opacity="1" :fill="true" :fillOpacity="1" :weight="1" color="#ffffff" className="marker-big">
          <l-tooltip>
            {{ item.title }}
          </l-tooltip>
        </LCircleMarker>
      </template>
  </l-map>
  <!-- </div> -->
</template>
<script>
import {
  LMap,
  // LIcon,
  LTileLayer,
  LCircleMarker,
  LTooltip
// LPopup,
// LPolyline,
// LPolygon,
// LRectangle
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { ref } from 'vue'
import { useMainStore } from '@/store/main'
export default {
  name: 'TheMap',
  components: {
    LMap,
    // LIcon,
    LTileLayer,
    LCircleMarker,
    LTooltip
    // LPopup,
    // LPolyline,
    // LPolygon,
    // LRectangle,
  },
  props: ['mode', 'mini'],
  setup (props) {
    // const center = ref([0, 3000000])
    // console.log(a)
    // const projection = ref('EPSG:3857')
    const zoom = ref(props.mini ? 1 : 3)
    const bounds = ref(null)
    // const rotation = ref(0)
    const store = useMainStore()
    return {
      store,
      zoom,
      minizoom: 1,
      bounds,
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      // projection,
      // zoom,
      // rotation
    }
  },
  computed: {
    items () {
      return this.store.filteredForMap
    }
  },
  methods: {
    boundsUpdated (bounds) {
      console.log('w', bounds._southWest.lng)
      console.log('e', bounds._northEast.lng)
      this.store.bounds = {
        north: bounds._northEast.lat,
        east: (((bounds._northEast.lng + 180) % 360) + 360) % 360 - 180,
        south: bounds._southWest.lat,
        west: (((bounds._southWest.lng + 180) % 360) + 360) % 360 - 180
      }
    },
    ready (map) {
      // console.log(a.getBounds(), b, c)
      this.boundsUpdated(map.getBounds())
    }
    // updateZoom (zoom) {
    //   // console.log(this.zoom, zoom)
    //   this.zoom = zoom
    // }
  }
}
</script>

<style scoped lang="scss">
.map {
  background: var(--text);
}
</style>
<style lang="scss">
.leaflet-container {
  .marker-big {
    mix-blend-mode: multiply;

    &:hover {
      transform: translateZ(100px);
      fill: var(--accent-2);
      mix-blend-mode: normal;
    }
  }
  .marker-mini {
    mix-blend-mode: multiply;
    cursor: grab;
  }
}
</style>
