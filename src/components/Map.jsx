import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

// Constants for better maintainability (copied from the first component)
const COLORS = {
  primary: '#0891b2', // cyan-600
  gradients: {
    from: '#ffffff', // white
    via: '#f0f9ff', // cyan-50
    to: '#e0f2fe'   // cyan-100
  }
};

const SHAPE_TYPES = {
  LINE: 'line',
  CIRCLE: 'circle',
  SQUARE: 'square',
  TRIANGLE: 'triangle',
  DIAMOND: 'diamond'
};

// Utility functions
class RandomUtils {
  static random(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomOpacity(min = 0.05, max = 0.3) {
    return this.random(min, max).toFixed(2);
  }

  static randomRotation() {
    return this.randomInt(-45, 45);
  }

  static randomSlantedRotation() {
    return this.randomInt(-60, 60);
  }

  static randomColor(baseColor = COLORS.primary) {
    const opacity = parseFloat(this.randomOpacity());
    return `${baseColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  }

  static randomShapeType() {
    const shapes = Object.values(SHAPE_TYPES);
    return shapes[this.randomInt(0, shapes.length - 1)];
  }

  static randomPosition() {
    return {
      top: `${this.randomInt(0, 95)}%`,
      left: `${this.randomInt(0, 95)}%`
    };
  }
}

// Shape generator function
const generateRandomShapes = (count, options = {}) => {
  const {
    minSize = 10,
    maxSize = 80,
    minOpacity = 0.05,
    maxOpacity = 0.3,
    color = COLORS.primary,
    types = Object.values(SHAPE_TYPES),
    slantedLinesRatio = 0.4
  } = options;

  return Array.from({ length: count }).map((_, index) => {
    const isSlanted = Math.random() < slantedLinesRatio;
    const type = isSlanted ? SHAPE_TYPES.LINE : types[RandomUtils.randomInt(0, types.length - 1)];
    const size = RandomUtils.randomInt(minSize, maxSize);
    
    return {
      id: `shape-${index}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      type,
      size,
      rotation: isSlanted ? RandomUtils.randomSlantedRotation() : RandomUtils.randomRotation(),
      opacity: parseFloat(RandomUtils.randomOpacity(minOpacity, maxOpacity)),
      color: RandomUtils.randomColor(color),
      position: RandomUtils.randomPosition(),
      animated: Math.random() > 0.3,
      delay: RandomUtils.randomInt(0, 500),
      isSlanted
    };
  });
};

// Decorative shape component with better performance
const DecorativeShape = React.memo(function DecorativeShape({ 
  type = SHAPE_TYPES.LINE, 
  size = 40, 
  rotation = 0, 
  opacity = 0.1, 
  color = COLORS.primary,
  position = {},
  animated = true,
  delay = 0,
  isSlanted = false
}) {
  const baseClasses = `absolute pointer-events-none transition-all duration-700 ${
    animated ? 'group-hover:scale-110 group-hover:opacity-50' : ''
  } ${isSlanted ? 'slanted-shape' : ''}`;
  
  const styles = {
    ...position,
    width: `${size}px`,
    height: type === SHAPE_TYPES.LINE ? '1px' : `${size}px`,
    opacity,
    transform: `rotate(${rotation}deg)`,
    transitionDelay: `${delay}ms`,
  };
  
  const getShapeContent = useMemo(() => {
    switch(type) {
      case SHAPE_TYPES.CIRCLE:
        return <div className="w-full h-full rounded-full border" style={{ borderColor: color }} />;
      case SHAPE_TYPES.SQUARE:
        return <div className="w-full h-full border" style={{ borderColor: color }} />;
      case SHAPE_TYPES.TRIANGLE:
        return (
          <div 
            className="w-full h-full"
            style={{
              borderBottom: `${size}px solid ${color}`,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              opacity,
            }}
          />
        );
      case SHAPE_TYPES.DIAMOND:
        return (
          <div 
            className="w-full h-full border transform rotate-45" 
            style={{ borderColor: color }}
          />
        );
      case SHAPE_TYPES.LINE:
      default:
        return (
          <div 
            className="w-full h-full"
            style={{
              background: isSlanted 
                ? `linear-gradient(${rotation}deg, transparent, ${color}, transparent)`
                : `linear-gradient(90deg, transparent, ${color}, transparent)`,
              opacity,
              width: isSlanted ? `${size * 1.5}px` : `${size}px`,
            }}
          />
        );
    }
  }, [type, size, color, opacity, rotation, isSlanted]);
  
  return (
    <div className={baseClasses} style={styles}>
      {getShapeContent}
    </div>
  );
});

