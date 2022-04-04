import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/DRACOLoader.js';
import {RGBELoader} from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader";

// import { PMREMGenerator } from 'https://cdn.skypack.dev/three@0.136/examples/src/extras/PMREMGenerator.js'

// UI Login 


// Model Section
const activetab = '1';

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
const camerasection = document.querySelector('.camera-tab-container');

sections.push(modelsection);
sections.push(colorsection);
sections.push(camerasection);


for(let i = 0; i < sections.length; i++){
  sections[i].style.display = 'none';
}



const sectionbtns = document.querySelectorAll('.section-btn');
console.log(sections)

for(let i = 0; i < sectionbtns.length; i++){
  sections[i].classList.remove('section-active');

  sectionbtns[i].addEventListener('click', () =>{

      for(let i = 0; i < sections.length; i++){
        sections[i].classList.remove('section-active');
        sectionbtns[i].classList.remove('active-btn');

      }

        sections[i].classList.add('section-active');
        sectionbtns[i].classList.add('active-btn');

  }) 

}

switch(activetab){
   case '1':

    //  console.log(sectionbtns[0]);
    // sectionbtns[0].classList.add('active-btn');
    
   break;

   case '2':

   break;
}

// Color Section 

const colordata = [
      {
       color: 'yellow'
    },

     {
      color: '#1D36F9'
   },

     {
       color: 'green',
    },

     {
      color: 'purple',
   },

   {
    color: 'blue',
   },

   {
  color: 'green',
   },

   {
    color: 'grey'  
   },

   {
    color: 'purple',
   },

  {
      color: 'orange'  
   },

   {
    color: '#168E55'  
 }

   
]



const colormaterial = {
 
  metalness: 0.6,
  roughness: 0.3,
  clearcoat: 1.4,
  specular: 1.4,
}


  


//scene
function init(){


  let model1,model2,model3;
  let carmaterial;

  let colorbtn;

  const colortab = document.querySelector('.color-variants');

  for(let i = 0; i < colordata.length; i++){
  
     colorbtn = document.createElement('div');
    colorbtn.classList.add('color-btn');
    colorbtn.style.background = colordata[i].color;  
    colortab.appendChild(colorbtn);
    
  }



  function updatecolors(){
     const allcolors = document.querySelectorAll('.color-btn');


 

   
     for(let i = 0; i < allcolors.length; i++){

      allcolors[i].addEventListener('click', () =>{
        
         Object.assign(carmaterial, colormaterial);

         for(let i = 0; i < allcolors.length; i++){

         allcolors[i].classList.remove('active-color');

         };

         allcolors[i].classList.add('active-color');
        
         carmaterial.color.set(allcolors[i].style.background);
         carmaterial.needUpdate = true
      })
       
    }
    
 

  }

  
 


const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xa0a0a0, 45, 90 );
//size

const canvas = document.querySelector('.webgl')

const size = {
  width: canvas.offsetWidth,
  height: canvas.offsetHeight
}

//camera
const camera = new THREE.PerspectiveCamera(50, size.width / size.height)
camera.position.set(6,3,3)
scene.add(camera)




//canvas


//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,

})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;

// Texture Loader 


const groundtextureloader = new THREE.TextureLoader();

carmaterial = new THREE.MeshPhysicalMaterial({
  color: 'red',
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 1.4,
  specular: 1.4,
})

const groundgeometry = new THREE.BoxGeometry(1000,1000,0.1);
const groundmaterial = new THREE.MeshStandardMaterial({
   color: 'white',
})

const ground = new THREE.Mesh(groundgeometry,groundmaterial);
scene.add(ground);
ground.rotation.x = Math.PI / 2
ground.position.y = -0.4;




// Light 

const directionalLight = new THREE.DirectionalLight( 'white', 1 );
scene.add( directionalLight );
directionalLight.position.set(-3,4,2)

//hdr texture


const path = 'Environment/';
 
const envtexture = new THREE.CubeTextureLoader().load([
  path + 'negx.jpg',
 
  path + 'negz.jpg',


  path + 'posx.jpg',
  path + 'negy.jpg',
  path + 'posy.jpg',
  path + 'posz.jpg',



]) 


