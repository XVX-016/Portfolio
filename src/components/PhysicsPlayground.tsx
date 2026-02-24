import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

type SkillSpec = {
    skill: string;
    mark: string;
    shape: "pill";
    width?: number;
    height?: number;
    fill: string;
    stroke: string;
    text: string;
};

const SKILLS: SkillSpec[] = [
    { skill: "VECTOR DB", mark: "VECTOR DB", shape: "pill", width: 170, height: 52, fill: "rgba(245,245,245,0.96)", stroke: "#0A0A0A", text: "#0A0A0A" },
    { skill: "GEN AI", mark: "GEN AI", shape: "pill", width: 160, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
    { skill: "AI/ML", mark: "AI/ML", shape: "pill", width: 154, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
    { skill: "SYSTEM ARCHITECTURE", mark: "SYSTEM ARCHITECTURE", shape: "pill", width: 250, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
    { skill: "RAG", mark: "RAG", shape: "pill", width: 140, height: 52, fill: "rgba(245,245,245,0.96)", stroke: "#0A0A0A", text: "#0A0A0A" },
    { skill: "NEURAL NETS", mark: "NEURAL NETS", shape: "pill", width: 200, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
    { skill: "CNN", mark: "CNN", shape: "pill", width: 140, height: 52, fill: "rgba(22,22,22,0.96)", stroke: "rgba(255,255,255,0.82)", text: "#FFFFFF" },
];

const PhysicsPlayground = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const fallbackRef = useRef<HTMLDivElement>(null);
    const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const sceneEl = sceneRef.current;
        if (!sceneEl) return;

        let teardown: (() => void) | null = null;
        let resizeTimer: ReturnType<typeof setTimeout> | null = null;

        const setupWorld = () => {
            if (teardown) teardown();

            if (fallbackRef.current) {
                fallbackRef.current.style.opacity = "1";
                fallbackRef.current.style.pointerEvents = "auto";
            }

            const engine = Matter.Engine.create({
                enableSleeping: false,
                gravity: { x: 0, y: 1.15 },
                velocityIterations: 10,
                positionIterations: 10,
                constraintIterations: 2,
            });

            const bounds = sceneEl.getBoundingClientRect();
            const cw = Math.max(bounds.width, 320);
            const ch = Math.max(bounds.height, 220);
            const isMobile = cw < 768;
            const scale = isMobile ? 0.62 : 1;
            const visibleSkills = isMobile ? SKILLS.slice(0, 6) : SKILLS;

            const wallThickness = 56;
            const sideInset = isMobile ? 14 : 10;
            const topInset = 10;
            const floorY = ch * (isMobile ? 0.86 : 0.82);

            const floor = Matter.Bodies.rectangle(cw / 2, floorY + wallThickness / 2, cw + wallThickness * 2, wallThickness, { isStatic: true });
            const ceiling = Matter.Bodies.rectangle(cw / 2, -wallThickness / 2 + topInset, cw + wallThickness * 2, wallThickness, { isStatic: true });
            const leftWall = Matter.Bodies.rectangle(-wallThickness / 2 + sideInset, ch / 2, wallThickness, ch + wallThickness * 2, { isStatic: true });
            const rightWall = Matter.Bodies.rectangle(cw + wallThickness / 2 - sideInset, ch / 2, wallThickness, ch + wallThickness * 2, { isStatic: true });

            const bodies = visibleSkills.map((spec, i) => {
                const x = (cw / (visibleSkills.length + 1)) * (i + 1);
                const y = 26 + i * 4;

                const computedPillWidth = Math.max(spec.width ?? 176, 112 + spec.mark.length * (isMobile ? 6.4 : 8.1));
                const maxPillWidth = isMobile ? cw * 0.72 : cw * 0.4;
                const width = Math.min(computedPillWidth * scale, maxPillWidth);
                const height = (spec.height ?? 52) * scale;

            const el = pillRefs.current[i];
            if (el) {
                el.style.display = "flex";
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;
                    el.style.background = spec.fill;
                    el.style.color = spec.text;
                    el.style.border = `1.5px solid ${spec.stroke}`;
                    el.style.borderRadius = `${Math.round(height / 2)}px`;
                el.textContent = spec.mark;
                el.style.visibility = "visible";
                el.style.whiteSpace = "nowrap";
                const mobileFontSize =
                    spec.mark.length >= 14 ? "0.62rem" :
                    spec.mark.length >= 10 ? "0.68rem" :
                    spec.mark.length >= 7 ? "0.74rem" :
                    "0.8rem";
                el.style.fontSize = isMobile ? mobileFontSize : "1.04rem";
                el.style.letterSpacing = isMobile ? "0.04em" : "0.1em";
                el.style.paddingLeft = isMobile ? "10px" : "16px";
                el.style.paddingRight = isMobile ? "10px" : "16px";
                el.style.transform = `translate3d(${x - width / 2}px, ${y}px, 0)`;
            }

                return Matter.Bodies.rectangle(x, y, width, height, {
                    chamfer: { radius: height / 2 },
                    restitution: 0.25,
                    friction: 0.85,
                    frictionAir: 0.035,
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
                    stiffness: 0.15,
                    damping: 0.1,
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
                    const maxY = floorY - halfH - 8;

                    const clampedX = Math.max(minX, Math.min(maxX, body.position.x));
                    const clampedY = Math.max(minY, Math.min(maxY, body.position.y));

                    if (clampedX !== body.position.x || clampedY !== body.position.y) {
                        Matter.Body.setPosition(body, { x: clampedX, y: clampedY });
                        Matter.Body.setVelocity(body, { x: body.velocity.x * 0.65, y: body.velocity.y * 0.65 });
                    }

                    if (!mouseConstraint.body && clampedY < maxY - 2) {
                        Matter.Body.setVelocity(body, {
                            x: body.velocity.x * 0.98,
                            y: Math.max(body.velocity.y, 0.35),
                        });
                    }

                    el.style.transform = `translate3d(${clampedX - halfW}px, ${clampedY - halfH}px, 0) rotate(${body.angle}rad)`;
                }
            };

            Matter.Events.on(engine, "afterUpdate", onAfterUpdate);

            teardown = () => {
                Matter.Events.off(engine, "afterUpdate", onAfterUpdate);
                Matter.Runner.stop(runner);
                Matter.World.clear(engine.world, false);
                Matter.Engine.clear(engine);
            };
        };

        const handleResize = () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setupWorld();
            }, 120);
        };

        setupWorld();

        window.addEventListener("resize", handleResize);
        const observer = new ResizeObserver(handleResize);
        observer.observe(sceneEl);

        return () => {
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
            if (resizeTimer) clearTimeout(resizeTimer);
            if (teardown) teardown();
        };
    }, []);

    return (
        <div
            ref={sceneRef}
            className="absolute left-0 right-0 z-30 overflow-hidden top-[92px] h-[58vh] min-h-[380px] max-h-[620px] md:top-[72px] md:h-[66vh] md:min-h-[620px]"
            style={{ pointerEvents: "auto", touchAction: "none" }}
        >
            <div
                ref={fallbackRef}
                className="absolute inset-0 z-0 flex flex-wrap content-start gap-2 p-3 transition-opacity duration-300 md:gap-3 md:p-4"
            >
                {SKILLS.slice(0, 6).map((skill) => (
                    <div
                        key={`fallback-${skill.skill}`}
                        className="inline-flex select-none items-center justify-center px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] md:text-[14px]"
                        style={{
                            minWidth: `${Math.max((skill.width ?? 176) * 0.45, 108)}px`,
                            height: "36px",
                            borderRadius: "9999px",
                            background: skill.fill,
                            color: skill.text,
                            border: `1px solid ${skill.stroke}`,
                            fontFamily: "'JetBrains Mono', monospace",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            whiteSpace: "nowrap",
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
                    className="absolute left-0 top-0 select-none items-center justify-center px-3 text-[10px] font-bold uppercase tracking-[0.04em] md:px-5 md:text-[14px]"
                    style={{
                        display: "flex",
                        visibility: "visible",
                        width: `${skill.width ?? 176}px`,
                        height: `${skill.height ?? 52}px`,
                        background: skill.fill,
                        color: skill.text,
                        border: `1.5px solid ${skill.stroke}`,
                        borderRadius: `${Math.round((skill.height ?? 52) / 2)}px`,
                        fontFamily: "'JetBrains Mono', monospace",
                        transformOrigin: "center center",
                        willChange: "transform",
                        transform: `translate3d(${16 + (index % 3) * 116}px, ${18 + Math.floor(index / 3) * 72}px, 0)`,
                        boxShadow: "0 14px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.16)",
                        textRendering: "geometricPrecision",
                        WebkitFontSmoothing: "antialiased",
                        opacity: "1",
                        backfaceVisibility: "hidden",
                        fontWeight: 700,
                        fontSize: "1.04rem",
                        whiteSpace: "nowrap",
                        lineHeight: "1",
                    }}
                >
                    {skill.mark}
                </div>
            ))}
        </div>
    );
};

export default PhysicsPlayground;
