"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  /** Cuando es false se pausa el render loop (sección oculta) para no gastar GPU. */
  active?: boolean;
  /** Si es false, la red ya está armada (sin animación de entrada). */
  intro?: boolean;
}

/** Textura circular suave para que los nodos sean redondos y difuminados. */
function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const ParticleField = ({
  active = true,
  intro = true,
}: ParticleFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Mantener el valor de `active` accesible dentro del loop sin re-montar.
  const activeRef = useRef(active);
  activeRef.current = active;
  const introRef = useRef(intro);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Guards: solo desktop y respetar reduced-motion.
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // ----- Escena / cámara / renderer -----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparente, deja ver el fondo de la sección
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    // ----- Parámetros de la red (tuneables) -----
    const NODE_COUNT = 180; // nodos de la red
    const MAX_NEIGHBORS = 6; // tope de líneas por nodo (malla pareja, no se sobre-conecta)
    const Z_SPREAD = 36; // profundidad leve
    let fieldW = 0;
    let fieldH = 0;
    let repelRadius = 16;
    let connectDist = 20; // distancia para unir dos nodos
    let mouseDist = 28; // distancia para unir un nodo al cursor

    // Tamaño visible del plano a una distancia dada de la cámara.
    const visibleSizeAt = (dist: number) => {
      const h = 2 * Math.tan(((camera.fov * Math.PI) / 180) / 2) * dist;
      return { w: h * camera.aspect, h };
    };

    const recomputeField = () => {
      const farDist = camera.position.z + Z_SPREAD / 2;
      const { w, h } = visibleSizeAt(farDist);
      const margin = 1.12;
      fieldW = w * margin;
      fieldH = h * margin;
      repelRadius = fieldH * 0.13;
      mouseDist = fieldH * 0.22;
      // connectDist se calcula en populate (depende del tamaño de celda de la grilla).
    };
    recomputeField();

    // ----- Nodos -----
    const positions = new Float32Array(NODE_COUNT * 3);
    const basePositions = new Float32Array(NODE_COUNT * 3);
    const startPositions = new Float32Array(NODE_COUNT * 3); // entrada "assemble"
    const introOffsets = new Float32Array(NODE_COUNT); // retardo escalonado
    const velocities = new Float32Array(NODE_COUNT * 3);
    const nodeColors = new Float32Array(NODE_COUNT * 3);
    const neighborCount = new Uint8Array(NODE_COUNT); // conexiones por nodo (tope)

    const baseColor = new THREE.Color(0xededed);
    const accentColor = new THREE.Color(0xe82e22);

    const playIntro = introRef.current;

    const populate = () => {
      // Grilla jittereada -> nodos parejos (sin amontonamientos ni huecos).
      const aspect = fieldW / fieldH;
      const cols = Math.max(2, Math.round(Math.sqrt(NODE_COUNT * aspect)));
      const rows = Math.ceil(NODE_COUNT / cols);
      const cellW = fieldW / cols;
      const cellH = fieldH / rows;
      // Conectar a celdas vecinas (diagonal incluida) de forma consistente.
      connectDist = Math.hypot(cellW, cellH) * 1.18;
      const JITTER = 0.42; // % de la celda

      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x =
          -fieldW / 2 +
          (col + 0.5 + (Math.random() - 0.5) * 2 * JITTER) * cellW;
        const y =
          -fieldH / 2 +
          (row + 0.5 + (Math.random() - 0.5) * 2 * JITTER) * cellH;
        const z = (Math.random() - 0.5) * Z_SPREAD;
        basePositions[i3] = x;
        basePositions[i3 + 1] = y;
        basePositions[i3 + 2] = z;
        velocities[i3] = velocities[i3 + 1] = velocities[i3 + 2] = 0;

        // Entrada: apenas dispersos hacia afuera + jitter; se asientan a su lugar.
        startPositions[i3] = x * 1.18 + (Math.random() - 0.5) * fieldW * 0.06;
        startPositions[i3 + 1] = y * 1.18 + (Math.random() - 0.5) * fieldH * 0.06;
        startPositions[i3 + 2] = z * 1.18;
        introOffsets[i] = Math.random() * 0.5;

        // Brillo leve por profundidad.
        const depth = (z + Z_SPREAD / 2) / Z_SPREAD;
        const brightness = 0.55 + depth * 0.45;
        nodeColors[i3] = baseColor.r * brightness;
        nodeColors[i3 + 1] = baseColor.g * brightness;
        nodeColors[i3 + 2] = baseColor.b * brightness;

        const sx = playIntro ? startPositions[i3] : x;
        const sy = playIntro ? startPositions[i3 + 1] : y;
        const sz = playIntro ? startPositions[i3 + 2] : z;
        positions[i3] = sx;
        positions[i3 + 1] = sy;
        positions[i3 + 2] = sz;
      }
    };
    populate();

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    nodeGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(nodeColors, 3)
    );

    const circleTexture = createCircleTexture();
    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.7,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0, // arranca invisible; la entrada la sube
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const points = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(points);

    // ----- Líneas (red) -----
    // Buffers preasignados: conexiones nodo-nodo + nodo-mouse.
    const maxSegments = NODE_COUNT * MAX_NEIGHBORS + NODE_COUNT;
    const linePositions = new Float32Array(maxSegments * 2 * 3);
    const lineColors = new Float32Array(maxSegments * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ----- Mouse en coordenadas de mundo (plano z=0) -----
    const mouse = new THREE.Vector2(-9999, -9999); // NDC
    const mouseWorld = new THREE.Vector3(9999, 9999, 0);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mouseWorld);
      mouseActive = true;
    };
    const handleMouseLeave = () => {
      mouseActive = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    // ----- Loop -----
    const REPEL_STRENGTH = 0.22;
    const SPRING = 0.01; // fuerza de retorno a la posición de reposo
    const DAMPING = 0.9; // inercia
    const INTRO_MS = 2200;
    const STAGGER = 0.5;
    const LINE_BRIGHTNESS = 0.5; // brillo máximo de las líneas (sutil)
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
    // Temporales de color reutilizables (evitan asignaciones por frame).
    const tmpColorA = new THREE.Color();
    const tmpColorB = new THREE.Color();
    let rafId = 0;
    let t = 0;
    let introStart = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!activeRef.current) return;

      const now = performance.now();
      if (introStart === 0) introStart = now;
      const introP = playIntro
        ? Math.min((now - introStart) / INTRO_MS, 1)
        : 1;

      const posAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;
      const colAttr = nodeGeometry.attributes.color as THREE.BufferAttribute;

      // Opacidades de entrada: nodos primero, líneas se "arman" después.
      nodeMaterial.opacity = 0.85 * clamp01(easeOutCubic(introP) * 1.5);
      lineMaterial.opacity = clamp01((introP - 0.35) / 0.65);

      t += 0.004;
      const radiusSq = repelRadius * repelRadius;

      // ----- Mover nodos -----
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;

        // Durante la entrada: interpolar desde la posición dispersa al reposo.
        if (introP < 1) {
          const local = clamp01((introP - introOffsets[i]) / (1 - STAGGER));
          const e = easeOutCubic(local);
          const px =
            startPositions[i3] + (basePositions[i3] - startPositions[i3]) * e;
          const py =
            startPositions[i3 + 1] +
            (basePositions[i3 + 1] - startPositions[i3 + 1]) * e;
          const pz =
            startPositions[i3 + 2] +
            (basePositions[i3 + 2] - startPositions[i3 + 2]) * e;
          positions[i3] = px;
          positions[i3 + 1] = py;
          positions[i3 + 2] = pz;
          posAttr.setXYZ(i, px, py, pz);
          continue;
        }

        let px = positions[i3];
        let py = positions[i3 + 1];
        const pz = positions[i3 + 2];

        // Repulsión sutil desde el cursor (en el plano XY).
        let proximity = 0;
        if (mouseActive) {
          const dx = px - mouseWorld.x;
          const dy = py - mouseWorld.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq) || 0.0001;
            const falloff = 1 - dist / repelRadius;
            const force = falloff * falloff * REPEL_STRENGTH;
            proximity = falloff;
            velocities[i3] += (dx / dist) * force;
            velocities[i3 + 1] += (dy / dist) * force;
          }
        }

        // Resorte de vuelta al reposo + deriva sutil ("respiración").
        const driftX = Math.sin(t + basePositions[i3 + 1] * 0.1) * 0.006;
        const driftY = Math.cos(t + basePositions[i3] * 0.1) * 0.006;
        velocities[i3] += (basePositions[i3] - px) * SPRING + driftX;
        velocities[i3 + 1] += (basePositions[i3 + 1] - py) * SPRING + driftY;
        velocities[i3] *= DAMPING;
        velocities[i3 + 1] *= DAMPING;
        px += velocities[i3];
        py += velocities[i3 + 1];
        positions[i3] = px;
        positions[i3 + 1] = py;
        posAttr.setXYZ(i, px, py, pz);

        // Nodos cercanos al cursor se tiñen de rojo.
        if (proximity > 0) {
          tmpColorA
            .setRGB(nodeColors[i3], nodeColors[i3 + 1], nodeColors[i3 + 2])
            .lerp(accentColor, Math.min(proximity * 1.2, 1));
          colAttr.setXYZ(i, tmpColorA.r, tmpColorA.g, tmpColorA.b);
        } else if (colAttr.getX(i) !== nodeColors[i3]) {
          tmpColorB.setRGB(
            nodeColors[i3],
            nodeColors[i3 + 1],
            nodeColors[i3 + 2]
          );
          tmpColorA
            .setRGB(colAttr.getX(i), colAttr.getY(i), colAttr.getZ(i))
            .lerp(tmpColorB, 0.06);
          colAttr.setXYZ(i, tmpColorA.r, tmpColorA.g, tmpColorA.b);
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // ----- Construir líneas de la red -----
      let seg = 0; // índice de vértice de línea
      const connectSq = connectDist * connectDist;
      const maxVerts = maxSegments * 2;
      neighborCount.fill(0); // resetear conteo de conexiones por nodo

      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        const ax = positions[i3];
        const ay = positions[i3 + 1];
        const az = positions[i3 + 2];
        if (neighborCount[i] >= MAX_NEIGHBORS) continue;
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (seg >= maxVerts) break;
          if (neighborCount[i] >= MAX_NEIGHBORS) break;
          if (neighborCount[j] >= MAX_NEIGHBORS) continue;
          const j3 = j * 3;
          const dx = ax - positions[j3];
          const dy = ay - positions[j3 + 1];
          const dz = az - positions[j3 + 2];
          const dSq = dx * dx + dy * dy + dz * dz;
          if (dSq < connectSq) {
            const d = Math.sqrt(dSq);
            // líneas largas más tenues -> se funden con el fondo oscuro
            const b = (1 - d / connectDist) * LINE_BRIGHTNESS;
            const s2 = seg * 3;
            linePositions[s2] = ax;
            linePositions[s2 + 1] = ay;
            linePositions[s2 + 2] = az;
            linePositions[s2 + 3] = positions[j3];
            linePositions[s2 + 4] = positions[j3 + 1];
            linePositions[s2 + 5] = positions[j3 + 2];
            lineColors[s2] = lineColors[s2 + 3] = baseColor.r * b;
            lineColors[s2 + 1] = lineColors[s2 + 4] = baseColor.g * b;
            lineColors[s2 + 2] = lineColors[s2 + 5] = baseColor.b * b;
            seg += 2;
            neighborCount[i]++;
            neighborCount[j]++;
          }
        }
      }

      // Líneas hacia el cursor (acento rojo).
      if (mouseActive && introP >= 1) {
        const mouseSq = mouseDist * mouseDist;
        for (let i = 0; i < NODE_COUNT; i++) {
          if (seg >= maxVerts) break;
          const i3 = i * 3;
          const dx = positions[i3] - mouseWorld.x;
          const dy = positions[i3 + 1] - mouseWorld.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < mouseSq) {
            const d = Math.sqrt(dSq);
            const b = (1 - d / mouseDist) * 0.9;
            const s2 = seg * 3;
            linePositions[s2] = positions[i3];
            linePositions[s2 + 1] = positions[i3 + 1];
            linePositions[s2 + 2] = positions[i3 + 2];
            linePositions[s2 + 3] = mouseWorld.x;
            linePositions[s2 + 4] = mouseWorld.y;
            linePositions[s2 + 5] = 0;
            lineColors[s2] = lineColors[s2 + 3] = accentColor.r * b;
            lineColors[s2 + 1] = lineColors[s2 + 4] = accentColor.g * b;
            lineColors[s2 + 2] = lineColors[s2 + 5] = accentColor.b * b;
            seg += 2;
          }
        }
      }

      lineGeometry.setDrawRange(0, seg);
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate =
        true;
      (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate =
        true;

      renderer.render(scene, camera);
    };

    animate();

    // ----- Resize -----
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      recomputeField();
      populate();
    };
    window.addEventListener("resize", handleResize);

    // ----- Cleanup -----
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      circleTexture.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};
