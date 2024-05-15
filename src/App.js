import './App.css';
import MotorModel from './Motorcycle';
import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { OrbitControls, useProgress } from '@react-three/drei'
import React from 'react';
import { useMediaQuery } from 'react-responsive';


function App() {
  const canvasClassName = 'motor';
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const positionModel = isDesktop ? [0, -0.5, 0] : [0, -0.3, 0]; 
  const rotationModel = isDesktop ? [0, Math.PI / 4, 0] : [0, Math.PI / 1.7, 0];
  const { progress } = useProgress();
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setLoadingComplete(true);
    }
  }, [progress]);

  const assignIdToCanvas = () => {
    const canvasElement = document.querySelector(`.${canvasClassName}`);
    if (canvasElement) {
      canvasElement.id = 'motor';
    }
  };

  return (
    <div className="App">
      <div className="main-div">
        <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" 
            className="transition duration-300 ease-in-out delay-150 navbar-svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="43%" x2="100%" y2="57%">
                    <stop offset="5%" stopColor="#8ed1fc"></stop>
                    <stop offset="95%" stopColor="#2c3737"></stop>
                </linearGradient>
            </defs>
            <path d="M 0,600 L 0,225 C 74.133971291866,179.76555023923444 148.267942583732,
                134.5311004784689 252,157 C 355.732057416268,179.4688995215311 489.0622009569379,
                269.64114832535887 599,259 C 708.9377990430621,248.35885167464113 795.4832535885168,
                136.9043062200957 893,113 C 990.5167464114832,89.09569377990432 1099.0047846889952,
                152.7416267942584 1192,186 C 1284.9952153110048,219.2583732057416 1362.4976076555024,
                222.1291866028708 1440,225 L 1440,600 L 0,600 Z" 
                stroke="none" strokeWidth="0" fill="url(#gradient)" 
                fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0" 
                transform="rotate(-180 720 300)">
            </path>
        </svg>
      </div>

      <div className='top-nav-bar'>
              <div className="logo">
                  <img src="logo.png" alt="logo" width="40"/>
              </div>
      </div>

      <Canvas
        className={canvasClassName}
        camera={{ position: [2, 0, 4], fov: 40 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          assignIdToCanvas();
        }}
      >
      <ambientLight intensity={3} />
        <directionalLight position={[5, 5, 5]} intensity={1}
                          castShadow 
                          shadow-mapSize={{ width: 1024, height: 1024 }}
                          shadow-bias={-0.001}/>
        <directionalLight position={[-5, -5, -5]} 
                          intensity={0.5} 
                          castShadow 
                          shadow-mapSize={{ width: 1024, height: 1024 }}
                          shadow-bias={-0.001}/>
        <directionalLight position={[0, 5, -5]} 
                          intensity={2} 
                          castShadow 
                          shadow-mapSize={{ width: 1024, height: 1024 }}
                          shadow-bias={-0.001}/>
        <directionalLight position={[0, 10, 5]} 
                          intensity={1} 
                          castShadow 
                          shadow-mapSize={{ width: 1024, height: 1024 }}
                          shadow-bias={-0.001}/>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[0, 15, 0]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <Suspense fallback={null}>
        <MotorModel position={positionModel} rotation={rotationModel}/>
      </Suspense>
      <OrbitControls
        minDistance={1}
        maxDistance={6}
      />
      </Canvas>

      <div className="copyright">
        <p>ⓒ 2024 by JFAD</p>
      </div>

      <div className={`loading ${loadingComplete ? 'gone' : ''}`}>
        <p>Loading {Math.floor(progress)}%</p>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
