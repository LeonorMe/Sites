let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    //camera.rotation.y = 45 / 180 * Math.PI;
    //scene.add(camera);

    hlight = new THREE.AmbientLight(0x404040, 100);
    scene.add(hlight);
    //directionalLight = new THREE.DirectionalLight(0xffffff, 100);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //let controls = new THREE.OrbitControls(camera, renderer.domElement);

    let loader = new THREE.GLTFLoader();
    loader.load('3d/fire_flower.glb', function(gltf) {
        //flower = gltf.scene.children[0];
        //flower.scale.set(0.5, 0.5, 0.5);
        //scene.add(gltf.scene);
        //animate();

        scene.add(gltf.scene);
        renderer.render(scene, camera);
    });
    init();

}