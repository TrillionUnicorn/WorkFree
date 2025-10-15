<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let canvasContainer: HTMLDivElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let animationId: number;

	// Quest objects
	let questCubes: THREE.Mesh[] = [];
	const questPositions = [
		{ x: -3, y: 1, z: 0, color: 0x3b82f6, label: 'Web Development' },
		{ x: 0, y: 1, z: -3, color: 0x8b5cf6, label: 'UI/UX Design' },
		{ x: 3, y: 1, z: 0, color: 0xec4899, label: 'Data Science' },
		{ x: 0, y: 1, z: 3, color: 0x10b981, label: 'DevOps' }
	];

	onMount(() => {
		// Setup scene
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x0f172a);
		scene.fog = new THREE.Fog(0x0f172a, 10, 50);

		// Setup camera
		camera = new THREE.PerspectiveCamera(
			75,
			canvasContainer.clientWidth / canvasContainer.clientHeight,
			0.1,
			1000
		);
		camera.position.set(0, 5, 10);
		camera.lookAt(0, 0, 0);

		// Setup renderer
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		canvasContainer.appendChild(renderer.domElement);

		// Add lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 10, 5);
		directionalLight.castShadow = true;
		directionalLight.shadow.camera.near = 0.1;
		directionalLight.shadow.camera.far = 50;
		directionalLight.shadow.camera.left = -10;
		directionalLight.shadow.camera.right = 10;
		directionalLight.shadow.camera.top = 10;
		directionalLight.shadow.camera.bottom = -10;
		scene.add(directionalLight);

		// Add point lights for glow effect
		questPositions.forEach(pos => {
			const pointLight = new THREE.PointLight(pos.color, 2, 10);
			pointLight.position.set(pos.x, pos.y, pos.z);
			scene.add(pointLight);
		});

		// Add ground plane
		const groundGeometry = new THREE.PlaneGeometry(50, 50);
		const groundMaterial = new THREE.MeshStandardMaterial({
			color: 0x1e293b,
			roughness: 0.8,
			metalness: 0.2
		});
		const ground = new THREE.Mesh(groundGeometry, groundMaterial);
		ground.rotation.x = -Math.PI / 2;
		ground.receiveShadow = true;
		scene.add(ground);

		// Add grid helper
		const gridHelper = new THREE.GridHelper(50, 50, 0x334155, 0x1e293b);
		scene.add(gridHelper);

		// Create quest cubes
		questPositions.forEach(pos => {
			const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
			const material = new THREE.MeshStandardMaterial({
				color: pos.color,
				emissive: pos.color,
				emissiveIntensity: 0.3,
				roughness: 0.3,
				metalness: 0.7
			});
			const cube = new THREE.Mesh(geometry, material);
			cube.position.set(pos.x, pos.y, pos.z);
			cube.castShadow = true;
			cube.receiveShadow = true;
			scene.add(cube);
			questCubes.push(cube);

			// Add label
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d')!;
			canvas.width = 512;
			canvas.height = 128;
			context.fillStyle = 'rgba(0, 0, 0, 0.7)';
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.font = 'bold 48px Arial';
			context.fillStyle = 'white';
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillText(pos.label, canvas.width / 2, canvas.height / 2);

			const texture = new THREE.CanvasTexture(canvas);
			const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
			const sprite = new THREE.Sprite(spriteMaterial);
			sprite.position.set(pos.x, pos.y + 1.5, pos.z);
			sprite.scale.set(4, 1, 1);
			scene.add(sprite);
		});

		// Add floating particles
		const particlesGeometry = new THREE.BufferGeometry();
		const particlesCount = 1000;
		const positions = new Float32Array(particlesCount * 3);

		for (let i = 0; i < particlesCount * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 50;
		}

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		const particlesMaterial = new THREE.PointsMaterial({
			color: 0x8b5cf6,
			size: 0.05,
			transparent: true,
			opacity: 0.6
		});
		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
		scene.add(particles);

		// Mouse controls
		let mouseX = 0;
		let mouseY = 0;

		const onMouseMove = (event: MouseEvent) => {
			mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
		};

		window.addEventListener('mousemove', onMouseMove);

		// Handle window resize
		const onWindowResize = () => {
			camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
		};

		window.addEventListener('resize', onWindowResize);

		// Animation loop
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			// Rotate quest cubes
			questCubes.forEach((cube, index) => {
				cube.rotation.y += 0.01;
				cube.rotation.x += 0.005;
				cube.position.y = 1 + Math.sin(Date.now() * 0.001 + index) * 0.2;
			});

			// Rotate particles
			particles.rotation.y += 0.0005;

			// Camera follows mouse slightly
			camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
			camera.position.y += (5 - mouseY * 2 - camera.position.y) * 0.05;
			camera.lookAt(0, 0, 0);

			renderer.render(scene, camera);
		};

		animate();

		// Cleanup
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('resize', onWindowResize);
			cancelAnimationFrame(animationId);
			renderer.dispose();
			canvasContainer.removeChild(renderer.domElement);
		};
	});
</script>

<div bind:this={canvasContainer} class="w-full h-full min-h-[600px] rounded-2xl overflow-hidden relative"></div>

