import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/DRACOLoader.js';

import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
// import { PMREMGenerator } from 'https://cdn.skypack.dev/three@0.136/examples/src/extras/PMREMGenerator.js'

//scene
function init(){

const scene = new THREE.Scene()

//size

const size = {
  with: window.innerWidth,
  height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(65, size.with / size.height)
camera.position.set(1.2, 1.8, 11)
scene.add(camera)

//canvas

const canvas = document.querySelector('.webgl')

//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,

})
renderer.setSize(size.with, size.height)
renderer.setPixelRatio(window.devicePixelRatio * 2);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;

// Texture Loader 



const textureloader = new THREE.TextureLoader();
let groundshadow = textureloader.load('images/ground-shadow.png');


const carmaterial = new THREE.MeshPhysicalMaterial({
  color: 'red',
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 1.4,
  specular: 1.4,
})

//hdr texture

let envtexture;

const rgb = new RGBELoader()
rgb.load(
  'environment3.hdr',
  (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping,
      scene.background = texture;
      envtexture = texture;
    
     
  }
)

function updatematerials() {
  scene.traverse((child) =>{
     if(child instanceof THREE.Mesh){
        child.material.envMap = envtexture;
        child.material.envMapIntensity = 1.7;

     };
  })
}


const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath( 'draco/' );

let body;
let model;

const gltfloader = new GLTFLoader()
gltfloader.setDRACOLoader(dracoloader);

gltfloader.load(
  'car-file.gltf',
  (gltf) => {
    model = gltf.scene;
    let ground = model.getObjectByName('Plane');
    let carbody = model.getObjectByName('Car-body');
    carbody.material = carmaterial;

    ground.material.map = groundshadow;
    ground.scale.set(7.3,7.3,7.3);
    model.scale.set(3, 3, 3);
    scene.add(model);

    model.traverse(function (child) {
    
      child.castShadow = true;

      if (child.material && child.material.name === 'carpaint') {
        child.material = carmaterial
      }
    })

    updatematerials();

  
  }
)

//controls

const controls = new OrbitControls(camera, canvas)
controls.maxPolarAngle = Math.PI / 2;
controls.enableDamping = true




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