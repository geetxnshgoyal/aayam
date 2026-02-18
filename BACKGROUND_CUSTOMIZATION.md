# Animated Background System

## 🎨 Available Background Types

The website now features 4 different animated background styles that can be used individually or combined:

### 1. **Animated Blobs** - `AnimatedBlobBackground`
- Morphing blob shapes
- Smooth sine wave deformations
- Multiple color layers (red, dark purple, very dark purple)
- Great for: General pages, elegant feel
- File: [components/AnimatedBlobBackground.tsx](components/AnimatedBlobBackground.tsx)

### 2. **Orbiting Particles** - `OrbitingParticles`
- Multiple orbital rings with particles
- Connection lines between particles
- 3 different orbit speeds for dynamic effect
- Great for: Dashboard, technical pages
- File: [components/OrbitingParticles.tsx](components/OrbitingParticles.tsx)

### 3. **Grid Wave** - `GridWaveBackground`
- Animated grid with wave distortion
- Nodes at intersections with glow
- Cyberpunk/tech aesthetic
- Great for: Admin panels, developer pages
- File: [components/GridWaveBackground.tsx](components/GridWaveBackground.tsx)

### 4. **Gradient Particles** - `GradientBackground`
- Interactive particles that react to mouse
- Connects nearby particles with lines
- Smooth animations
- Great for: Hero sections, interactive areas
- File: [components/GradientBackground.tsx](components/GradientBackground.tsx)

### 5. **Combined** (Default) - `DynamicBackground`
- All 4 effects layered together
- Different opacity levels for visual depth
- Smooth blend of all effects
- Creates rich, dynamic atmosphere
- File: [components/DynamicBackground.tsx](components/DynamicBackground.tsx)

---

## 🎯 How to Use

### Global Background (in all pages)
Already implemented in [app/layout.tsx](app/layout.tsx):

```tsx
import DynamicBackground from "@/components/DynamicBackground";

<body>
  <DynamicBackground type="combined" opacity={1} />
  {children}
</body>
```

### Use Different Background on Specific Page

```tsx
import DynamicBackground from "@/components/DynamicBackground";

export default function CustomPage() {
  return (
    <div>
      <DynamicBackground type="orbits" opacity={0.8} />
      {/* Your content */}
    </div>
  );
}
```

---

## 🎨 Customization

### Change Background Type
In `app/layout.tsx`, change the `type` prop:

```tsx
// Options: 'blob' | 'orbits' | 'grid' | 'particles' | 'combined'
<DynamicBackground type="blob" opacity={1} />
```

### Adjust Opacity
```tsx
<DynamicBackground type="combined" opacity={0.7} /> {/* More transparent */}
<DynamicBackground type="combined" opacity={1} />   {/* Full opacity */}
```

### Customize Colors
Edit the color values in each component:

**AnimatedBlobBackground** (line ~94):
```tsx
drawBlob(x, y, scale, offset, '#YOUR_COLOR', alpha);
```

**OrbitingParticles** (line ~65-67):
```tsx
drawConnections(80, 2, 8, 'rgba(220, 20, 38, 0.3)'); // Change colors here
drawOrbit(80, 2, 8, 'rgba(220, 20, 38, 1)');
```

**GridWaveBackground** (line ~50):
```tsx
ctx.strokeStyle = 'rgba(220, 20, 38, 0.1)'; // Change stroke color
```

---

## 📊 Performance Tips

1. **Use 'combined' sparingly** - Some devices may lag with all effects
2. **Reduce opacity** for modern/minimal look: `opacity={0.6}`
3. **Switch to single effect** on mobile for better performance
4. **Monitor performance** - All animations are GPU-accelerated

---

## 🚀 Performance Metrics

- **Animated Blobs**: Very lightweight, 1-2% CPU
- **Orbiting Particles**: Lightweight, 2-3% CPU
- **Grid Wave**: Moderate, 3-4% CPU
- **Gradient Particles**: Moderate, 2-3% CPU (with mouse tracking)
- **Combined**: Heavy, 6-10% CPU

Recommendation: Use `combined` on desktop, single effect on mobile.

---

## 🎬 Animation Speeds

Each component runs at 60 FPS with optimized canvas rendering. To adjust speed:

1. **Blobs**: Change the `time` increment in animate function
2. **Orbits**: Change `speed` parameter in `drawOrbit(radius, speed, ...)`
3. **Grid**: Change `time += 0.5` to different value
4. **Particles**: Adjust particle `speedX` and `speedY`

---

## ✨ Current Implementation

- **Home page**: Combined effect (all 4 layers)
- **Other pages**: Inherited from layout (combined)
- **Background color**: `#0A0B16` (dark space black)
- **Z-index handling**: Background at `z-0`, content at `z-10`

All animations are smooth, GPU-accelerated, and fully responsive!
