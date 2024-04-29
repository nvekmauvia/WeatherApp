import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

function WeatherDisplay({ cloudiness, raininess }) {
    const sketchRef = useRef();

    useEffect(() => {
        const sketch = (p) => {
            p.setup = () => {
                p.createCanvas(400, 400);
                p.noLoop();
            };

            p.draw = () => {
                p.background(200);
                drawClouds(cloudiness);
                drawRain(raininess);
            };

            function drawClouds(cloudCoverage) {
                p.fill(240);
                for (let i = 0; i < cloudCoverage; i++) {
                    p.ellipse(Math.random() * p.width, 50, 60, 40);
                }
            }

            function drawRain(rainIntensity) {
                p.stroke(0, 0, 255);
                for (let i = 0; i < rainIntensity; i++) {
                    p.line(Math.random() * p.width, Math.random() * 100, Math.random() * p.width, Math.random() * p.width);
                }
            }
        };

        const p5Instance = new p5(sketch, sketchRef.current);

        return () => {
            p5Instance.remove();
        };
    }, [cloudiness, raininess]);

    return <div ref={sketchRef}></div>;
}

export default WeatherDisplay;
