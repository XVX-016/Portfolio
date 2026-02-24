import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const SKILLS = [
    "AI/ML", "React", "Python",
    "System Design", "Node.js", "PostgreSQL", "Docker"
];

const ICONS = [
    { name: "React", url: "https://cdn.simpleicons.org/react/white" },
    { name: "Python", url: "https://cdn.simpleicons.org/python/white" },
    { name: "Node.js", url: "https://cdn.simpleicons.org/node-dot-js/white" },
    { name: "Docker", url: "https://cdn.simpleicons.org/docker/white" }
];

const PhysicsPlayground = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<Record<string, HTMLImageElement>>({});
    const engineRef = useRef(Matter.Engine.create({
        enableSleeping: false,
        velocityIterations: 6,
        positionIterations: 6,
        gravity: { x: 0, y: 1.8 }
    }));
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile || !sceneRef.current) return;

        const cw = window.innerWidth;
        const ch = window.innerHeight;
        const { world } = engineRef.current;

        // Preload icons
        ICONS.forEach(icon => {
            const img = new Image();
            img.src = icon.url;
            imagesRef.current[icon.name] = img;
        });

        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engineRef.current,
            options: {
                width: cw,
                height: ch,
                wireframes: false,
                background: "transparent",
                pixelRatio: window.devicePixelRatio, // KEY FOR SHARPNESS
            },
        });

        // ===== THE INVISIBLE CAGE =====
        const wallThickness = 60;
        const floor = Matter.Bodies.rectangle(cw / 2, ch * 0.45, cw + 200, wallThickness, {
            isStatic: true, render: { visible: false }
        });
        const ceiling = Matter.Bodies.rectangle(cw / 2, ch * 0.05 - wallThickness / 2, cw + 200, wallThickness, {
            isStatic: true, render: { visible: false }
        });
        const leftWall = Matter.Bodies.rectangle(-wallThickness / 2, ch / 2, wallThickness, ch * 2, {
            isStatic: true, render: { visible: false }
        });
        const rightWall = Matter.Bodies.rectangle(cw + wallThickness / 2, ch / 2, wallThickness, ch * 2, {
            isStatic: true, render: { visible: false }
        });

        // ===== SKILL PILLS (7 count, 180x55) =====
        const pills = SKILLS.map((skill, i) => {
            const x = 100 + Math.random() * (cw - 200);
            const y = -100 - (i * 120);
            const isHighlight = i % 3 === 0; // ~70/30 mix

            return Matter.Bodies.rectangle(x, y, 180, 55, {
                chamfer: { radius: 27 },
                restitution: 0.2,
                friction: 0.8,
                frictionAir: 0.06,
                plugin: { skill, isHighlight },
                render: {
                    fillStyle: isHighlight ? "#FFFFFF" : "#111111",
                    strokeStyle: isHighlight ? "#000000" : "rgba(255, 255, 255, 0.15)",
                    lineWidth: 1,
                }
            });
        });

        // ===== ICON BODIES =====
        const iconBodies = ICONS.map((icon, i) => {
            const x = 150 + Math.random() * (cw - 300);
            const y = -900 - (i * 180);

            return Matter.Bodies.circle(x, y, 28, {
                restitution: 0.2,
                friction: 0.8,
                frictionAir: 0.06,
                plugin: { name: icon.name },
                render: {
                    fillStyle: "#111111",
                    strokeStyle: "rgba(255, 255, 255, 0.15)",
                    lineWidth: 1,
                }
            });
        });

        // ===== MOUSE CONSTRAINT (elastic drag) =====
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1, // Elastic, smooth drag
                render: { visible: false }
            }
        });

        // Prevent scroll capture
        (mouse as any).element.removeEventListener("mousewheel", (mouse as any).mousewheel);
        (mouse as any).element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

        render.canvas.style.pointerEvents = "none";

        const handlePointerEvents = () => {
            const bodies = Matter.Composite.allBodies(engineRef.current.world);
            const hit = Matter.Query.point(bodies, mouse.position);
            render.canvas.style.pointerEvents = (hit.length > 0 || mouseConstraint.body) ? "auto" : "none";
        };

        Matter.Events.on(engineRef.current, "afterUpdate", handlePointerEvents);
        Matter.World.add(world, [floor, ceiling, leftWall, rightWall, ...pills, ...iconBodies, mouseConstraint]);

        // ===== CUSTOM RENDERING (theme-aware) =====
        Matter.Events.on(render, "afterRender", () => {
            const ctx = render.context;
            const mousePos = mouse.position;
            const isLight = document.documentElement.classList.contains("light-mode");

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            pills.forEach((pill) => {
                const { x, y } = pill.position;
                const angle = pill.angle;
                const { skill, isHighlight } = pill.plugin;

                const dx = mousePos.x - x;
                const dy = mousePos.y - y;
                const isHovered = Math.sqrt(dx * dx + dy * dy) < 90;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);

                // Theme-aware colors
                const bg = isHighlight ? (isLight ? "#000" : "#FFF") : (isLight ? "#FFF" : "#111");
                const text = isHighlight ? (isLight ? "#FFF" : "#000") : (isLight ? "#000" : (isHovered ? "#FFF" : "rgba(255,255,255,0.8)"));
                const stroke = isHovered ? (isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)") : (isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)");

                pill.render.fillStyle = bg;
                pill.render.strokeStyle = stroke;

                if (isHovered) {
                    ctx.shadowColor = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";
                    ctx.shadowBlur = 20;
                    ctx.fillStyle = bg;
                    ctx.strokeStyle = stroke;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.roundRect(-90, -27.5, 180, 55, 27);
                    ctx.fill();
                    ctx.stroke();
                }

                ctx.shadowBlur = 0;
                ctx.font = "bold 13px 'JetBrains Mono', monospace";
                ctx.fillStyle = text;
                ctx.fillText(skill.toUpperCase(), 0, 1);
                ctx.restore();
            });

            iconBodies.forEach((body) => {
                const { x, y } = body.position;
                const angle = body.angle;
                const dx = mousePos.x - x;
                const dy = mousePos.y - y;
                const isHovered = Math.sqrt(dx * dx + dy * dy) < 28;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);

                const iconBg = isLight ? "#FFF" : "#111";
                const iconStroke = isHovered ? (isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)") : (isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)");

                body.render.fillStyle = iconBg;
                body.render.strokeStyle = iconStroke;

                if (isHovered) {
                    ctx.shadowColor = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";
                    ctx.shadowBlur = 20;
                    ctx.fillStyle = iconBg;
                    ctx.strokeStyle = iconStroke;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(0, 0, 28, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }

                const img = imagesRef.current[body.plugin.name];
                if (img && img.complete) {
                    ctx.shadowBlur = 0;
                    if (isLight) ctx.filter = "invert(1)";
                    ctx.drawImage(img, -16, -16, 32, 32);
                    if (isLight) ctx.filter = "none";
                }
                ctx.restore();
            });
        });

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engineRef.current);
        Matter.Render.run(render);

        const handleResize = () => {
            const newCw = window.innerWidth;
            const newCh = window.innerHeight;
            render.canvas.width = newCw * window.devicePixelRatio;
            render.canvas.height = newCh * window.devicePixelRatio;
            render.canvas.style.width = newCw + "px";
            render.canvas.style.height = newCh + "px";
            render.context.scale(window.devicePixelRatio, window.devicePixelRatio);
            Matter.Body.setPosition(floor, { x: newCw / 2, y: newCh * 0.45 });
            Matter.Body.setPosition(ceiling, { x: newCw / 2, y: newCh * 0.05 - wallThickness / 2 });
            Matter.Body.setPosition(rightWall, { x: newCw + wallThickness / 2, y: newCh / 2 });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.World.clear(world, false);
            Matter.Engine.clear(engineRef.current);
            if (render.canvas) render.canvas.remove();
        };
    }, [isMobile]);

    // ===== MOBILE FALLBACK =====
    if (isMobile) {
        return (
            <div className="absolute inset-0 flex flex-wrap gap-3 p-8 items-start justify-center pt-48 opacity-40">
                {SKILLS.map((skill, i) => (
                    <div
                        key={skill}
                        className={`px-5 py-2 rounded-full border text-[10px] font-mono tracking-widest uppercase ${i % 3 === 0 ? "bg-white text-black border-black/20" : "bg-black/40 text-white/80 border-white/10"
                            }`}
                    >
                        {skill}
                    </div>
                ))}
            </div>
        );
    }

    return <div ref={sceneRef} className="absolute inset-0 pointer-events-none z-10" />;
};

export default PhysicsPlayground;
