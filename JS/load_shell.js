import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

import dat from "https://cdn.skypack.dev/dat.gui";
var gui = new dat.GUI();


const tl1 = gsap.timeline({ paused: true });
const tl2 = gsap.timeline({ paused: true });
const tl3 = gsap.timeline({ paused: true });
const tl4 = gsap.timeline({ paused: true });
const tl5 = gsap.timeline({ paused: true });
const tl6 = gsap.timeline({ paused: true });

let selected_pearl = 1;
// let shell_upper = null;
// let shell_lower = null;
let shell = null;

let canvas = document.querySelector('.webgl');

let scene = new THREE.Scene();

let width = 600;
let height = 570;

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(1.5, -10, 1.4);
scene.add(camera);

// const gui = new GUI()
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(camera.position, 'z', -50, 50)
// cubeFolder.add(camera.position, 'y', -50, 50)
// cubeFolder.add(camera.position, 'x', -50, 50)
// cubeFolder.add(camera.rotation, 'z', -50, 50)
// cubeFolder.add(camera.rotation, 'y', -50, 50)
// cubeFolder.add(camera.rotation, 'x', -50, 50)
// cubeFolder.open()


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0);

document.body.appendChild(renderer.domElement);

// scene.background = new THREE.Color(0x000000);

let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 40, 1);
controls.update();
controls.minDistance = 10.0;
controls.maxDistance = 50;
controls.enableZoom = false;
controls.enableRotate = true;
// controls.enablePan = true;

let light = new THREE.DirectionalLight(0x0000FF, 3);
light.position.set(-1.4, -11, 15);
// const LightFolder = gui.addFolder('Light')
// LightFolder.add(light.position, 'z', -50, 50)
// LightFolder.add(light.position, 'y', -50, 50)
// LightFolder.add(light.position, 'x', -50, 50)
// LightFolder.open()

let light_purp = new THREE.DirectionalLight(0xA020F0, 3);
light_purp.position.set(32.7, 17, -86);
scene.add(light_purp);


light.castShadow = true;
light.target.position.set(0, 0, 0);
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);

let light2 = new THREE.AmbientLight(0xFFFFFF, 5);
scene.add(light2);

