
import React, { useEffect, useRef, useState } from 'react';
import { VisitorData } from '@/utils/ipLocator';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface VisitorMapProps {
  visitors: VisitorData[];
  width?: string;
  height?: string;
}

const VisitorMap: React.FC<VisitorMapProps> = ({ 
  visitors, 
  width = '100%', 
  height = '400px' 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize MapLibre map with enhanced styling
    mapInstanceRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          },
          'cyber-grid': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          }
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm'
          },
          {
            id: 'cyber-overlay',
            type: 'fill',
            source: 'cyber-grid',
            paint: {
              'fill-color': 'rgba(100, 255, 218, 0.05)',
              'fill-outline-color': 'rgba(100, 255, 218, 0.2)'
            }
          }
        ]
      },
      center: [0, 20],
      zoom: 2,
      pitch: 0,
      bearing: 0
    });

    // Add enhanced navigation controls with cyber styling
    const nav = new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: true
    });
    mapInstanceRef.current.addControl(nav, 'top-right');

    // Add fullscreen control
    mapInstanceRef.current.addControl(new maplibregl.FullscreenControl(), 'top-left');

    // Add scale control
    mapInstanceRef.current.addControl(new maplibregl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-left');

    // Wait for map to load before adding effects
    mapInstanceRef.current.on('load', () => {
      setMapLoaded(true);
      addCyberGridEffect();
    });

    // Add custom CSS for enhanced controls
    const style = document.createElement('style');
    style.textContent = `
      .maplibregl-ctrl-group {
        background: rgba(15, 23, 42, 0.9) !important;
        border: 1px solid rgba(100, 255, 218, 0.3) !important;
        border-radius: 8px !important;
        backdrop-filter: blur(10px);
      }
      .maplibregl-ctrl-group button {
        background: transparent !important;
        color: rgb(100, 255, 218) !important;
        border: none !important;
      }
      .maplibregl-ctrl-group button:hover {
        background: rgba(100, 255, 218, 0.1) !important;
      }
      .maplibregl-popup-content {
        background: rgba(15, 23, 42, 0.95) !important;
        border: 1px solid rgba(100, 255, 218, 0.3) !important;
        border-radius: 8px !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 20px rgba(100, 255, 218, 0.2) !important;
      }
      .maplibregl-popup-anchor-bottom .maplibregl-popup-tip {
        border-top-color: rgba(15, 23, 42, 0.95) !important;
      }
      .maplibregl-popup-anchor-top .maplibregl-popup-tip {
        border-bottom-color: rgba(15, 23, 42, 0.95) !important;
      }
      .maplibregl-popup-anchor-left .maplibregl-popup-tip {
        border-right-color: rgba(15, 23, 42, 0.95) !important;
      }
      .maplibregl-popup-anchor-right .maplibregl-popup-tip {
        border-left-color: rgba(15, 23, 42, 0.95) !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  const addCyberGridEffect = () => {
    if (!mapInstanceRef.current) return;

    // Create a subtle grid pattern
    const gridFeatures = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lng = -180; lng <= 180; lng += 20) {
        gridFeatures.push({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [lng, lat],
              [lng + 20, lat],
              [lng + 20, lat + 20],
              [lng, lat + 20],
              [lng, lat]
            ]]
          }
        });
      }
    }

    const source = mapInstanceRef.current.getSource('cyber-grid') as maplibregl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: gridFeatures
      });
    }
  };

  // Real-time marker updates
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    // Clear existing markers with animation
    markersRef.current.forEach(marker => {
      const el = marker.getElement();
      el.style.transition = 'all 0.3s ease-out';
      el.style.transform = 'scale(0)';
      el.style.opacity = '0';
      setTimeout(() => marker.remove(), 300);
    });
    markersRef.current = [];

    // Add visitor markers with enhanced animations
    visitors.forEach((visitor, index) => {
      if (visitor.latitude && visitor.longitude) {
        setTimeout(() => {
          addVisitorMarker(visitor);
        }, index * 100); // Staggered animation
      }
    });

    // Auto-fit bounds to show all visitors
    if (visitors.length > 0) {
      const validVisitors = visitors.filter(v => v.latitude && v.longitude);
      if (validVisitors.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        validVisitors.forEach(visitor => {
          bounds.extend([visitor.longitude, visitor.latitude]);
        });
        
        mapInstanceRef.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 8,
          duration: 1000
        });
      }
    }
  }, [visitors, mapLoaded]);

  const addVisitorMarker = (visitor: VisitorData) => {
    if (!mapInstanceRef.current) return;

    // Create enhanced marker element
    const el = document.createElement('div');
    el.className = 'cyber-marker';
    
    const isBlocked = visitor.isBlocked;
    const markerColor = isBlocked ? '#ff5555' : '#64ffda';
    const shadowColor = isBlocked ? 'rgba(255, 85, 85, 0.6)' : 'rgba(100, 255, 218, 0.6)';
    
    el.style.cssText = `
      width: 16px;
      height: 16px;
      background: radial-gradient(circle, ${markerColor} 0%, ${markerColor}88 70%, transparent 100%);
      border: 2px solid ${markerColor};
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      transform: scale(0);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 
        0 0 15px ${shadowColor},
        0 0 30px ${shadowColor}44,
        inset 0 0 8px ${markerColor}33;
      ${isBlocked ? `
        animation: danger-pulse 2s infinite;
      ` : `
        animation: safe-glow 3s infinite alternate;
      `}
    `;

    // Add pulse animations - prevent blinking on hover
    if (!document.getElementById('cyber-marker-animations')) {
      const style = document.createElement('style');
      style.id = 'cyber-marker-animations';
      style.textContent = `
        @keyframes danger-pulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 15px rgba(255, 85, 85, 0.6), 0 0 30px rgba(255, 85, 85, 0.3);
          }
          50% { 
            transform: scale(1.2); 
            box-shadow: 0 0 25px rgba(255, 85, 85, 0.8), 0 0 50px rgba(255, 85, 85, 0.4);
          }
        }
        @keyframes safe-glow {
          0% { 
            box-shadow: 0 0 15px rgba(100, 255, 218, 0.6), 0 0 30px rgba(100, 255, 218, 0.3);
          }
          100% { 
            box-shadow: 0 0 20px rgba(100, 255, 218, 0.8), 0 0 40px rgba(100, 255, 218, 0.4);
          }
        }
        .cyber-marker:hover {
          animation-play-state: paused !important;
          transform: scale(1.3) !important;
          z-index: 1000;
          box-shadow: 0 0 25px ${shadowColor}, 0 0 50px ${shadowColor}66 !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Enhanced popup content with better location formatting
    const popupContent = `
      <div style="
        font-family: 'Inter', sans-serif; 
        font-size: 13px; 
        min-width: 280px; 
        color: rgb(100, 255, 218);
        background: transparent;
        line-height: 1.5;
      ">
        <div style="
          display: flex; 
          align-items: center; 
          margin-bottom: 12px; 
          padding-bottom: 8px; 
          border-bottom: 1px solid rgba(100, 255, 218, 0.2);
        ">
          <div style="
            width: 12px; 
            height: 12px; 
            background: ${markerColor}; 
            border-radius: 50%; 
            margin-right: 8px;
            box-shadow: 0 0 10px ${shadowColor};
          "></div>
          <strong style="color: white; font-size: 14px;">
            ${visitor.city}, ${visitor.country}
          </strong>
        </div>
        
        <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 12px;">
          <span style="color: rgba(100, 255, 218, 0.7); font-weight: 500;">IP Address:</span>
          <span style="color: white; font-family: 'JetBrains Mono', monospace;">${visitor.ip}</span>
          
          <span style="color: rgba(100, 255, 218, 0.7); font-weight: 500;">Coordinates:</span>
          <span style="color: white; font-family: 'JetBrains Mono', monospace;">
            ${visitor.latitude.toFixed(4)}°, ${visitor.longitude.toFixed(4)}°
          </span>
          
          <span style="color: rgba(100, 255, 218, 0.7); font-weight: 500;">Device:</span>
          <span style="color: white;">${visitor.model || visitor.deviceType || "Unknown Device"}</span>
          
          <span style="color: rgba(100, 255, 218, 0.7); font-weight: 500;">System:</span>
          <span style="color: white;">${visitor.operatingSystem || "Unknown OS"}</span>
          
          <span style="color: rgba(100, 255, 218, 0.7); font-weight: 500;">Browser:</span>
          <span style="color: white;">${visitor.browser}${visitor.browserVersion ? ` v${visitor.browserVersion}` : ""}</span>
          
          <span style="color: rgba(100, 255, 218, 0.7); font-weight: 500;">Status:</span>
          <span style="
            color: ${isBlocked ? '#ff5555' : '#64ffda'}; 
            font-weight: 600;
            text-shadow: 0 0 5px ${isBlocked ? '#ff5555' : '#64ffda'}44;
          ">
            ${isBlocked ? "🚫 BLOCKED" : "✅ ALLOWED"}
          </span>
          
          <span style="color: rgba(100, 255, 218, 0.7); font-weight: 500;">Visit Time:</span>
          <span style="color: white; font-size: 11px;">${new Date(visitor.timestamp).toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
          })}</span>
        </div>
      </div>
    `;

    // Create enhanced popup
    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: false,
      maxWidth: '320px',
      className: 'cyber-popup'
    }).setHTML(popupContent);

    // Create marker with enhanced animations
    const marker = new maplibregl.Marker(el)
      .setLngLat([visitor.longitude, visitor.latitude])
      .setPopup(popup)
      .addTo(mapInstanceRef.current);

    // Animate marker entrance
    setTimeout(() => {
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
    }, 100);

    // Add precise location indicator on click
    el.addEventListener('click', () => {
      console.log(`Visitor location: ${visitor.city}, ${visitor.country} (${visitor.latitude}, ${visitor.longitude})`);
    });

    markersRef.current.push(marker);
  };

  return (
    <div className="relative" style={{ width, height }}>
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-md border border-cyber-light overflow-hidden"
        style={{ 
          height: '100%',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)'
        }}
      />
      
      {/* Enhanced status overlay */}
      <div className="absolute bottom-3 right-3 bg-gradient-to-r from-cyber-dark/95 to-slate-800/95 text-cyber-text text-xs px-4 py-2 rounded-lg border border-cyber-light/30 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-cyber-highlight rounded-full mr-2 animate-pulse"></div>
            <span>Live: {visitors.length}</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span>Blocked: {visitors.filter(v => v.isBlocked).length}</span>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-cyber-dark/90 backdrop-blur-sm">
          <div className="text-cyber-highlight flex items-center">
            <div className="w-4 h-4 border-2 border-cyber-highlight border-t-transparent rounded-full animate-spin mr-2"></div>
            Initializing Security Map...
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorMap;
