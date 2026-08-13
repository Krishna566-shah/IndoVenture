import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const INDIA_TOPO_JSON = "https://cdn.jsdelivr.net/gh/BolajiBI/topojson-maps@master/countries/india/india-states.json";

const IndiaMap = ({ activeState, setActiveState }) => {
  // 1. 🧠 New state to track the mouse position and the currently hovered state
  const [hoveredState, setHoveredState] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={{ scale: 1050, center: [80, 22] }}
        width={800}
        height={600}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) => {
            if (!geographies) return null;

            return geographies.map((geo) => {
              const stateName = geo.properties?.NAME_1 || "Unknown"; 
              const isActive = activeState === stateName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (stateName !== "Unknown") {
                      setActiveState(isActive ? 'All' : stateName);
                    }
                  }}
                  // 2. 🖱️ The Hover Magic: Track when the mouse enters, moves, and leaves
                  onMouseEnter={() => {
                    if (stateName !== "Unknown") setHoveredState(stateName);
                  }}
                  onMouseLeave={() => {
                    setHoveredState("");
                  }}
                  onMouseMove={(e) => {
                    setMousePosition({ x: e.clientX, y: e.clientY });
                  }}
                  style={{
                    default: {
                      fill: isActive ? "var(--primary-color)" : "#F0E6DD",
                      outline: "none",
                      stroke: "#FFFFFF",
                      strokeWidth: 1.5,
                      transition: "all 0.3s ease"
                    },
                    hover: {
                      fill: "var(--primary-hover)",
                      outline: "none",
                      cursor: stateName !== "Unknown" ? "pointer" : "default",
                      transform: "translateY(-2px)",
                    },
                    pressed: {
                      fill: "var(--primary-color)",
                      outline: "none"
                    }
                  }}
                />
              );
            });
          }}
        </Geographies>
      </ComposableMap>
      
      <p className="text-center text-muted small mt-3 fw-bold">
        {activeState === 'All' ? "Select a state on the map" : `Currently viewing: ${activeState}`}
      </p>

      {/* 3. 🎈 The Floating Tooltip UI */}
      {hoveredState && (
        <div 
          style={{
            position: 'fixed',
            top: mousePosition.y - 45, // Floats slightly above the cursor
            left: mousePosition.x + 15, // Floats slightly to the right
            background: 'var(--text-dark)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: '600',
            pointerEvents: 'none', // Critical: Prevents the tooltip from blocking clicks!
            zIndex: 9999,
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          }}
        >
          {hoveredState}
        </div>
      )}
    </div>
  );
};

export default IndiaMap;