window.addEventListener('resize', () => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const shell_texture = new THREE.TextureLoader().load('JS/models/shell_basecolour.jpg')

// const gltfloader_upper = new GLTFLoader();
// gltfloader_upper.load('JS/models/shell_lower.gltf',(gltf) => {
//     shell_upper = gltf.scene;
//     gltf.scene.traverse(c => { c.castShadow = true; });
//     gltf.scene.scale.set(2,2,2);//to scale

//     shell_upper.rotation.x = 12;
//     shell_upper.rotation.y= -20;
//     shell_upper.rotation.z = -29;

//     shell_upper.position.x = 4;
//     shell_upper.position.y =6.7;
//     shell_upper.position.z = 2.4;

//     shell_upper.traverse(node=>{
//         if(node.isMesh){
//             node.material.map = shell_texture;
//         }
//     })

//     scene.add(gltf.scene);


//     // gui.add(shell_upper.rotation, 'x',  -30,  30);
//     // gui.add(shell_upper.rotation, 'y' , -30,  30);    
//     // gui.add(shell_upper.rotation, 'z' , -30,  30);
//     // gui.add(shell_upper.position, 'x' , -30 , 30);
//     // gui.add(shell_upper.position, 'y' , -30 , 30);
//     // gui.add(shell_upper.position, 'z' , -30 , 30);
//     // gui.open();
// });


// let gltfloader_lower = new GLTFLoader();
// gltfloader_lower.load('JS/models/shell_upper.gltf',(gltf) => {
//     shell_lower = gltf.scene;
//     gltf.scene.traverse(c => { c.castShadow = true; });
//     gltf.scene.scale.set(2,2,2);//to scale

//     shell_lower.rotation.x = -13;
//     shell_lower.rotation.y= -20;
//     shell_lower.rotation.z = -29;
//     shell_lower.position.x = 3.7;
//     shell_lower.position.y =6;
//     shell_lower.position.z = 2.4;


//     shell_lower.traverse(node=>{
//         if(node.isMesh){
//             node.material.map = shell_texture;
//         }
//     })
//     scene.add(gltf.scene);
//     gui.add(shell_lower.rotation, 'x',  -30,  30);
//     gui.add(shell_lower.rotation, 'y' , -30,  30);    
//     gui.add(shell_lower.rotation, 'z' , -30,  30);
//     gui.add(shell_lower.position, 'x' , -30 , 30);
//     gui.add(shell_lower.position, 'y' , -30 , 30);
//     gui.add(shell_lower.position, 'z' , -30 , 30);
//     gui.open();
// });

const pearltextureLoader1 = new THREE.TextureLoader().load('JS/models/pearl_basecolor2_1.png');
const pearltextureLoader2 = new THREE.TextureLoader().load('JS/models/pearl_basecolor2_2.png');
const pearltextureLoader3 = new THREE.TextureLoader().load('JS/models/pearl_basecolor2_3.png');
const pearltextureLoader4 = new THREE.TextureLoader().load('JS/models/pearl_basecolor2_4.png');
const pearltextureLoader5 = new THREE.TextureLoader().load('JS/models/pearl_basecolor2_5.png');
const pearltextureLoader6 = new THREE.TextureLoader().load('JS/models/pearl_basecolor2_6.png');

const geometry = new THREE.SphereGeometry(0.2, 32, 32);

const sphereMaterial1 = new THREE.MeshBasicMaterial({
    map: pearltextureLoader1, // White color
    metalness: 1,     // Fully metallic
    roughness: 0.1,   // Slightly glossy
});
const sphere = new THREE.Mesh(geometry, sphereMaterial1);
sphere.position.x = 0.4;
sphere.position.y = 1.1;
sphere.position.z = 1.3;
sphere.rotation.x = -0.4;
sphere.rotation.y = -1;
sphere.rotation.z = -5

// gui.add(sphere.rotation, 'x' , -5 , 5).step(0.1);
// gui.add(sphere.rotation, 'y' , -5 , 5).step(0.1);
// gui.add(sphere.rotation, 'z' , -5 , 5).step(0.1);
// gui.open();

const sphereMaterial2 = new THREE.MeshBasicMaterial({
    map: pearltextureLoader2, // White color
    metalness: 1,     // Fully metallic
    roughness: 0.1,   // Slightly glossy
});
const sphere2 = new THREE.Mesh(geometry, sphereMaterial2);
sphere2.position.x = 0.8;
sphere2.position.y = 1.3;
sphere2.position.z = 1;
sphere2.rotation.x = -0.4;
sphere2.rotation.y = -1;
sphere2.rotation.z = -5

const sphereMaterial3 = new THREE.MeshBasicMaterial({
    map: pearltextureLoader3, // White color
    metalness: 1,     // Fully metallic
    roughness: 0.1,   // Slightly glossy
});
const sphere3 = new THREE.Mesh(geometry, sphereMaterial3);
sphere3.position.x = 0.2;
sphere3.position.y = 1.5;
sphere3.position.z = 1.6;
sphere3.rotation.x = -0.4;
sphere3.rotation.y = -1;
sphere3.rotation.z = -5

const sphereMaterial4 = new THREE.MeshBasicMaterial({
    map: pearltextureLoader4, // White color
    metalness: 1,     // Fully metallic
    roughness: 0.1,   // Slightly glossy
});
const sphere4 = new THREE.Mesh(geometry, sphereMaterial4);
sphere4.position.x = 0.6;
sphere4.position.y = 1.5;
sphere4.position.z = 1.6;
sphere4.rotation.x = -0.8;
sphere4.rotation.y = -1;
sphere4.rotation.z = -5

const sphereMaterial5 = new THREE.MeshBasicMaterial({
    map: pearltextureLoader5, // White color
    metalness: 1,     // Fully metallic
    roughness: 0.1,   // Slightly glossy
});
const sphere5 = new THREE.Mesh(geometry, sphereMaterial5);
sphere5.position.x = 0.9;
sphere5.position.y = 1.7;
sphere5.position.z = 1.3;
sphere5.rotation.x = -0.8;
sphere5.rotation.y = -1;
sphere5.rotation.z = -5.5

const sphereMaterial6 = new THREE.MeshBasicMaterial({
    map: pearltextureLoader6, // White color
    metalness: 1,     // Fully metallic
    roughness: 0.1,   // Slightly glossy
});
const sphere6 = new THREE.Mesh(geometry, sphereMaterial6);
sphere6.position.x = 1.3;
sphere6.position.y = 1.7;
sphere6.position.z = 1;
sphere6.rotation.x = -0.4;
sphere6.rotation.y = -1;
sphere6.rotation.z = -5

// gui.add(sphere3.position, 'x' , -5 , 5).step(0.1);
// gui.add(sphere3.position, 'y' , -5 , 5).step(0.1);
// gui.add(sphere3.position, 'z' , -5 , 5).step(0.1);
// gui.open();


let gltfloader = new GLTFLoader();
gltfloader.load('JS/models/shell_without_rect.gltf', (gltf) => {
    shell = gltf.scene;
    gltf.scene.traverse(c => { c.castShadow = true; });
    gltf.scene.scale.set(2, 2, 2);//to scale

    shell.rotation.x = -13.4;
    shell.rotation.y = -20.1;
    shell.rotation.z = -29;
    shell.position.x = 3;
    shell.position.y = 2.5;
    shell.position.z = 3;


    shell.traverse(node => {
        if (node.isMesh) {
            node.material.map = shell_texture;
        }
    })
    scene.add(shell);
    // gui.add(shell.rotation, 'x',  -30,  30).step(0.1);
    // gui.add(shell.rotation, 'y' , -30,  30).step(0.1);    
    // gui.add(shell.rotation, 'z' , -30,  30).step(0.1);
    // gui.add(shell.position, 'x' , -30 , 30).step(0.1);
    // gui.add(shell.position, 'y' , -30 , 30).step(0.1);
    // gui.add(shell.position, 'z' , -30 , 30).step(0.1);
    // gui.open();

    gsap.to(shell.rotation, { x: '+=0.2', y: '-=0.2', repeat: -1, yoyo: true, ease: 'linear', duration: 10 });

    shell.add(sphere)
    shell.add(sphere2)
    shell.add(sphere3)
    shell.add(sphere4)
    shell.add(sphere5)
    shell.add(sphere6)



    tl1.to(sphere.rotation, { y: '+=1', repeat: -1, yoyo: true, ease: 'linear', duration: 3 });
    tl1.to(sphere.scale, {
        x: 1.1, // Scale factor for the x-axis
        y: 1.1, // Scale factor for the y-axis
        z: 1.1, // Scale factor for the z-axis
        duration: 1, // Duration of the animation in seconds
        repeat: "-1",
        ease: "linear", // Easing function
        yoyo: true, // Yoyo effect (true for back and forth)
    }, "-=3");


    tl2.to(sphere2.rotation, { y: '+=1', repeat: -1, yoyo: true, ease: 'linear', duration: 3 });
    tl2.to(sphere2.scale, {
        x: 1.1, // Scale factor for the x-axis
        y: 1.1, // Scale factor for the y-axis
        z: 1.1, // Scale factor for the z-axis
        duration: 1, // Duration of the animation in seconds
        repeat: "-1",
        ease: "linear", // Easing function
        yoyo: true, // Yoyo effect (true for back and forth)
    }, "-=3");

    tl3.to(sphere3.rotation, { y: '+=1', repeat: -1, yoyo: true, ease: 'linear', duration: 3 });
    tl3.to(sphere3.scale, {
        x: 1.1, // Scale factor for the x-axis
        y: 1.1, // Scale factor for the y-axis
        z: 1.1, // Scale factor for the z-axis
        duration: 1, // Duration of the animation in seconds
        repeat: "-1",
        ease: "linear", // Easing function
        yoyo: true, // Yoyo effect (true for back and forth)
    }, "-=3");

    tl4.to(sphere4.rotation, { y: '+=1', repeat: -1, yoyo: true, ease: 'linear', duration: 3 });
    tl4.to(sphere4.scale, {
        x: 1.1, // Scale factor for the x-axis
        y: 1.1, // Scale factor for the y-axis
        z: 1.1, // Scale factor for the z-axis
        duration: 1, // Duration of the animation in seconds
        repeat: "-1",
        ease: "linear", // Easing function
        yoyo: true, // Yoyo effect (true for back and forth)
    }, "-=3");

    tl5.to(sphere5.rotation, { y: '+=1', repeat: -1, yoyo: true, ease: 'linear', duration: 3 });
    tl5.to(sphere5.scale, {
        x: 1.1, // Scale factor for the x-axis
        y: 1.1, // Scale factor for the y-axis
        z: 1.1, // Scale factor for the z-axis
        duration: 1, // Duration of the animation in seconds
        repeat: "-1",
        ease: "linear", // Easing function
        yoyo: true, // Yoyo effect (true for back and forth)
    }, "-=3");

    tl6.to(sphere6.rotation, { y: '+=1', repeat: -1, yoyo: true, ease: 'linear', duration: 3 });
    tl6.to(sphere6.scale, {
        x: 1.1, // Scale factor for the x-axis
        y: 1.1, // Scale factor for the y-axis
        z: 1.1, // Scale factor for the z-axis
        duration: 1, // Duration of the animation in seconds
        repeat: "-1",
        ease: "linear", // Easing function
        yoyo: true, // Yoyo effect (true for back and forth)
    }, "-=3");

});


document.addEventListener("keydown", handleKeyPress);
function handleKeyPress(event) {
    switch (event.key) {
        case "1": selected_pearl = 1; break;
        case "2": selected_pearl = 2; break;
        case "3": selected_pearl = 3; break;
        case "4": selected_pearl = 4; break;
        case "5": selected_pearl = 5; break;
        case "6": selected_pearl = 6; break;
    }
}


let change_image = document.getElementById("change_image")
let change_title = document.getElementById("change_title")
let change_link = document.getElementById("change_link")
let change_desc = document.getElementById("change_desc")
let change_techUsed = document.getElementById("change_techUsed")

function animate() {

    if (selected_pearl == 1) {
        tl1.resume()
        tl2.pause()
        tl3.pause()
        tl4.pause()
        tl5.pause()
        tl6.pause()
        change_image.src = "public/sportify.jpg";
        change_link.onclick = () => window.open('https://github.com/AditiNarkar/Sportify');
        change_title.innerHTML = "Sportify"
        change_desc.innerHTML = `
       <ul>
            <li> Cricket Clubs Management tool.</li>
            <li> Admin - Overview matches, notified about ongoing activities, notified about important announcements, handle database.</li>
            <li> Coach - Select team, select captain, approve members, challenege clubs, set practise sessions.</li>
            <li> User - Request to be in club, request to be in team, get merchandise.</li>
        </ul>
       `;
        change_techUsed.innerHTML = " HTML, CSS, JS, ThreeJS, Blender, JSP, Apache Tomcat, MySQL "
    }
    else if (selected_pearl == 2) {
        tl1.pause()
        tl2.resume()
        tl3.pause()
        tl4.pause()
        tl5.pause()
        tl6.pause()
        change_image.src = "public/Local_Karobar.png";
        change_link.onclick = () => window.open('https://github.com/AditiNarkar/Local-Karobar');
        change_title.innerHTML = "Local Karobar"
        change_desc.innerHTML = `
        <ul>
            <li> Provide a digital platform for small-scale shops, wholesale and retail businesses, local vendors, and freelancers to showcase their products and services. </li>
            <li> Amplify the visibility of local artisans, artists, skilled traders, and essential service providers like milkmen, plumbers, and maids. </li>
            <li> Maps feature added. </li>
        </ul>
        `;
        change_techUsed.innerHTML = " MERN (MongoDB, Express, React, Node), Figma "
    }
    else if (selected_pearl == 3) {
        tl1.pause()
        tl2.pause()
        tl3.resume()
        tl4.pause()
        tl5.pause()
        tl6.pause()
        change_image.src = "public/Alberta.png";
        change_link.onclick = () => window.open('https://github.com/AditiNarkar/Alberta-Health-Care-with-PHP-ThreeJS')
        change_title.innerHTML = "Alberta Health Care"
        change_desc.innerHTML = `
        <ul>
            <li>Alberta Health Care focuses of e-hospital services. </li>
            <li> It is a PHP-based web application. </li>
            <li> CRUD operations on data. </li>
        </ul>
        `;
        change_techUsed.innerHTML = " Xampp Server, PHPMyAdmin "
    }

    else if (selected_pearl == 4) {
        tl1.pause()
        tl2.pause()
        tl3.pause()
        tl4.resume()
        tl5.pause()
        tl6.pause()
        change_image.src = "public/SoulSpeak.png";
        change_link.onclick = () => window.open('https://github.com/Tufayl18/SoulSpeak-Merged')
        change_title.innerHTML = "SoulSpeak"
        change_desc.innerHTML = `
        <ul>
            <li>Recipient of the Major Hacking League: M5GO IoT Starter Kit at HackByte 2.0 for the best utilization of MongoDB.</li>
            <li> A web application, made using MERN stack, designed to provide a safe and anonymous space for individuals struggling with mental illness to connect and seek support. 
Designed website's front-end, logo, managed database operations and routing.</li></li>
            <li> Designed website's front-end, logo, managed database operations and routing.</li>
        </ul>
        `;
        change_techUsed.innerHTML = " MERN, Figma, GenAI"
    }

    else if (selected_pearl == 5) {
        tl1.pause()
        tl2.pause()
        tl3.pause()
        tl4.pause()
        tl5.resume()
        tl6.pause()
        change_image.src = "public/smartPlatform.jpg";
        change_link.onclick = () => alert("Yet to post.")
        change_title.innerHTML = "Smart Platform Interface"
        change_desc.innerHTML = `
        <ul>
            <li>Designed an automated platform crossing system using Arduino, an ESP32 camera and Python-based object detection. </li>
            <li> The system utilizes real-time signals to open access for passengers when a train departs and close it when a train approaches, ensuring safety and efficiency.  </li>
            <li> Currently in the process of submitting a research paper on this innovative solution, which eliminates the need for bridges and allows seamless platform crossing for passengers. </li>
        </ul>
        `;
        change_techUsed.innerHTML = " IOT, Python "
    }

    else if (selected_pearl == 6) {
        tl1.pause()
        tl2.pause()
        tl3.pause()
        tl4.pause()
        tl5.pause()
        tl6.resume()
        change_image.src = "public/GitStake.jpeg";
        change_link.onclick = () => alert("Yet to post.")
        change_title.innerHTML = "GitStake (ongoing)"
        change_desc.innerHTML = `
        <ul>
            <li>Currently developing a Web3.0 decentralized application using Solidity and Ethereum to incentivize and prioritize solutions for GitHub issues and open source contributing through pull requests through staking. </li>
            <li> The system allows users to stake tokens on issues, with stakers displayed to the issuer in descending order of stakes for solver selection, promoting active and transparent collaboration.  </li>
            <li> Implementing smart contracts for efficient stake management and issuer-based solver selection to enhance open-source project contributions. </li>
        </ul>
        `;
        change_techUsed.innerHTML = "Solidity, Hardhat, Next.js"
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


animate();



