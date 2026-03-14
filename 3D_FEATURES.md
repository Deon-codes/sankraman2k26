# 🎨 Sankraman (Prakalp 4.0) - 3D Interactive Redesign

## 🚀 Overview
The homepage has been completely redesigned with cutting-edge 3D animations and interactive elements to create an immersive experience for the **Sankraman (Prakalp 4.0)** event.

---

## ✨ New Features

### 1. **3D Background Scene (Three.js)**
- **Floating Geometric Shapes**: 15 animated 3D shapes (octahedrons, tetrahedrons, icosahedrons, torus) floating in space
- **Particle System**: 800+ particles creating a starfield effect
- **Dynamic Lighting**: Dual-colored point lights (purple and blue) with ambient lighting
- **Mouse Interaction**: Camera and elements follow mouse movement for parallax effect
- **Wireframe Mode**: Some shapes render in wireframe for visual variety

### 2. **GSAP Scroll Animations**
- **Card Animations**: Cards fade in with scale and 3D rotation effects as you scroll
- **Parallax Scrolling**: Sections move at different speeds for depth
- **Journey Stages**: Special "back.out" easing for playful bounce effect
- **Counter Animations**: Stat numbers count up from 0 when visible
- **Staggered Effects**: Elements animate in sequence with delays

### 3. **3D Card Tilt Effect**
- **Mouse Tracking**: Cards tilt in 3D based on mouse position
- **Perspective Transform**: Uses CSS 3D transforms with 1000px perspective
- **Smooth Reset**: Cards smoothly return to normal when mouse leaves
- **Scale Effect**: Cards slightly enlarge on hover (1.05x)

### 4. **Custom Interactive Cursor**
- **Two-Layer Design**: Inner dot (fast) + outer ring (slower for smooth trail)
- **Hover States**: Cursor expands and changes color on interactive elements
- **Mix Blend Mode**: Uses CSS difference blend for visibility on any background
- **Smooth Following**: Ring follows with easing for organic movement
- **Desktop Only**: Automatically disabled on mobile devices

### 5. **Enhanced Visual Effects**
- **Glow Effects**: Text and elements have animated glow using text-shadow and box-shadow
- **Gradient Shifts**: Background opacity animates for breathing effect
- **Pulse Animation**: Radial gradient pulses in hero section
- **Badge Shine**: Animated shine effect sweeps across badges
- **Footer Fade**: Smooth gradient transition into footer

### 6. **Click Spark Animation**
- Retained from original design
- Added to buttons, cards, and logo
- Customized colors matching the theme

---

## 🎨 Design Theme

### Color Palette
- **Night Indigo**: `#1b003f` (Primary dark)
- **Twilight Purple**: `#4b0082` (Accent purple)
- **Midnight Blue**: `#191970` (Secondary dark)
- **Lavender Haze**: `#e6e6fa` (Text/highlights)
- **Dusky Blue**: `#6495ed` (Interactive elements)

### Typography
- **Display Font**: Cormorant Garamond (elegant serif for headings)
- **Body Font**: DM Sans (clean sans-serif for readability)

---

## 🔧 Technical Stack

### Libraries Used
1. **Three.js** (r128) - 3D rendering
2. **GSAP 3.12.2** - Animation framework
3. **ScrollTrigger** - Scroll-based animations
4. **Vanilla JavaScript** - Custom interactions

### Performance Optimizations
- **Pixel Ratio Limiting**: Max 2x device pixel ratio for 3D canvas
- **Conditional Loading**: 3D features only on desktop (>768px)
- **RequestAnimationFrame**: Smooth 60fps animations
- **Lazy Loading**: Images load on scroll
- **Debounced Events**: Resize handlers optimized

---

## 📱 Responsive Design

### Desktop (>768px)
- Full 3D effects enabled
- Custom cursor active
- Complex hover states
- All animations running

### Tablet/Mobile (≤768px)
- 3D canvas opacity reduced (50%)
- Custom cursor disabled
- Simplified hover effects
- Touch-optimized interactions
- Grid layouts stack vertically

---

## 🎯 User Interactions

### Hero Section
1. **Mouse Movement**: Background elements follow cursor
2. **Scroll**: Journey stages animate in with bounce
3. **Hover**: Buttons glow and elevate

### Cards
1. **Mouse Enter**: Card tilts toward cursor in 3D
2. **Mouse Move**: Tilt adjusts based on position
3. **Mouse Leave**: Card smoothly returns to flat
4. **Click**: Spark effect radiates from click point

### Navigation
1. **Scroll Down**: Shadow appears on navbar
2. **Link Hover**: Text glows with blue shadow
3. **Mobile**: Toggle menu with slide animation

