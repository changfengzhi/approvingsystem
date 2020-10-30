<template>
<div>
  <nav-bar></nav-bar>
  
  <div id="main">
       <div id="viewDiv"></div>
    <span id="layerToggle" class="esri-widget">
      <input type="checkbox" id="streetsLayer" checked /> Transportation
    </span>
  </div>
  </div>

</template>

<script>
import NavBar from "../components/nav";

export default {
  name: "home",
  props: {
    msg: String,
  },
  components: {
    NavBar,
  },
  methods: {
    _createScenceView() {
      this.$esri
        .loadModules(
          ["esri/Map", "esri/views/SceneView", "esri/layers/TileLayer"],
          this.options
        )
        .then(([Map, SceneView, TileLayer]) => {
          var transportationLayer = new TileLayer({
            url:
              "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",
            // 此属性可用于唯一地标识该层
            id: "streets",
            visible: false,
          });

          let housingLayer = new TileLayer({
            url:
              "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
            id: "ny-housing",
            opacity: 0.9,
          });

          // 层可以在映射的构造函数中添加到映射中
          let map = new Map({
            basemap: "oceans",
            layers: [housingLayer],
          });

         //或者可以使用map.add()将它们添加到映射中
          map.add(transportationLayer);

          let view = new SceneView({
            container: "viewDiv",
            map: map,
          });

          /*****************************************************************
           * The map handles the layers' data while the view and layer views
           * take care of renderering the layers
           *****************************************************************/
          view.on("layerview-create", function (event) {
            if (event.layer.id === "ny-housing") {
              // Explore the properties of the population layer's layer view here
              console.log(
                "LayerView for male population created!",
                event.layerView
              );
            }
            if (event.layer.id === "streets") {
              // Explore the properties of the transportation layer's layer view here
              console.log("LayerView for streets created!", event.layerView);
            }
          });

          view.when(function () {
            housingLayer.when(function () {
              view.goTo(housingLayer.fullExtent).catch(function (error) {
                if (error.name != "AbortError") {
                  console.error(error);
                }
              });
            });
          });

          let streetsLayerToggle = document.getElementById("streetsLayer");

          /*****************************************************************
           * The visible property on the layer can be used to toggle the
           * layer's visibility in the view. When the visibility is turned off
           * the layer is still part of the map, which means you can access
           * its properties and perform analysis even though it isn't visible.
           *******************************************************************/
          streetsLayerToggle.addEventListener("change", function () {
            transportationLayer.visible = streetsLayerToggle.checked;
          });
        });
    },
  },
  mounted: function () {
    this._createScenceView();
  },
};
</script>

<style scoped>
#main {
  position: absolute;
  width:calc( 100% - 50px);
  height:calc( 100% - 50px);
}
html,
body,
#viewDiv {
  padding: 0;
  margin: 0;
  height:100%;
  width:100%;
  /* width: calc( 100% - 50px); */
}

#layerToggle {
  top: 20px;
  right: 20px;
  position: absolute;
  z-index: 99;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  opacity: 0.75;
}
</style>
