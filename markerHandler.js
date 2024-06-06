model_list = []
AFRAME.registerComponent("marker-handler",{
    init: async function(){
        var model = await this.placeTheModel()
        this.el.addEventListener("markerFound", () =>{
            Model_name = this.el.getAttribute("model_name")
            barcode_value = this.el.getAttribute("barcode_value")
            model_list.push({model_name:Model_name, barcode_value:barcode_value})

            model[barcode_value]["models"].map(item => {
                var models = document.querySelector(`#${item.model_name}-${barcode_value}`);
                models.setAttribute("visiblity", true)
            })
        });
        this.el.addEventListener("markerLost", () =>{
            Model_name = this.el.getAttribute("model_name")
            var index = model_list.findIndex(x=>x.model_name === Model_name)
            if(index>-1){
                model_list.splice(index, 1)
            }
        })   
    },
    getDistance:function(elA, elB){
        return elA.object3D.postion.distanceTo(el.B.object3D.position);
    },
    getModelGeometry:function(models, Model_name){
        var barcodes = Oject.keys(models)
        for(var barcode of barcodes){
            if(models[barcode].model_name===Model_name){
                return{
                    position:models[barcode]["placement_position"],
                    rotation:models[barcode]["placement_rotation"],
                    scale:models[barcode]["placement_scale"],
                    model_url:models[barcode]["model_url"]
                }
            }
        }
    },
    placeTheModel:function(Model_name, models){
        var isListContainModel = this.isModelPresentInArray(model_list, Model_name)
        if(isListContainModel){
            var distance = null
            var marker1 = document.querySelector(`#marker-base`)
            var marker2 = document.querySelector(`#marker-${Model_name}`);

            distance = this.getDistance(marker1, marker2);
            if(distance < 1.25){
                var ModelEl = document.querySelector(`#${Model_name}`);
                ModelEl.setAttribute("visible", false);
                
                var isModelPlaced = document.querySelector(`#model-${Model_name}`);
                if(isModelPlaced === null){
                    var el = doument.createElement("a-entity")
                    var modelGeometry = this.getModelGeometry(models, Model_name);
                    el.setAttribute("id", `model-${modelName}`);
                    el.setAttribute("gltf-model", `url(${modelGeometry.model_url})`);
                    el.setAttribute("id", modelGeometry.position);
                    el.setAttribute("id", modelGeometry.rotation);
                    el.setAttribute("id", modelGeometry.scale);
                    marker1.appendChild(el)
                }
            }
        }
    },
    isModelPresentInArray:function(arr, val){
        for(var i in arr){
            if(i.Model_name == val){
                return true
            }
        }
        return false
    },
    tick:async function(){
        if(model_list.length > 1){
            var isBaseModelPresent = this.isModelPresentInArray(model_list, "base");
            var messageText = document.querySelector("#messageText");

            if(!isBaseModelPresent){
                messageText.setAttribute("visible", true)
            }
            else{
                if(model === null){
                    models = await this.getModels();
                }
                messageText.setAttribute("visible", false);
                this.placeTheModel("road", models);
                this.placeTheModel("car", models);
                this.placeTheModel("sun", models);
            }
        }
    }
})