// Animated gradient background component
const AnimatedGradientBackground = React.memo(function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 animate-gradient-shift" />
      <div className="absolute inset-0 animate-gradient-shift-reverse" />
    </div>
  );
});

const Map = ({
  title = "",
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.788085904499!2d55.45817431501157!3d25.379414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d1b5a5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sAl%20Nuaimia%201%20-%20Ajman%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1641234567890!5m2!1sen!2sae",
  address = "",
  hours = {
    weekdays: "",
  },
  contact = {
    email: "basman-naimi@gmail.com",
    phone: "+97167414199",
  },
}) => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState([]);
  const [mapShapes, setMapShapes] = useState([]);

  useEffect(() => {
    // Generate decorative shapes for the map section
    const sectionShapes = generateRandomShapes(RandomUtils.randomInt(8, 15), {
      minSize: 30,
      maxSize: 100,
      minOpacity: 0.04,
      maxOpacity: 0.18,
      slantedLinesRatio: 0.5,
      types: [SHAPE_TYPES.CIRCLE, SHAPE_TYPES.SQUARE, SHAPE_TYPES.DIAMOND, SHAPE_TYPES.LINE]
    });
    
    const mapFrameShapes = generateRandomShapes(RandomUtils.randomInt(4, 8), {
      minSize: 15,
      maxSize: 40,
      minOpacity: 0.08,
      maxOpacity: 0.25,
      types: [SHAPE_TYPES.LINE, SHAPE_TYPES.CIRCLE],
      slantedLinesRatio: 0.7
    });
    
    setShapes(sectionShapes);
    setMapShapes(mapFrameShapes);
  }, []);

  const generateDiagonalLines = useCallback(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const rotation = RandomUtils.randomInt(-60, 60);
      return (
        <div
          key={`diag-${i}`}
          className="absolute w-px h-32 bg-gradient-to-b from-transparent via-cyan-600/10 to-transparent"
          style={{
            top: `${RandomUtils.randomInt(0, 100)}%`,
            left: `${RandomUtils.randomInt(0, 100)}%`,
            transform: `rotate(${rotation}deg)`,
            opacity: RandomUtils.random(0.05, 0.15),
          }}
        />
      );
    });
  }, []);

  const generateContactInfoDecorations = useCallback(() => {
    return ['address', 'hours', 'email', 'phone'].map((item, index) => (
      <React.Fragment key={`contact-decor-${item}`}>
        <div 
          className="absolute left-0 w-4 h-0.5 bg-gradient-to-r from-transparent to-cyan-600/30 transform -rotate-45"
          style={{ top: `${25 + (index * 25)}%` }}
        />
        <div 
          className="absolute right-0 w-4 h-0.5 bg-gradient-to-l from-transparent to-cyan-600/30 transform rotate-45"
          style={{ top: `${25 + (index * 25)}%` }}
        />
      </React.Fragment>
    ));
  }, []);

  const floatingLines = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const rotation = RandomUtils.randomInt(-75, 75);
      return (
        <div
          key={`floating-${i}`}
          className="absolute w-px h-24 bg-gradient-to-b from-transparent via-cyan-600/10 to-transparent animate-float"
          style={{
            top: `${RandomUtils.randomInt(0, 100)}%`,
            left: `${RandomUtils.randomInt(0, 100)}%`,
            transform: `rotate(${rotation}deg)`,
            opacity: RandomUtils.random(0.03, 0.1),
            animationDelay: `${i * 0.7}s`,
          }}
        />
      );
    });
  }, []);

  return (
    <section className="relative container py-16 overflow-hidden">
      <AnimatedGradientBackground />
      
      {/* Section decorative shapes */}
      {shapes.map(shape => (
        <DecorativeShape key={shape.id} {...shape} animated={false} />
      ))}
      
      {/* Additional floating diagonal lines */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingLines}
      </div>
      
      {/* Diagonal cross shapes for decoration */}
      <div className="absolute top-8 right-8 w-24 h-24 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-600 to-transparent transform rotate-45" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-600 to-transparent transform -rotate-45" />
      </div>
      
      <div className="relative max-w-2xl md:max-w-4xl mx-auto text-center z-10">
        <h2 className="title">
            {t("map.title")}
        </h2>
      </div>

      <div className="relative mt-16 lg:mt-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-x-16">
          {/* Map Container with enhanced styling */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl w-[90%] md:w-[80%] mx-auto group">
            {/* Decorative shapes around map */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border border-cyan-600/10 rounded-full animate-spin-slow" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border border-cyan-600/10 rounded-full animate-spin-slow-reverse" />
            
            {/* Decorative corner lines */}
            <div className="absolute top-2 left-2 w-6 h-px bg-gradient-to-r from-cyan-600 to-transparent transform rotate-45" />
            <div className="absolute top-2 right-2 w-6 h-px bg-gradient-to-l from-cyan-600 to-transparent transform -rotate-45" />
            <div className="absolute bottom-2 left-2 w-6 h-px bg-gradient-to-r from-transparent to-cyan-600 transform -rotate-45" />
            <div className="absolute bottom-2 right-2 w-6 h-px bg-gradient-to-l from-transparent to-cyan-600 transform rotate-45" />
            
            {/* Map decorative shapes */}
            {mapShapes.map(shape => (
              <DecorativeShape key={shape.id} {...shape} />
            ))}
            
            {/* Diagonal lines overlay for map */}
            <div className="absolute inset-0 pointer-events-none">
              {generateDiagonalLines()}
            </div>
            
            {/* Map frame gradient overlay */}
            <div className="absolute inset-0 pointer-events-none" />
            
            <iframe
              src={mapSrc}
              width="100%"
              height="480"
              className="relative z-10 rounded-lg border border-cyan-600/20 group-hover:border-cyan-600/40 transition-all duration-500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>

          {/* Contact Information with enhanced styling */}
          <div className="relative px-6 py-8 flex flex-col gap-y-6 rounded-2xl backdrop-blur-sm border border-cyan-600/10 group hover:border-cyan-600/30 transition-all duration-500">
            {/* Background decorative shapes */}
            <div className="absolute inset-0 pointer-events-none">
              {generateContactInfoDecorations()}
            </div>
            
            {/* Decorative border elements */}
            <div className="absolute -top-2 -left-2 w-12 h-px bg-gradient-to-r from-cyan-600 to-transparent transform rotate-45" />
            <div className="absolute -top-2 -right-2 w-12 h-px bg-gradient-to-l from-cyan-600 to-transparent transform -rotate-45" />
            <div className="absolute -bottom-2 -left-2 w-12 h-px bg-gradient-to-r from-transparent to-cyan-600 transform -rotate-45" />
            <div className="absolute -bottom-2 -right-2 w-12 h-px bg-gradient-to-l from-transparent to-cyan-600 transform rotate-45" />
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {['address', 'hours', 'email', 'phone'].map((item, index) => (
              <div 
                key={item} 
                className="relative flex items-center group/item py-3 px-4 rounded-xl hover:bg-gradient-to-r from-transparent via-cyan-600/5 to-transparent transition-all duration-300"
              >
                <div className="absolute left-0 top-1/2 w-1 h-0 bg-gradient-to-b from-cyan-800 via-cyan-800 to-transparent -translate-y-1/2 group-hover/item:h-12 transition-all duration-500" />
                
                {/* Decorative bullet */}
                <div className="w-3 h-3 border border-cyan-600/50 rounded-full group-hover/item:border-cyan-600 group-hover/item:bg-cyan-600/10 transition-all duration-300 flex-shrink-0">
                  <div className="w-1 h-1 bg-cyan-600 rounded-full mx-auto mt-1" />
                </div>
                
                {/* Key with black text and reduced gap */}
                <p className="text-black text-sm md:text-base font-medium tracking-wider capitalize flex-shrink-0 w-20 md:w-24">
                  {t(`map.${item}`)}
                </p>
                
                {/* Value with black text and minimal margin */}
                <span className="text-black/80 text-sm md:text-base tracking-wider ml-2 group-hover/item:text-black transition-colors duration-300">
                  {item === 'address' ? t("map.addressval") :
                  item === 'hours' ? t("map.hoursval") :
                  item === 'email' ? contact.email : contact.phone}
                </span>
                
                {/* Diagonal accent line on hover */}
                <div className="absolute right-4 top-1/2 w-4 h-px bg-gradient-to-l from-transparent to-cyan-600 transform -translate-y-1/2 rotate-45 opacity-0 group-hover/item:opacity-100 transition-all duration-300" />
              </div>
            ))}
            
            {/* Additional decorative elements */}
            <div className="absolute -bottom-4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-600/20 to-transparent" />
            <div className="absolute -top-4 right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-600/20 to-transparent transform rotate-3" />
          </div>
        </div>
      </div>
      
      {/* Section bottom decorative line */}
      <div className="relative mt-12 mx-auto w-48 h-px bg-gradient-to-r from-transparent via-cyan-600 to-transparent" />
    </section>
  );
};

export default Map;

