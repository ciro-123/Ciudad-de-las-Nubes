# Asset Replacement Guide

## Logo
- **File**: `public/logo.svg`
- **Format**: SVG preferred (scales infinitely), or PNG
- **Recommended size**: If using PNG, export at **400×120 pixels** (@2x: 800×240) for crisp display
- **Used in**: Top-left of the page, inside the header/navigation area
- **Current**: Placeholder SVG text "GOOBLIN STUDIO"

## Favicon
- **File**: `public/favicon.ico` (or `public/favicon.svg` for modern browsers)
- **Format**: `.ico` (multi-size: 16×16, 32×32, 48×48) or `.svg`
- **Also create**: `public/icon-192.png` (192×192) and `public/icon-512.png` (512×512) for PWA/mobile
- **Used in**: Browser tab, bookmarks, mobile home screen
- **Current**: Placeholder generated favicon

## Open Graph Image
- **File**: `public/og-image.jpg`
- **Format**: JPEG or PNG
- **Size**: **1200×630 pixels** (standard OG image)
- **Used in**: Social media link previews (Twitter, Facebook, Discord, etc.)
- **Current**: Not yet created — add when ready

## How to replace
1. Simply overwrite the files at the paths listed above with your real assets
2. Keep the same filenames, or update the references in:
   - `src/app/layout.tsx` (favicon, OG image metadata)
   - `src/components/TimelineNav.tsx` (logo)
