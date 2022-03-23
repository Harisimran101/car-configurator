import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/DRACOLoader.js';

import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
// import { PMREMGenerator } from 'https://cdn.skypack.dev/three@0.136/examples/src/extras/PMREMGenerator.js'

// UI Login 

// Model Section

const modelitems = document.querySelectorAll('.models');

for(let i = 0; i < modelitems.length; i++){

    modelitems[i].addEventListener('click', () =>{
      console.log(modelitems[i])
       for(let i = 0; i < modelitems.length; i++){

        modelitems[i].classList.remove('active-model');
       }


      modelitems[i].classList.add('active-model');

    })
     
}


// END

const sections = [];
const modelsection = document.querySelector('.model-tab-container');
const colorsection = document.querySelector('.color-tab-container');

sections.push(modelsection);
sections.push(colorsection);

for(let i = 0; i < sections.length; i++){
   sections[i].style.display = 'none';
}


const sectionbtns = document.querySelectorAll('.section-btn');
console.log(sections)

for(let i = 0; i < sectionbtns.length; i++){
  sectionbtns[i].addEventListener('click', () =>{

      for(let i = 0; i < sections.length; i++){
        sections[i].classList.remove('section-active');
        sectionbtns[i].classList.remove('active-btn');

      }

        sections[i].classList.add('section-active');
        sectionbtns[i].classList.add('active-btn');

  }) 

}


//scene
function init(){

  let model1,model2,model3;



  

const scene = new THREE.Scene()

//size

const size = {
  with: window.innerWidth,
  height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(50, size.with / size.height)
camera.position.set(-9,5,-10)
scene.add(camera)

//canvas

const canvas = document.querySelector('.webgl')

//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,

})
renderer.setSize(size.with, size.height)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;

// Texture Loader 



const textureloader = new THREE.TextureLoader();
let groundshadow = textureloader.load('Environment/negy.jpg');

const carmaterial = new THREE.MeshPhysicalMaterial({
  color: 'black',
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 1.4,
  specular: 1.4,
})

const planegeometry = new THREE.BoxGeometry(60,90,0.05);
const planematerial = new THREE.MeshStandardMaterial({
     map: groundshadow,
     roughness: 0.7
})

const plane = new THREE.Mesh(planegeometry,planematerial);
scene.add(plane);
plane.rotation.x = Math.PI / 2
// Light 

const directionalLight = new THREE.DirectionalLight( 'white', 1 );
scene.add( directionalLight );
directionalLight.position.set(-3,4,2)

//hdr texture

let envtexture;

const path = 'Environment/';
				const format = '.jpg';
				const urls = [
					path + 'posx' + format, path + 'negx' + format,
					path + 'posy' + format, path + 'negy' + format,
					path + 'posz' + format, path + 'negz' + format
				];

				const refractionCube = new THREE.CubeTextureLoader().load( urls );
				refractionCube.mapping = THREE.CubeRefractionMapping;

scene.background = refractionCube;

function updatematerials() {
  scene.traverse((child) =>{
     if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
        child.material.envMap = refractionCube;
        child.material.envMapIntensity = 3;

     };
  })
}


const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath( 'draco/' );

let body;
let modeltoload = '1';

const updatemodels = () =>{
 

  for(let i = 0; i < modelitems.length; i++){
     modelitems[i].addEventListener('click', () =>{
      
       

     })

  }
} 

const gltfloader = new GLTFLoader()
gltfloader.setDRACOLoader(dracoloader);

 switch(modeltoload){
   case '1':

    gltfloader.load(
      'car-1.glb',
      (gltf) => {
        model1 = gltf.scene;
      
        let carbody = model1.getObjectByName('Car-body');
        carbody.material = carmaterial;
    
       
        model1.scale.set(4,4,4);
        scene.add(model1);

        updatemodels();
    
        model1.traverse(function (child) {
        
          child.castShadow = true;
    
          if (child.material && child.material.name === 'carpaint') {
            child.material = carmaterial
          }
    
       
        })
    
        updatematerials();
      
      })

      break;

      case '2':

      
         
        gltfloader.load(
          'car2.glb',
          (gltf) => {
            model1 = gltf.scene;
          
            let carbody = model1.getObjectByName('Car-body');
            carbody.material = carmaterial;
        
           
            model1.scale.set(4,4,4);
            scene.add(model1);
    
            updatemodels();
        
            model1.traverse(function (child) {
            
              child.castShadow = true;
        
              if (child.material && child.material.name === 'carpaint') {
                child.material = carmaterial
              }
        
           
            })
        
            updatematerials();
          
          })


      break;

      case '3':

      
         
        gltfloader.load(
          'car3.glb',
          (gltf) => {
            model1 = gltf.scene;
          
        
           
            model1.scale.set(4,4,4);
            scene.add(model1);
    
            updatemodels();
        
            model1.traverse(function (child) {
            
              child.castShadow = true;
        
              if (child.material && child.material.name === 'carpaint') {
                child.material = carmaterial
              }
        
           
            })
        
            updatematerials();
          
          })


      break;
    
 }

// Camera controls

const controls = new OrbitControls(camera, canvas)
controls.maxPolarAngle = Math.PI / 2;
controls.enableDamping = true
controls.enablePan = false;
controls.target.set(0,0,0);
controls.maxPolarAngle = Math.PI /2.2; 


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

//clock

const clock = new THREE.Clock()

//animation

const tick = () => {

  const elipsed = clock.getElapsedTime()

  //tick renderer

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)

}
tick()

};

init();