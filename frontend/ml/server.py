from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import time
from predict import predict_transaction
from preprocess import load_data

app = FastAPI()

# Allow CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (change to specific frontend URL in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws/traffic")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    print("Frontend connected to live traffic stream!")
    
    try:
        # Load the dataset to simulate real-time streaming
        df = load_data()
        
        # Loop indefinitely to simulate continuous traffic
        while True:
            for index, row in df.iterrows():
                features = row.drop("Class").tolist()
                actual_class = int(row["Class"])
                
                # Run prediction
                result = predict_transaction(features)
                
                # Format payload to send to frontend
                payload = {
                    "timestamp": time.time(),
                    "amount": features[-1], # The amount column in creditcard.csv
                    "prediction": result["prediction"],
                    "fraud_probability": result["fraud_probability"],
                    "is_actual_fraud": actual_class == 1,
                    "status": "Suspicious" if result["prediction"] == 1 else "Normal"
                }
                
                # Send data to React frontend
                await websocket.send_text(json.dumps(payload))
                
                # Wait 2 seconds before sending the next packet (simulates real-time flow)
                await asyncio.sleep(2)
            
    except WebSocketDisconnect:
        print("Frontend disconnected.")
    except Exception as e:
        print(f"Error streaming data: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
