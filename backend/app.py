from flask import Flask, request, jsonify
from langchain_huggingface import HuggingFaceEndpoint
from langchain import ConversationChain
from langchain.memory import ConversationBufferMemory
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

os.environ['HUGGINGFACEHUB_API_TOKEN'] = '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'
# os.environ['HF_TOKEN'] = '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'


repo_id = "mistralai/Mistral-7B-Instruct-v0.3"
llm = HuggingFaceEndpoint(repo_id=repo_id, max_length=128, temperature=0.7, token=os.getenv('HUGGINGFACEHUB_API_TOKEN'))



@app.route('/')
def index():
    return 'Server is running successfully!'

# Ensure this route only accepts POST requests
@app.route('/ask', methods=['POST'])
def ask_model():
    # concanate ? mark in data
    data = request.json 
    # print(data) ; 
    question = data.get('question')

    if not question:
        return jsonify({"error": "No question provided"}), 400
    
    if not question.endswith('?'):
        question += '?'
        print(question)

    # Generate response using the model
    response = llm.invoke(question)
    #  in rensonse ``` is added in the start and end of the response`
    if response.startswith('`'):
        response = response[1:]
        print(response)
    
    
    return jsonify({"question": question, "answer": response})


if __name__ == '__main__':
    app.run(debug=True)
    
    
    
    
    
