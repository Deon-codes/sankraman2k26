# 🚀 Sankraman (Prakalp 4.0) - 3D Interactive Event Page

## ✨ What's New?

Your event page has been completely transformed with cutting-edge 3D animations and interactive effects!

### 🎯 Quick Overview

**Before:** Static page with basic animations
**After:** Immersive 3D experience with interactive elements

---

## 🎨 Major Features Added

### 1. **3D Background Scene** (Three.js)
- 800+ floating particles creating a starfield
- 15 animated geometric shapes (octahedrons, tetrahedrons, etc.)
- Dynamic purple and blue lighting
- Mouse-reactive parallax camera movement
- Continuous rotation and floating animations

### 2. **Advanced Scroll Animations** (GSAP + ScrollTrigger)
- Cards fade in with 3D rotation effects
- Parallax scrolling on all sections
- Journey stages bounce in with spring physics
- Stats counter animations (0 → final value)
- Staggered animations for smooth flow

### 3. **3D Card Tilt Effect**
- Cards tilt in 3D based on mouse position
- Smooth perspective transforms
- Enhanced glow on hover
- Automatic reset when mouse leaves

### 4. **Custom Interactive Cursor**
- Two-layer design (dot + ring)
- Smooth following with easing
- Expands on interactive elements
- Desktop-only feature

### 5. **Visual Enhancements**
- Animated text glow effects
- Pulsing radial gradients
- Badge shine animations
- Section divider glows
- Enhanced hover states everywhere

---

## 🖥️ How to View

### Start the Server
\`\`\`bash
cd /media/davidporathur/Data4/Documents/CRCE/project_cell/prakalp-draft1
python3 -m http.server 8080
\`\`\`

### Open in Browser
\`\`\`
http://localhost:8080
\`\`\`

### Best Experience
- **Desktop Browser**: Chrome, Firefox, Safari, or Edge (latest)
- **Screen Size**: 1920x1080 or larger recommended
- **Hardware**: Dedicated GPU for smooth 3D rendering
- **JavaScript**: Must be enabled

---

## 🎬 What to Test

### Mouse Movement
1. Move your cursor around the hero section
2. Watch the 3D background follow your mouse
3. See the custom cursor with ring

### Scrolling
1. Scroll down the page slowly
2. Watch cards animate in with 3D effects
3. See the stats count up from zero
4. Notice parallax movement

### Hovering
1. Hover over cards → They tilt in 3D
2. Hover over buttons → They glow and elevate
3. Hover over nav links → They glow
4. Hover over stats → They scale up

### Clicking
1. Click any button → Spark effect radiates
2. Click cards → Sparks appear
3. Click logo → Large spark animation

---

## 📁 Files Modified

- ✅ **index.html** - Added Three.js, GSAP, and 3D canvas
- ✅ **script.js** - Added 3D scene, GSAP animations, cursor, tilt effects
- ✅ **styles.css** - Added 3D styles, cursor, enhanced effects

---

## 📚 Documentation

Three comprehensive guides have been created:

1. **3D_FEATURES.md** - Complete technical documentation
2. **REDESIGN_SUMMARY.md** - Before/after comparison
3. **VISUAL_GUIDE.md** - Interactive element map

---

## 🎨 Theme Alignment

✅ **Sankraman Concept** - Transition from concept to change
- Floating shapes represent transformation
- Smooth animations show deliberate movement
- Journey stages visualize the progression

✅ **Color Palette** - Dark purple/blue theme
- Night indigo, twilight purple, midnight blue
- Lavender haze for elegance
- Dusky blue for interactivity

✅ **Professional & Modern**
- Clean typography (Cormorant Garamond + DM Sans)
- Elegant animations (not overdone)
- Responsive design for all devices

---

## ⚡ Performance

### Optimizations
- Pixel ratio capped at 2x for 3D
- RequestAnimationFrame for 60fps
- Conditional loading (desktop vs mobile)
- Debounced resize handlers
- Lazy loading images

### Mobile Adaptations
- 3D canvas opacity reduced
- Custom cursor disabled
- Simplified hover effects
- Touch-optimized interactions

---

## 🎯 Key Interactions

| Element | Action | Effect |
|---------|--------|--------|
| Background | Mouse move | Parallax camera |
| Cards | Hover | 3D tilt + glow |
| Buttons | Hover | Elevate + glow |
| Buttons | Click | Spark effect |
| Stats | Scroll in | Count animation |
| Journey | Scroll in | Bounce animation |

---

## 🐛 Troubleshooting

### 3D Not Working?
- Check browser console for errors
- Ensure WebGL is enabled
- Try in incognito mode
- Update browser to latest version

### Slow Performance?
- Reduce particle count (script.js line 47)
- Reduce shape count (script.js line 71)
- Close other tabs
- Enable hardware acceleration

### Mobile Issues?
- Most 3D features auto-disable
- Use responsive mode in DevTools
- Touch events work differently

---

## 🔧 Customization

### Change Colors
Edit CSS variables in \`styles.css\`:
\`\`\`css
--night-indigo: #1b003f;
--twilight-purple: #4b0082;
--dusky-blue: #6495ed;
\`\`\`

### Adjust Particle Count
In \`script.js\`, line 47:
\`\`\`javascript
const particlesCount = 800; // Change this
\`\`\`

### Disable Features
In \`init()\` function, comment out:
\`\`\`javascript
// init3DScene();
// initCustomCursor();
// init3DCardTilt();
\`\`\`

---

## 🎉 Result

Your Sankraman (Prakalp 4.0) event page now features:

✨ **Immersive 3D environment**
✨ **Smooth, deliberate animations**
✨ **Interactive user experiences**
✨ **Professional design**
✨ **Optimized performance**
✨ **Full responsive support**

**"Transition is not drift. It is deliberate movement."** 🚀

The page perfectly embodies this philosophy through carefully orchestrated 3D animations and interactions!

---

## 🔗 Resources

- **Three.js Docs**: https://threejs.org/docs/
- **GSAP Docs**: https://greensock.com/docs/
- **ScrollTrigger**: https://greensock.com/scrolltrigger/

---

## 📧 Support

For questions or issues, check the detailed documentation files:
- 3D_FEATURES.md
- REDESIGN_SUMMARY.md
- VISUAL_GUIDE.md

---

**Created for Sankraman (Prakalp 4.0) - IEEExCRCE 2026**
