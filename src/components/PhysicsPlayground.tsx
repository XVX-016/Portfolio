import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

type SkillSpec = {
    skill: string;
    shape: "circle" | "pill";
    radius?: number;
    width?: number;
    height?: number;
    fill: string;
    stroke: string;
    text: string;
};

const SKILLS: SkillSpec[] = [
    { skill: "AI/ML", shape: "circle", radius: 45, fill: "#FFFFFF", stroke: "#000000", text: "#000000" },
    { skill: "System Design", shape: "circle", radius: 50, fill: "#FFFFFF", stroke: "#000000", text: "#000000" },
    { skill: "Python", shape: "pill", width: 160, height: 50, fill: "#111111", stroke: "rgba(255,255,255,0.35)", text: "#FFFFFF" },
    { skill: "React", shape: "pill", width: 160, height: 50, fill: "#111111", stroke: "rgba(255,255,255,0.35)", text: "#FFFFFF" },
    { skill: "PostgreSQL", shape: "pill", width: 160, height: 50, fill: "#111111", stroke: "rgba(255,255,255,0.35)", text: "#FFFFFF" },
    { skill: "Node.js", shape: "pill", width: 160, height: 50, fill: "#111111", stroke: "rgba(255,255,255,0.35)", text: "#FFFFFF" },
    { skill: "Docker", shape: "pill", width: 160, height: 50, fill: "#111111", stroke: "rgba(255,255,255,0.35)", text: "#FFFFFF" },
];

const PhysicsPlayground = () => {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sceneEl = sceneRef.current;
        if (!sceneEl) return;

        const engine = Matter.Engine.create({
            enableSleeping: false,
            gravity: { x: 0, y: 1.35 },
            velocityIterations: 12,
            positionIterations: 12,
        });

        const bounds = sceneEl.getBoundingClientRect();
        const cw = Math.max(bounds.width, 320);
        const ch = Math.max(bounds.height, 420);
        const isMobile = cw < 768;
        const scale = isMobile ? 0.82 : 1;
        const visibleSkills = isMobile ? SKILLS.slice(0, 5) : SKILLS;

        const floorY = ch * 0.52;
        const floor = Matter.Bodies.rectangle(cw / 2, floorY, cw * 2, 40, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(cw / 2, -120, cw * 2, 40, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(-20, ch / 2, 40, ch * 2, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(cw + 20, ch / 2, 40, ch * 2, { isStatic: true });

        const skillElements = Array.from(sceneEl.querySelectorAll<HTMLDivElement>("[data-physics-pill='true']"));
        skillElements.forEach((el, i) => {
            const spec = visibleSkills[i];
            if (!spec) {
                el.style.display = "none";
                return;
            }

            const width = spec.shape === "circle" ? (spec.radius ?? 45) * 2 * scale : (spec.width ?? 160) * scale;
            const height = spec.shape === "circle" ? (spec.radius ?? 45) * 2 * scale : (spec.height ?? 50) * scale;

            el.style.display = "flex";
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.background = spec.fill;
            el.style.color = spec.text;
            el.style.border = `1px solid ${spec.stroke}`;
            el.style.borderRadius = spec.shape === "circle" ? "9999px" : `${(height / 2).toFixed(0)}px`;
            el.textContent = spec.skill.toUpperCase();
        });

        const bodies = visibleSkills.map((spec, i) => {
            const x = (cw / (visibleSkills.length + 1)) * (i + 1);
            const y = -180 - i * 85;

            if (spec.shape === "circle") {
                return Matter.Bodies.circle(x, y, (spec.radius ?? 45) * scale, {
                    restitution: 0.5,
                    friction: 0.5,
                    frictionAir: 0.06,
                });
            }

            return Matter.Bodies.rectangle(x, y, (spec.width ?? 160) * scale, (spec.height ?? 50) * scale, {
                chamfer: { radius: ((spec.height ?? 50) * scale) / 2 },
                restitution: 0.3,
                friction: 0.8,
                frictionAir: 0.08,
            });
        });

        const mouse = Matter.Mouse.create(sceneEl);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.12,
                render: { visible: false },
            },
        });

        const wheelHandler = (mouseConstraint.mouse as Matter.Mouse & { mousewheel?: EventListener }).mousewheel;
        if (wheelHandler) {
            sceneEl.removeEventListener("mousewheel", wheelHandler);
            sceneEl.removeEventListener("DOMMouseScroll", wheelHandler);
        }

        Matter.Composite.add(engine.world, [floor, ceiling, leftWall, rightWall, ...bodies, mouseConstraint]);

        let animationId = 0;
        const tick = () => {
            Matter.Engine.update(engine, 1000 / 60);

            bodies.forEach((body, i) => {
                const el = skillElements[i];
                if (!el) return;

                const width = body.bounds.max.x - body.bounds.min.x;
                const height = body.bounds.max.y - body.bounds.min.y;
                const x = body.position.x - width / 2;
                const y = body.position.y - height / 2;

                el.style.visibility = "visible";
                el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
            });

            animationId = requestAnimationFrame(tick);
        };

        tick();

        return () => {
            cancelAnimationFrame(animationId);
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div ref={sceneRef} className="absolute inset-0 z-30 overflow-hidden">
            {SKILLS.map((skill) => (
                <div
                    key={skill.skill}
                    data-physics-pill="true"
                    className="pointer-events-none absolute left-0 top-0 select-none items-center justify-center px-5 text-[10px] font-bold uppercase tracking-[0.16em] md:text-[12px]"
                    style={{
                        visibility: "hidden",
                        fontFamily: "'JetBrains Mono', monospace",
                        transformOrigin: "center center",
                    }}
                />
            ))}
        </div>
    );
};

export default PhysicsPlayground;
