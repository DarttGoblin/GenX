# app.py
from flask import Flask, request, jsonify
from diffusers import StableDiffusionPipeline
import torch
from io import BytesIO
import base64
from waitress import serve  # Production-ready server

app = Flask(__name__)

# Global model variable
pipe = None

def load_model():
    global pipe
    if pipe is None:
        print("Loading model...")
        pipe = StableDiffusionPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5",
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            safety_checker=None
        )
        pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")
        print("Model loaded!")

@app.before_first_request
def initialize():
    load_model()

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
        if seed:
            generator = torch.Generator(device="cuda" if torch.cuda.is_available() else "cpu").manual_seed(int(seed))
            
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
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    load_model()  # Pre-load model
    serve(app, host="0.0.0.0", port=5000)  # Production server