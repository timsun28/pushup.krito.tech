"use client";

import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

export const Confetti = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        // @ts-ignore
        await loadFull(engine);
    }, []);
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: {
                    zIndex: 1,
                },
                emitters: {
                    position: {
                        x: 50,
                        y: 100,
                    },
                    rate: {
                        quantity: 5,
                        delay: 0.15,
                    },
                },
                particles: {
                    color: {
                        value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"],
                    },
                    move: {
                        decay: 0.05,
                        direction: "top",
                        enable: true,
                        gravity: {
                            enable: true,
                        },
                        outModes: {
                            top: "none",
                            default: "destroy",
                        },
                        speed: {
                            min: 50,
                            max: 100,
                        },
                    },
                    number: {
                        value: 0,
                    },
                    opacity: {
                        value: 1,
                    },
                    rotate: {
                        value: {
                            min: 0,
                            max: 360,
                        },
                        direction: "random",
                        animation: {
                            enable: true,
                            speed: 30,
                        },
                    },
                    tilt: {
                        direction: "random",
                        enable: true,
                        value: {
                            min: 0,
                            max: 360,
                        },
                        animation: {
                            enable: true,
                            speed: 30,
                        },
                    },
                    size: {
                        value: 3,
                        animation: {
                            enable: true,
                            startValue: "min",
                            count: 1,
                            speed: 16,
                            sync: true,
                        },
                    },
                    roll: {
                        darken: {
                            enable: true,
                            value: 25,
                        },
                        enlighten: {
                            enable: true,
                            value: 25,
                        },
                        enable: true,
                        speed: {
                            min: 5,
                            max: 15,
                        },
                    },
                    wobble: {
                        distance: 30,
                        enable: true,
                        speed: {
                            min: -7,
                            max: 7,
                        },
                    },
                    shape: {
                        type: ["circle", "square"],
                        options: {},
                    },
                },
                responsive: [
                    {
                        maxWidth: 1024,
                        options: {
                            particles: {
                                move: {
                                    speed: {
                                        min: 33,
                                        max: 66,
                                    },
                                },
                            },
                        },
                    },
                ],
            }}
        />
    );
};
