AFRAME.registerComponent("objects", {
    init: async function(){
        var object = await this.getObjects()
        var barcode = Object.keys(object);

        barcode.map(barcode => {
            var element = object[barcode];

            this.createObjects(element);
        });
    },
    getObjects:function(element){
        return fetch("model.json")
        .then(res => res.json())
        .then(data => data);
    },
    createObjects: async function(){
        var objectName = element.model_name
        var barcodeValue = element.barcode_value
        var gltfModel = element.model_url

        var scene = document.querySelector("a-scene");

        var marker = document.createElement("a-marker");
        marker.setAttribute("id", `marker-${barcodeValue}`);
        marker.setAttribute("type", "barcode");
        marker.setAttribute("element_name", elementName);
        marker.setAttribute("value", barcodeValue);

        scene.appendChild(marker)

        var object = document.createElement("a-entity");
        object.setAttribute("id", `${elementName}-${barcodeValue}`);
        marker.appendChild("object");

        object_gltf = document.createElement("a-entity");
        object_gltf.setAttribute("id", `objectGltf-${elementName}`);
        object_gltf.setAttribute("position", element.position);
        object_gltf.setAttribute("rotation", element.rotation);
        object_gltf.setAttribute("scale", element.scale);

        object.appendChild(object_gltf);
        marker.appendChild(object);
    }
})