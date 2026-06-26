"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  /** Cuando es false se pausa el render loop (sección oculta) para no gastar GPU. */
  active?: boolean;
  /** Si es false, las partículas ya están en su lugar (sin animación de entrada). */
  intro?: boolean;
}

/** Textura circular suave para que los puntos sean redondos y difuminados. */
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

    // ----- Dimensiones del campo (se ajustan al frustum visible) -----
    const REST_COUNT = 1400; // partículas del campo en reposo (las que quedan)
    const FLY_COUNT = 550; // partículas "de viaje" que cruzan la cámara al entrar
    const COUNT = REST_COUNT + FLY_COUNT;
    const Z_SPREAD = 60; // profundidad: z entre -30 y 30
    let fieldW = 0;
    let fieldH = 0;
    let repelRadius = 16;

    // Tamaño visible del plano a una distancia dada de la cámara.
    const visibleSizeAt = (dist: number) => {
      const h = 2 * Math.tan(((camera.fov * Math.PI) / 180) / 2) * dist;
      return { w: h * camera.aspect, h };
    };

    const recomputeField = () => {
      // Cubrir incluso la capa más lejana (la que ocupa más pantalla por unidad).
      const farDist = camera.position.z + Z_SPREAD / 2;
      const { w, h } = visibleSizeAt(farDist);
      const margin = 1.12;
      fieldW = w * margin;
      fieldH = h * margin;
      repelRadius = fieldH * 0.13;
    };
    recomputeField();

    // ----- Campo de partículas -----
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const startPositions = new Float32Array(COUNT * 3); // de dónde "vuelan" al entrar
    const introOffsets = new Float32Array(COUNT); // retardo de entrada por partícula
    const velocities = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const baseColors = new Float32Array(COUNT * 3); // color de reposo por partícula

    const baseColor = new THREE.Color(0xededed);
    const accentColor = new THREE.Color(0xe82e22);

    const playIntro = introRef.current;

    const populate = () => {
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;

        if (i < REST_COUNT) {
          // ----- Campo en reposo (las que quedan en el medio) -----
          const x = (Math.random() - 0.5) * fieldW;
          const y = (Math.random() - 0.5) * fieldH;
          const z = (Math.random() - 0.5) * Z_SPREAD;
          basePositions[i3] = x;
          basePositions[i3 + 1] = y;
          basePositions[i3 + 2] = z;

          // Entrada: dispersas + giradas + al fondo, para volar a su lugar.
          const swirl = 0.9;
          const cos = Math.cos(swirl);
          const sin = Math.sin(swirl);
          const spread = 1.35;
          startPositions[i3] = (x * cos - y * sin) * spread;
          startPositions[i3 + 1] = (x * sin + y * cos) * spread;
          startPositions[i3 + 2] = z - 150;
          introOffsets[i] = Math.random() * 0.55;

          // Las más lejanas, más tenues -> profundidad.
          const depth = (z + Z_SPREAD / 2) / Z_SPREAD;
          const brightness = 0.35 + depth * 0.65;
          baseColors[i3] = baseColor.r * brightness;
          baseColors[i3 + 1] = baseColor.g * brightness;
          baseColors[i3 + 2] = baseColor.b * brightness;
        } else {
          // ----- Partículas "de viaje" (cruzan la cámara y se van) -----
          // x,y constantes -> la perspectiva las hace salir radialmente (warp).
          const x = (Math.random() - 0.5) * fieldW * 0.6;
          const y = (Math.random() - 0.5) * fieldH * 0.6;
          // Reposo: detrás de la cámara (z>60) => invisibles cuando termina.
          basePositions[i3] = x;
          basePositions[i3 + 1] = y;
          basePositions[i3 + 2] = 90 + Math.random() * 90;
          // Arrancan lejísimos al frente y aceleran hacia (y más allá de) la cámara.
          startPositions[i3] = x;
          startPositions[i3 + 1] = y;
          startPositions[i3 + 2] = -250 - Math.random() * 400;
          introOffsets[i] = Math.random() * 0.55;

          const brightness = 0.7 + Math.random() * 0.3;
          baseColors[i3] = baseColor.r * brightness;
          baseColors[i3 + 1] = baseColor.g * brightness;
          baseColors[i3 + 2] = baseColor.b * brightness;
        }

        velocities[i3] = velocities[i3 + 1] = velocities[i3 + 2] = 0;

        // Si hay intro, arrancan en la posición de entrada; si no, ya en reposo.
        const sx = playIntro ? startPositions[i3] : basePositions[i3];
        const sy = playIntro ? startPositions[i3 + 1] : basePositions[i3 + 1];
        const sz = playIntro ? startPositions[i3 + 2] : basePositions[i3 + 2];
        positions[i3] = sx;
        positions[i3 + 1] = sy;
        positions[i3 + 2] = sz;

        colors[i3] = baseColors[i3];
        colors[i3 + 1] = baseColors[i3 + 1];
        colors[i3 + 2] = baseColors[i3 + 2];
      }
    };
    populate();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const circleTexture = createCircleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.55,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0, // arranca invisible; la fase de entrada la sube
      sizeAttenuation: true, // cercanas grandes, lejanas chicas -> profundidad
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

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
    const INTRO_MS = 2600; // duración de la entrada
    const STAGGER = 0.55; // dispersión del retardo de entrada
    const CAM_START = 130; // dolly: la cámara avanza y frena
    const CAM_END = 60;
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const easeInQuad = (x: number) => x * x; // viaje: acelera y cruza al final
    const tmpColor = new THREE.Color();
    const tmpBase = new THREE.Color();
    let rafId = 0;
    let t = 0;
    let introStart = 0; // se fija en el primer frame activo

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!activeRef.current) return;

      const now = performance.now();
      if (introStart === 0) introStart = now;
      const introP = playIntro
        ? Math.min((now - introStart) / INTRO_MS, 1)
        : 1;

      // Dolly de cámara durante la entrada (sensación de atravesar el espacio).
      camera.position.z =
        CAM_END + (CAM_START - CAM_END) * (1 - easeOutCubic(introP));

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const colAttr = geometry.attributes.color as THREE.BufferAttribute;

      // ----- Fase de entrada: viajamos por el espacio y frenamos en el medio -----
      if (introP < 1) {
        material.opacity = 0.85 * Math.min(easeOutCubic(introP) * 1.5, 1);
        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          const offset = introOffsets[i];
          // progreso local escalonado por partícula
          const local = Math.min(
            Math.max((introP - offset) / (1 - STAGGER), 0),
            1
          );
          // El campo en reposo desacelera al llegar; las de viaje aceleran y cruzan.
          const e = i < REST_COUNT ? easeOutCubic(local) : easeInQuad(local);
          const px = startPositions[i3] + (basePositions[i3] - startPositions[i3]) * e;
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
        }
        posAttr.needsUpdate = true;
        renderer.render(scene, camera);
        return;
      }
      material.opacity = 0.85;

      t += 0.004;
      const radiusSq = repelRadius * repelRadius;

      // Solo el campo en reposo tiene física; las de viaje quedan detrás de cámara.
      for (let i = 0; i < REST_COUNT; i++) {
        const i3 = i * 3;
        let px = positions[i3];
        let py = positions[i3 + 1];
        const pz = positions[i3 + 2];

        // Repulsión desde el cursor (en el plano XY).
        let proximity = 0;
        if (mouseActive) {
          const dx = px - mouseWorld.x;
          const dy = py - mouseWorld.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq) || 0.0001;
            const falloff = 1 - dist / repelRadius;
            const force = falloff * falloff * REPEL_STRENGTH; // caída suave
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

        // Tinte rojo en las partículas cercanas al cursor (acento de marca).
        if (proximity > 0) {
          tmpColor
            .setRGB(baseColors[i3], baseColors[i3 + 1], baseColors[i3 + 2])
            .lerp(accentColor, Math.min(proximity * 1.2, 1));
          colAttr.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
        } else if (colAttr.getX(i) !== baseColors[i3]) {
          // Volver suavemente al color base de la partícula.
          tmpBase.setRGB(baseColors[i3], baseColors[i3 + 1], baseColors[i3 + 2]);
          tmpColor
            .setRGB(colAttr.getX(i), colAttr.getY(i), colAttr.getZ(i))
            .lerp(tmpBase, 0.06);
          colAttr.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Rotación muy lenta del campo para dar profundidad.
      points.rotation.z = Math.sin(t * 0.2) * 0.015;

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
      populate(); // redistribuir para cubrir el nuevo viewport
    };
    window.addEventListener("resize", handleResize);

    // ----- Cleanup -----
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
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
