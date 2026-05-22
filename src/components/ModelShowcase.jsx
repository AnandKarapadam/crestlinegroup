import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const MODEL_URL = `${import.meta.env.BASE_URL}models/scene.gltf`;

function fitCameraToObject(
  camera,
  object,
  offset = 1.6
) {
  const box = new THREE.Box3().setFromObject(
    object
  );

  const size = box.getSize(
    new THREE.Vector3()
  );

  const center = box.getCenter(
    new THREE.Vector3()
  );

  const maxDim = Math.max(
    size.x,
    size.y,
    size.z
  );

  if (!maxDim || !Number.isFinite(maxDim)) {
    return null;
  }

  const fov =
    (camera.fov * Math.PI) / 180;

  const distance =
    (maxDim / 2 / Math.tan(fov / 2)) *
    offset;

  // Better cinematic angle

  camera.position.set(
    center.x - distance * 0.9,
    center.y + distance * 0.2,
    center.z + distance * 0.9
  );

  camera.near = 0.01;
  camera.far = 100000;

  camera.lookAt(center);

  camera.updateProjectionMatrix();

  return {
    distance,
    center,
  };
}

export default function ModelShowcase() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let disposed = false;
    let modelRef = null;
    let animationId = 0;

    // ======================
    // Scene
    // ======================

    const scene = new THREE.Scene();

    // ======================
    // Camera
    // ======================

    const camera =
      new THREE.PerspectiveCamera(
        45,
        1,
        0.01,
        100000
      );

    camera.position.set(0, 1.2, 13);

    // ======================
    // Renderer
    // ======================

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference:
          'high-performance',
      });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    renderer.setClearColor(
      0x000000,
      0
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.toneMapping =
      THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure =
      1.1;

    renderer.domElement.style.touchAction =
      'auto';

    container.appendChild(
      renderer.domElement
    );

    // ======================
    // Controls
    // ======================

    const controls =
      new OrbitControls(
        camera,
        renderer.domElement
      );

    controls.enableDamping = true;

    controls.dampingFactor = 0.08;

    controls.enableRotate = true;
    controls.enablePan = false;
    controls.enableZoom = false;

    controls.autoRotate = false;

    controls.rotateSpeed = 0.5;

    // Horizontal only

    controls.minPolarAngle =
      Math.PI / 2;

    controls.maxPolarAngle =
      Math.PI / 2;

    controls.minAzimuthAngle =
      -Infinity;

    controls.maxAzimuthAngle =
      Infinity;

    controls.target.set(0, 0, 0);

    controls.update();

    // ======================
    // Lights
    // ======================

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1
      );

    scene.add(ambientLight);

    const directionalLight =
      new THREE.DirectionalLight(
        0xffffff,
        2
      );

    directionalLight.position.set(
      10,
      15,
      10
    );

    scene.add(directionalLight);

    const fillLight =
      new THREE.DirectionalLight(
        0xffffff,
        1
      );

    fillLight.position.set(
      -10,
      5,
      -10
    );

    scene.add(fillLight);

    const hemiLight =
      new THREE.HemisphereLight(
        0xffffff,
        0x444444,
        1
      );

    scene.add(hemiLight);

    // ======================
    // Resize
    // ======================

    const resize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );
    };

    resize();

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(container);

    // ======================
    // GLTF Loader
    // ======================

    const loader = new GLTFLoader();

    loader.load(
      MODEL_URL,

      (gltf) => {
        if (disposed) return;

        const model = gltf.scene;

        modelRef = model;

        // ======================
        // Initial Rotation
        // ======================

        const baseRotationY = 0;

        model.rotation.y =
          baseRotationY;

        model.userData.baseRotationY =
          baseRotationY;

        // ======================
        // Shadows
        // ======================

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);

        // ======================
        // Bounding Box
        // ======================

        const box =
          new THREE.Box3().setFromObject(
            model
          );

        const size = box.getSize(
          new THREE.Vector3()
        );

        const maxDim = Math.max(
          size.x,
          size.y,
          size.z
        );

        // ======================
        // Normalize Scale
        // ======================

        if (maxDim > 0) {
          const targetSize = 10;

          const scale =
            targetSize / maxDim;

          model.scale.setScalar(scale);
        }

        model.updateMatrixWorld(true);

        // ======================
        // Updated Center
        // ======================

        const updatedBox =
          new THREE.Box3().setFromObject(
            model
          );

        const updatedCenter =
          updatedBox.getCenter(
            new THREE.Vector3()
          );

        // Better camera focus

        controls.target.set(
          updatedCenter.x,
          updatedCenter.y + 1,
          updatedCenter.z
        );

        // ======================
        // Fit Camera
        // ======================

        const result =
          fitCameraToObject(
            camera,
            model,
            1.6
          );

        if (result?.distance) {
          controls.minDistance =
            result.distance * 0.5;

          controls.maxDistance =
            result.distance * 3;
        }

        controls.update();

        resize();

        console.log(
          '3D model loaded successfully'
        );
      },

      undefined,

      (error) => {
        console.error(
          'Failed to load GLTF model:',
          error
        );
      }
    );

    // ======================
    // Animation Loop
    // ======================

    const clock = new THREE.Clock();

    const animate = () => {
      if (disposed) return;

      animationId =
        requestAnimationFrame(animate);

      if (modelRef) {
        const elapsed =
          clock.getElapsedTime();

        const baseRotationY =
          modelRef.userData
            .baseRotationY || 0;

        // More noticeable sway

        modelRef.rotation.y =
          baseRotationY +
          Math.sin(elapsed * 1.1) *
            0.045;

        // Floating movement

        modelRef.position.y =
          Math.sin(elapsed * 2.2) *
          0.08;

        // Cinematic tilt

        modelRef.rotation.z =
          Math.sin(elapsed * 1.4) *
          0.01;
      }

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // ======================
    // Cleanup
    // ======================

    return () => {
      disposed = true;

      cancelAnimationFrame(
        animationId
      );

      resizeObserver.disconnect();

      controls.dispose();

      if (modelRef) {
        modelRef.traverse((child) => {
          if (!child.isMesh) return;

          child.geometry?.dispose();

          const { material } = child;

          if (
            Array.isArray(material)
          ) {
            material.forEach((mat) =>
              mat.dispose()
            );
          } else {
            material?.dispose();
          }
        });
      }

      renderer.dispose();

      if (
        renderer.domElement.parentNode ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <section
      className="model-showcase-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        ref={containerRef}
        className="model-showcase-canvas"
        style={{
          width: '100%',
          height: '600px',
          background: 'transparent',
        }}
      />
    </section>
  );
}