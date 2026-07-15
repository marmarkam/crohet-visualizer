document.addEventListener('DOMContentLoaded', function() {
    // viewer.js
    const container = document.getElementById('canvas-container');

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f0e8);

    // camera
    const camera = new THREE.PerspectiveCamera(
        75,                                          // field of view
        container.clientWidth / container.clientHeight,  // aspect ratio
        0.1,                                         // near clipping plane
        1000                                         // far clipping plane
    );
    camera.position.set(0, 5, 10);  // position camera above and back
    camera.lookAt(0, 0, 0);         // look at center of scene

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute%';
    container.appendChild(renderer.domElement);

    // orbital controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // handle window/panel resize
    const resizeObserver = new ResizeObserver(function() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);

    });
    resizeObserver.observe(container);

    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate()
});