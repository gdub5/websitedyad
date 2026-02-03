from PIL import Image

# Create image with white background (standard OG image size)
width, height = 1200, 630

# Create white background
img = Image.new('RGB', (width, height), (255, 255, 255))

# Load the full logo with transparency
logo_path = "/Users/gwalker/Documents/CodeProjects/websitedyad/images/fullLogo-transparentbackground.png"
logo = Image.open(logo_path).convert('RGBA')

# Scale logo to fit nicely (about 60% of the image width, maintaining aspect ratio)
max_logo_width = int(width * 0.6)
max_logo_height = int(height * 0.5)

# Calculate scale factor to fit within bounds
logo_ratio = logo.width / logo.height
target_ratio = max_logo_width / max_logo_height

if logo_ratio > target_ratio:
    # Logo is wider, constrain by width
    new_width = max_logo_width
    new_height = int(max_logo_width / logo_ratio)
else:
    # Logo is taller, constrain by height
    new_height = max_logo_height
    new_width = int(max_logo_height * logo_ratio)

logo_resized = logo.resize((new_width, new_height), Image.LANCZOS)

# Center the logo on the white background
x = (width - new_width) // 2
y = (height - new_height) // 2

# Paste logo onto white background (using alpha channel as mask)
img.paste(logo_resized, (x, y), logo_resized)

# Save the image
output_path = "/Users/gwalker/Documents/CodeProjects/websitedyad/images/preview.png"
img.save(output_path, "PNG")
print(f"Preview image saved to {output_path}")
print(f"Dimensions: {width}x{height}")
print(f"Logo size: {new_width}x{new_height}")
