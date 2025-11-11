# Seaweed Swimmer - HTML5 Playable Ad

## Description
This is a standalone HTML5 version of Seaweed Swimmer, optimized for use as a playable ad on Google Ads and other ad networks.

## Features
- Single HTML file (no external dependencies)
- Fully playable game
- Responsive design
- Works on mobile and desktop
- Call-to-action button linking to Google Play Store
- Local storage for high scores

## File Size
- Total: ~15KB (well under ad network limits)
- Loads instantly

## Ad Network Specifications
- Format: HTML5
- Dimensions: 800x600 (responsive)
- File type: Single HTML file
- Compatible with: Google Ads, Facebook Ads, Unity Ads, IronSource, etc.

## Installation Instructions

### For Google Ads:
1. Go to Google Ads → Display Campaigns → Responsive Display Ads
2. Upload this HTML file as a custom creative
3. Set targeting and budget
4. Launch campaign

### For Other Ad Networks:
1. Check your ad network's HTML5 ad specifications
2. Upload the index.html file
3. Configure click-through URL to your Play Store link
4. Test on preview before publishing

## Customization

### Change Play Store Link:
Edit line with `installCTA` href:
```html
<a id="installCTA" href="YOUR_PLAY_STORE_URL" target="_blank">
```

### Adjust Game Difficulty:
In the JavaScript section, modify:
```javascript
const GRAVITY = 0.20;      // Fish fall speed
const JUMP_FORCE = -4.5;   // Jump height
const BASE_SPEED = 2;      // Obstacle speed
```

### Change Colors:
Modify CSS variables at the top:
```css
background: linear-gradient(180deg, #1e40af 0%, #2563eb 100%);
```

## Testing
1. Open index.html in a web browser
2. Click/tap to play
3. Test on mobile device for touch controls
4. Verify CTA button links correctly

## Performance
- Optimized for fast loading
- No external resources
- Canvas-based rendering
- Smooth 60 FPS gameplay

## Browser Compatibility
- Chrome: ✅
- Firefox: ✅
- Safari: ✅
- Edge: ✅
- Mobile browsers: ✅

## Support
For issues or questions, contact: zeroncool19@gmail.com

## Version
1.0.0 - Initial HTML5 ad version
