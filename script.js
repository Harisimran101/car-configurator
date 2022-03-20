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

//material + button input

let carcolor = document.querySelector('.button')
let carcolor2 = document.querySelector('.button2')
let carcolor3 = document.querySelector('.button3')
let carcolor4 = document.querySelector('.button4')
let carcolor5 = document.querySelector('.button5')

carcolor.addEventListener('click', () => {
  let carcolorvalue = carcolor.value;
  carmaterial.color.set(carcolorvalue);
})

carcolor2.addEventListener('click', () => {
  let carcolorvalue = carcolor2.value;
  carmaterial.color.set(carcolorvalue);
})

carcolor3.addEventListener('click', () => {
  let carcolorvalue = carcolor3.value;
  carmaterial.color.set(carcolorvalue);
})
carcolor4.addEventListener('click', () => {
  let carcolorvalue = carcolor4.value;
  carmaterial.color.set(carcolorvalue);
})
carcolor5.addEventListener('click', () => {
  let carcolorvalue = carcolor5.value;
  carmaterial.color.set(carcolorvalue);
})
const carmaterial = new THREE.MeshPhysicalMaterial({
  metalness: 0.4,
  roughness: 0.7,
  clearcoat: 0.2
})
carmaterial.color.set(carcolor.value);

//hdr texture

const rgb = new RGBELoader()
rgb.load(
  'hdr2.hdr',
  (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping,
      scene.environment = texture;
  }
)

let bcg;
const rgb1 = new RGBELoader()
rgb1.load(
  'hdr2.hdr',
  (back) => {
    back.mapping = THREE.EquirectangularReflectionMapping,
      scene.background = back;
  }
)


//model

// let room;
// const loader2 = new GLTFLoader()
// loader2.load(
//   'scene.gltf',
//   (glb) => {
//     room = glb.scene;
//     room.position.set(0, 5.6, 0)
//     scene.add(room);
//   }
// )

let body;
let model;
const loader = new GLTFLoader()
loader.load(
  'unt.glb',
  (gltf) => {
    model = gltf.scene;
    model.scale.set(3, 3, 3);
    body = model.getObjectByName('carbody2');
    scene.add(model);

    model.traverse(function (child) {
      if (child.material && child.material.name === 'paint') {
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
  alpha: true
})
renderer.setSize(size.with, size.height)
renderer.setPixelRatio(window.devicePixelRatio / 1.3);

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
  model.rotation.y = elipsed / 10
}
tick()