from PIL import Image, ImageDraw, ImageFont
import os

# Create image with gradient background
width, height = 1200, 630

# Create gradient background
img = Image.new('RGB', (width, height))
pixels = img.load()

for y in range(height):
    for x in range(width):
        # Diagonal gradient from top-left to bottom-right
        t = (x + y) / (width + height)
        # Colors: #1a1a2e -> #16213e -> #0f0f23
        if t < 0.5:
            t2 = t * 2
            r = int(0x1a + (0x16 - 0x1a) * t2)
            g = int(0x1a + (0x21 - 0x1a) * t2)
            b = int(0x2e + (0x3e - 0x2e) * t2)
        else:
            t2 = (t - 0.5) * 2
            r = int(0x16 + (0x0f - 0x16) * t2)
            g = int(0x21 + (0x0f - 0x21) * t2)
            b = int(0x3e + (0x23 - 0x3e) * t2)
        pixels[x, y] = (r, g, b)

draw = ImageDraw.Draw(img)

# Try to load a system font, fallback to default
try:
    title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 64)
    tagline_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
except:
    try:
        title_font = ImageFont.truetype("/System/Library/Fonts/SFNSText.ttf", 64)
        tagline_font = ImageFont.truetype("/System/Library/Fonts/SFNSText.ttf", 24)
    except:
        title_font = ImageFont.load_default()
        tagline_font = ImageFont.load_default()

# Draw stylized DD logo (simplified)
logo_x, logo_y = 520, 150
logo_size = 120

# Blue D
draw.text((logo_x, logo_y), "D", fill=(79, 181, 243), font=ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 150) if os.path.exists("/System/Library/Fonts/Helvetica.ttc") else title_font)
# Orange D (offset)
draw.text((logo_x + 50, logo_y), "D", fill=(239, 99, 7), font=ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 150) if os.path.exists("/System/Library/Fonts/Helvetica.ttc") else title_font)

# Draw "COMING SOON" with gradient effect (approximate with two-color blend)
title = "COMING SOON"
title_bbox = draw.textbbox((0, 0), title, font=title_font)
title_width = title_bbox[2] - title_bbox[0]
title_x = (width - title_width) // 2
title_y = 380

# Create gradient text effect
for i, char in enumerate(title):
    char_x = title_x + draw.textlength(title[:i], font=title_font)
    t = i / len(title)
    r = int(79 + (239 - 79) * t)
    g = int(181 + (99 - 181) * t)
    b = int(243 + (7 - 243) * t)
    draw.text((char_x, title_y), char, fill=(r, g, b), font=title_font)

# Draw tagline
tagline = "Human insight. AI power. Unified results."
tagline_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
tagline_width = tagline_bbox[2] - tagline_bbox[0]
tagline_x = (width - tagline_width) // 2
tagline_y = 470
draw.text((tagline_x, tagline_y), tagline, fill=(160, 160, 160), font=tagline_font)

# Save the image
output_path = "/Users/gwalker/Documents/CodeProjects/websitedyad-temp/preview.png"
img.save(output_path, "PNG")
print(f"Preview image saved to {output_path}")
