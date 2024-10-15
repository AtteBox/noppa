# Updates the app's favicon and pwa icons based on the icon.png file
# - Requires ImageMagick to be installed
convert -background transparent "icon.png" -define icon:auto-resize=16,24,32,48,64,72,96,128,256 "./public/favicon.ico"
convert "icon.png" -resize 192x192 "./public/icon-192.png"
convert "icon.png" -resize 512x512 "./public/icon-512.png"