---

## 🚀 How to Use

### View the Page
```bash
# Start local server
python3 -m http.server 8080

# Open in browser
http://localhost:8080
```

### Browser Requirements
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **WebGL Support**: Required for 3D graphics
- **JavaScript Enabled**: All features require JS

### Best Experience
- **Screen Size**: 1920x1080 or larger recommended
- **Hardware**: Dedicated GPU for smooth 3D rendering
- **Internet**: CDN libraries load faster with good connection

---

## 📊 Performance Metrics

### Load Time
- **Initial Load**: ~2-3 seconds (including 3D libraries)
- **3D Scene**: Initializes in <500ms
- **Animations**: 60fps on modern hardware

### Optimization Tips
1. **Reduce Particle Count**: Change `particlesCount` to 400 for slower devices
2. **Fewer Shapes**: Reduce from 15 to 8 shapes in `init3DScene()`
3. **Disable Antialiasing**: Set `antialias: false` in renderer
4. **Lower Pixel Ratio**: Set to 1 instead of device pixel ratio

---

## 🎬 Animation Timeline

### Page Load (0-2s)
1. Hero badge fades in (0.06s delay)
2. Title appears (0.16s delay)
3. Subtitle slides in (0.26s delay)
4. Tagline types out (0.5s start, 2.1s duration)
5. Underline draws (1s start, 1.2s duration)
6. CTA buttons appear (0.48s delay)
7. Journey stages rise (0.85s - 1.3s)
8. Stats counter ready (0.72s delay)

### On Scroll
- Cards: Fade + scale + rotate (0.8s duration)
- Parallax: Continuous smooth movement
- Counters: Animate to final value (2s duration)

---

## 🐛 Troubleshooting

### 3D Scene Not Appearing
- Check browser console for errors
- Verify Three.js CDN is loading
- Ensure WebGL is enabled in browser
- Try in different browser

### Slow Performance
- Reduce particle count (line ~47 in script.js)
- Reduce shape count (line ~71 in script.js)
- Disable custom cursor (comment out line in init())
- Use incognito mode (disable extensions)

### Animations Jerky
- Close other tabs/applications
- Update graphics drivers
- Enable hardware acceleration in browser
- Reduce browser zoom to 100%

### Mobile Issues
- Most 3D features auto-disable on mobile
- Use responsive mode in DevTools to test
- Touch events work differently than mouse

---

## 📝 Customization Guide

### Change Colors
Edit CSS variables in `styles.css`:
```css
--night-indigo: #1b003f;
--twilight-purple: #4b0082;
--dusky-blue: #6495ed;
```

### Adjust Particle Count
In `script.js`, line 47:
```javascript
const particlesCount = 800; // Change this number
```

### Modify Shape Count
In `script.js`, line 71:
```javascript
for(let i = 0; i < 15; i++) { // Change 15 to desired count
```

### Disable Features
In `init()` function, comment out:
```javascript
// init3DScene(); // Disable 3D background
// initCustomCursor(); // Disable custom cursor
// init3DCardTilt(); // Disable card tilt
```

---

## 🎓 Learning Resources

### Three.js
- Official Docs: https://threejs.org/docs/
- Examples: https://threejs.org/examples/

### GSAP
- Docs: https://greensock.com/docs/
- ScrollTrigger: https://greensock.com/scrolltrigger/

### CSS 3D Transforms
- MDN Guide: https://developer.mozilla.org/en-US/docs/Web/CSS/transform

---

## 🔮 Future Enhancements

### Potential Additions
1. **VR Mode**: WebXR support for immersive viewing
2. **Audio Reactive**: Animations respond to background music
3. **Custom Shaders**: GLSL shaders for advanced effects
4. **Physics Engine**: Realistic object interactions
5. **Particle Trails**: Mouse leaves particle trail
6. **Holographic UI**: Futuristic UI overlays
7. **Data Visualization**: 3D charts for event stats

---

## 📄 License
Part of the PRAKALP 2026 - IEEExCRCE project

---

## 👥 Credits
- **Design**: Based on Sankraman theme
- **Development**: Enhanced with Three.js and GSAP
- **Libraries**: Three.js, GSAP, ScrollTrigger
- **Inspiration**: Cyberpunk aesthetics, sci-fi interfaces

---

## 🎉 Enjoy the Experience!
The page is designed to showcase the **"transition from concept to change"** theme through smooth, deliberate animations and interactions. Every element has been carefully crafted to create an immersive journey for visitors.

**Transition is not drift. It is deliberate movement.** 🚀
