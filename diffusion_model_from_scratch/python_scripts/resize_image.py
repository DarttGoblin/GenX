from PIL import Image
import os

input_folder = '../lab2/posters'  # Folder with your original images
output_folder = './resized_images'
target_size = (128, 128)  # Resize to 128x128 or change as needed

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.jpg', '.png', '.jpeg')):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path).convert('RGB')
        img = img.resize(target_size)
        img.save(os.path.join(output_folder, filename))