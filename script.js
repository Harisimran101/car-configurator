import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
// import { PMREMGenerator } from 'https://cdn.skypack.dev/three@0.136/examples/src/extras/PMREMGenerator.js'

//scene

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

const rgb = new RGBELoader()
rgb.load(
  'hdr2.hdr',
  (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping,
      scene.environment = texture;
      scene.background = texture;
  }
)


let body;
let model;
const loader = new GLTFLoader()
loader.load(
  'car-1.glb',
  (gltf) => {
    model = gltf.scene;
    let ground = model.getObjectByName('Plane');
    let carbody = model.getObjectByName('Car-body');
    carbody.material = carmaterial;
    ground.material.map = groundshadow;
    model.scale.set(3, 3, 3);
    scene.add(model);

    model.traverse(function (child) {
      if (child.material && child.material.name === 'carpaint') {
        child.material = carmaterial
      }
    })
  }
)

//controls

const controls = new OrbitControls(camera, canvas)
controls.maxPolarAngle = Math.PI / 2;
controls.enableDamping = true

//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,

})
renderer.setSize(size.with, size.height)
renderer.setPixelRatio(window.devicePixelRatio);

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