function updatematerials() {
  scene.traverse((child) =>{
     if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
        child.material.envMap = envtexture;
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

let model2show = false;

const gltfloader = new GLTFLoader()
gltfloader.setDRACOLoader(dracoloader);


function load1model(){
    gltfloader.load(
      'car-1.gltf',
      (gltf) => {
        model1 = gltf.scene;
      
        const carbody = model1.getObjectByName('Car-body');
      
        model1.scale.set(1,1,1);
        scene.add(model1);
        console.log(model1.getObjectByName('defaultview'));
        
      

        updatemodels();
         

        model1.traverse(function (child) {
        
          child.castShadow = true;

      

          if (child.material && child.material.name === 'carpaint') {
            child.material = carmaterial;
          }
          
       
        })
     
       
       
        updatematerials();
        updatecolors()
   

      })

    };

    load1model();

      modelitems[0].addEventListener('click', () =>{
        scene.remove(model1);
        scene.remove(model3);
        scene.remove(model2)

        load1model();
 
        model2show = true
     })

   
      modelitems[1].addEventListener('click', () =>{
        scene.remove(model3);
        scene.remove(model2);
        scene.remove(model1)

      
   
          load2model();
     

       
      
        model2show = true
     })

     modelitems[2].addEventListener('click', () =>{
      scene.remove(model2);
      scene.remove(model1);
      scene.remove(model3);

      load3model();
    
      model2show = true
   })

     
    
    function load2model(){
        gltfloader.load(
          'car2.glb',
          (gltf) => {
            model2 = gltf.scene;
          
            const carbody = model2.getObjectByName('Car-body');
        
           
            model2.scale.set(1,1,1);
            scene.add(model2);
    
            updatemodels();
             carbody.material = carmaterial;

            
            

             model2.traverse(function (child) {
            
              child.castShadow = true;
        
              // if (child.material && child.material.name === 'carpaint') {
              //   child.material = carmaterial
              // }
        
           
            })
        
            updatematerials();
          
          })

        };

      function load3model(){   
        gltfloader.load(
          'car3.glb',
          (gltf) => {
            model3 = gltf.scene;
          
        
           
            model3.scale.set(1,1,1);
            scene.add(model3);
            console.log(getObjectByName('Default-view').position)
    
            updatemodels();
         

            model3.traverse(function (child) {
            
              child.castShadow = true;
        
              if (child.material && child.material.name === 'carpaint') {
                child.material = carmaterial
              }
        
           
            })
        
            updatematerials();
          
          })

        }

    
 console.log(scene);
// Camera controls

const controls = new OrbitControls(camera, canvas)
controls.maxPolarAngle = Math.PI / 2;
controls.enableDamping = true
controls.enablePan = false;
controls.target.set(0,0,0);
controls.maxPolarAngle = Math.PI /2.2; 

const viewpoints = document.querySelectorAll('.view-items');

viewpoints[0].addEventListener('click', () =>{
  anime({
     targets: camera.position,
     x: [camera.position.x, '-3'],
     y: [camera.position.y, '1.5'],
     z: [camera.position.z, '-5'],
     ease: 'easeOutQuad',
     delay: 100,
     duration: 800,
  })

   controls.autoRotate = false;
})

viewpoints[1].addEventListener('click', () =>{
  anime({
     targets: camera.position,
     x: [camera.position.x, '-2'],
     y: [camera.position.y, '5'],
     z: [camera.position.z, '0.1'],
     ease: 'easeOutQuad',
     delay: 100,
     duration: 800,
  })

  controls.autoRotate = false;
})

viewpoints[2].addEventListener('click', () =>{
  anime({
     targets: camera.position,
     x: [camera.position.x, '-1'],
     y: [camera.position.y, '1.5'],
     z: [camera.position.z, '-3.2'],
     ease: 'easeOutQuad',
     delay: 100,
     duration: 800,
  })

    controls.autoRotate = false;
})

viewpoints[3].addEventListener('click', () =>{
  anime({
     targets: camera.position,
     x: [camera.position.x, '-1'],
     y: [camera.position.y, '1.5'],
     z: [camera.position.z, '3.2'],
     ease: 'easeOutQuad',
     delay: 100,
     duration: 800,
  })
   controls.autoRotate = false;
})


viewpoints[4].addEventListener('click', () =>{
  controls.autoRotate = true;
})



window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
}

//clock

const clock = new THREE.Clock()

//animation

const tick = () => {

  const elipsed = clock.getElapsedTime()
  window.requestAnimationFrame(tick)

  //tick renderer

  controls.update()

  renderer.render(scene, camera)
}
tick()

};

init();