import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

type SkillSpec = {
    skill: string;
    mark: string;
    shape: "circle" | "pill";
    radius?: number;
    width?: number;
    height?: number;
    fill: string;
    stroke: string;
    text: string;
};

const SKILLS: SkillSpec[] = [
    { skill: "AGENTIC AI", mark: "->", shape: "circle", radius: 44, fill: "#FFFFFF", stroke: "#0A0A0A", text: "#0A0A0A" },
    { skill: "RAG SYSTEMS", mark: "*", shape: "circle", radius: 48, fill: "#F5F5F5", stroke: "#0A0A0A", text: "#0A0A0A" },
    { skill: "GEN AI", mark: "GEN AI", shape: "pill", width: 168, height: 52, fill: "rgba(245,245,245,0.96)", stroke: "#0A0A0A", text: "#0A0A0A" },
    { skill: "VECTOR DB", mark: "VECTOR DB", shape: "pill", width: 176, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
    { skill: "SYSTEM ARCH", mark: "SYSTEM ARCH", shape: "pill", width: 188, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
    { skill: "LLMOps", mark: "LLMOPS", shape: "pill", width: 170, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
    { skill: "NEURAL NETS", mark: "NEURAL NETS", shape: "pill", width: 190, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
];

const PhysicsPlayground = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const fallbackRef = useRef<HTMLDivElement>(null);
    const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const sceneEl = sceneRef.current;
        if (!sceneEl) return;

        const engine = Matter.Engine.create({
            enableSleeping: false,
            gravity: { x: 0, y: 1.05 },
            velocityIterations: 10,
            positionIterations: 10,
            constraintIterations: 2,
        });

        const bounds = sceneEl.getBoundingClientRect();
        const cw = Math.max(bounds.width, 320);
        const ch = Math.max(bounds.height, 180);
        const isMobile = cw < 768;
        const scale = isMobile ? 0.68 : 1;
        const visibleSkills = isMobile ? SKILLS.slice(0, 4) : SKILLS;

        const wallThickness = 56;
        const sideInset = 10;
        const topInset = 10;
        const floorY = ch - 14;
        const floor = Matter.Bodies.rectangle(cw / 2, floorY + wallThickness / 2, cw + wallThickness * 2, wallThickness, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(cw / 2, -wallThickness / 2 + topInset, cw + wallThickness * 2, wallThickness, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(-wallThickness / 2 + sideInset, ch / 2, wallThickness, ch + wallThickness * 2, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(cw + wallThickness / 2 - sideInset, ch / 2, wallThickness, ch + wallThickness * 2, { isStatic: true });

        const bodies = visibleSkills.map((spec, i) => {
            const x = (cw / (visibleSkills.length + 1)) * (i + 1);
            const y = 40 + i * 8;

            const width = spec.shape === "circle" ? (spec.radius ?? 44) * 2 * scale : (spec.width ?? 176) * scale;
            const height = spec.shape === "circle" ? (spec.radius ?? 44) * 2 * scale : (spec.height ?? 52) * scale;

            const el = pillRefs.current[i];
            if (el) {
                el.style.display = "flex";
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;
                el.style.background = spec.fill;
                el.style.color = spec.text;
                el.style.border = `1.5px solid ${spec.stroke}`;
                el.style.borderRadius = spec.shape === "circle" ? "9999px" : `${Math.round(height / 2)}px`;
                el.textContent = spec.mark;
                el.style.visibility = "visible";
                el.style.transform = `translate3d(${x - width / 2}px, ${y}px, 0)`;
            }

            if (spec.shape === "circle") {
                return Matter.Bodies.circle(x, y, (spec.radius ?? 44) * scale, {
                    restitution: 0.42,
                    friction: 0.42,
                    frictionAir: 0.03,
                });
            }

            return Matter.Bodies.rectangle(x, y, (spec.width ?? 176) * scale, (spec.height ?? 52) * scale, {
                chamfer: { radius: ((spec.height ?? 52) * scale) / 2 },
                restitution: 0.26,
                friction: 0.85,
                frictionAir: 0.05,
            });
        });

        for (let i = visibleSkills.length; i < pillRefs.current.length; i += 1) {
            const el = pillRefs.current[i];
            if (el) el.style.display = "none";
        }

        const mouse = Matter.Mouse.create(sceneEl);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.16,
                damping: 0.08,
                render: { visible: false },
            },
        });

        const wheelHandler = (mouseConstraint.mouse as Matter.Mouse & { mousewheel?: EventListener }).mousewheel;
        if (wheelHandler) {
            sceneEl.removeEventListener("mousewheel", wheelHandler);
            sceneEl.removeEventListener("DOMMouseScroll", wheelHandler);
        }

        Matter.Composite.add(engine.world, [floor, ceiling, leftWall, rightWall, ...bodies, mouseConstraint]);

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        const onAfterUpdate = () => {
            if (fallbackRef.current) {
                fallbackRef.current.style.opacity = "0";
                fallbackRef.current.style.pointerEvents = "none";
            }

            for (let i = 0; i < bodies.length; i += 1) {
                const el = pillRefs.current[i];
                const body = bodies[i];
                if (!el || !body) continue;

                const width = body.bounds.max.x - body.bounds.min.x;
                const height = body.bounds.max.y - body.bounds.min.y;
                const halfW = width / 2;
                const halfH = height / 2;
                const minX = sideInset + halfW + 6;
                const maxX = cw - sideInset - halfW - 6;
                const minY = topInset + halfH + 6;
                const maxY = floorY - halfH - 10;

                const clampedX = Math.max(minX, Math.min(maxX, body.position.x));
                const clampedY = Math.max(minY, Math.min(maxY, body.position.y));

                if (clampedX !== body.position.x || clampedY !== body.position.y) {
                    Matter.Body.setPosition(body, { x: clampedX, y: clampedY });
                    Matter.Body.setVelocity(body, { x: body.velocity.x * 0.6, y: body.velocity.y * 0.6 });
                }

                // Keep gravity behavior obvious: after drag release, bodies continue settling downward.
                if (!mouseConstraint.body && clampedY < maxY - 1 && Math.abs(body.velocity.y) < 0.08) {
                    Matter.Body.applyForce(body, body.position, { x: 0, y: body.mass * 0.00045 });
                }

                const x = clampedX - halfW;
                const y = clampedY - halfH;

                el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
            }
        };

        Matter.Events.on(engine, "afterUpdate", onAfterUpdate);

        return () => {
            Matter.Events.off(engine, "afterUpdate", onAfterUpdate);
            Matter.Runner.stop(runner);
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div
            ref={sceneRef}
            className="absolute left-0 right-0 z-30 overflow-hidden top-[84px] h-[32vh] min-h-[170px] max-h-[240px] md:top-[72px] md:h-[30vh] md:min-h-[190px] md:max-h-[320px]"
            style={{ pointerEvents: "auto", touchAction: "none" }}
        >
            <div
                ref={fallbackRef}
                className="absolute inset-0 z-0 flex flex-wrap content-start gap-2 p-3 transition-opacity duration-300 md:gap-3 md:p-4"
            >
                {SKILLS.slice(0, 6).map((skill) => (
                    <div
                        key={`fallback-${skill.skill}`}
                        className="inline-flex select-none items-center justify-center px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] md:text-[11px]"
                        style={{
                            minWidth: skill.shape === "circle" ? "52px" : "98px",
                            height: skill.shape === "circle" ? "52px" : "34px",
                            borderRadius: skill.shape === "circle" ? "9999px" : "9999px",
                            background: skill.fill,
                            color: skill.text,
                            border: `1px solid ${skill.stroke}`,
                            fontFamily: "'JetBrains Mono', monospace",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                        }}
                    >
                        {skill.mark}
                    </div>
                ))}
            </div>

            {SKILLS.map((skill, index) => (
                <div
                    key={skill.skill}
                    ref={(el) => {
                        pillRefs.current[index] = el;
                    }}
                    className="absolute left-0 top-0 select-none items-center justify-center px-5 text-[11px] font-bold uppercase tracking-[0.14em] md:text-[12px]"
                    style={{
                        display: "flex",
                        visibility: "visible",
                        width: skill.shape === "circle" ? `${(skill.radius ?? 44) * 2}px` : `${skill.width ?? 176}px`,
                        height: skill.shape === "circle" ? `${(skill.radius ?? 44) * 2}px` : `${skill.height ?? 52}px`,
                        background: skill.fill,
                        color: skill.text,
                        border: `1.5px solid ${skill.stroke}`,
                        borderRadius: skill.shape === "circle" ? "9999px" : `${Math.round((skill.height ?? 52) / 2)}px`,
                        fontFamily: "'JetBrains Mono', monospace",
                        transformOrigin: "center center",
                        willChange: "transform",
                        transform: `translate3d(${16 + (index % 4) * 112}px, ${18 + Math.floor(index / 4) * 72}px, 0)`,
                        boxShadow: "0 14px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.16)",
                        textRendering: "geometricPrecision",
                        WebkitFontSmoothing: "antialiased",
                        letterSpacing: "0.12em",
                        opacity: "1",
                        backfaceVisibility: "hidden",
                    }}
                >
                    {skill.mark}
                </div>
            ))}
        </div>
    );
};

export default PhysicsPlayground;
