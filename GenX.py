from flask import Flask, request, jsonify
from diffusers import StableDiffusionPipeline
import torch
from io import BytesIO
import base64
import traceback
import os

app = Flask(__name__)

pipe = None
MODEL_DIR = "./models/stable-diffusion-v1-5"

def load_model():
    global pipe
    if pipe is None:
        print("Loading model...")
        if os.path.exists(MODEL_DIR):
            # Load from local path if already downloaded
            pipe = StableDiffusionPipeline.from_pretrained(
                MODEL_DIR,
                torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
                safety_checker=None
            )
        else:
            # First time: download from HF, then save
            pipe = StableDiffusionPipeline.from_pretrained(
                "runwayml/stable-diffusion-v1-5",
                torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
                safety_checker=None
            )
            pipe.save_pretrained(MODEL_DIR)

        pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")
        print("Model loaded!")

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.json
        prompt = data['prompt']
        negative_prompt = data.get('negative_prompt', '')
        steps = int(data.get('steps', 30))
        guidance = float(data.get('guidance_scale', 7.5))
        seed = data.get('seed')
        
        generator = None
        if seed is not None:
            device = "cuda" if torch.cuda.is_available() else "cpu"
            generator = torch.Generator(device=device).manual_seed(int(seed))
            
        image = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=steps,
            guidance_scale=guidance,
            generator=generator
        ).images[0]
        
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        return jsonify({
            'status': 'success',
            'image': f"data:image/png;base64,{img_str}"
        })
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    load_model()
    app.run(host='0.0.0.0', port=5000, debug=True)
