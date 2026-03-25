from PIL import Image
import sys

def extract():
    try:
        img = Image.open('public/bg.jpg').convert('RGBA')
        width, height = img.size
        pixels = img.load()
        
        # We process pixel by pixel.
        # Background is mostly orange/yellow (bright), Dune is dark brown.
        # Let's use a threshold on brightness.
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                # Calculate relative luminance
                luminance = (0.299 * r + 0.587 * g + 0.114 * b)
                
                # Soft blending threshold
                # If luminance is high (sky), alpha = 0
                # If luminance is low (dune), alpha = 255
                if luminance > 120:
                    # Make it transparent
                    pixels[x, y] = (r, g, b, 0)
                else:
                    # Keep opaque
                    pixels[x, y] = (r, g, b, 255)
                    
        img.save('public/fg.png', 'PNG')
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    extract()
