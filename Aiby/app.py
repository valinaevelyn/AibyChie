from flask import Flask, render_template, url_for, request, jsonify
from prep import get_response, speak_text, record_audio

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        pass
    else:
        return render_template('homePage.html')

@app.route('/index')
def about():
    return render_template('index.html')

@app.route('/chat_using_audio', methods=['POST'])
def chat_using_audio():
    try:
        user_input_audio = record_audio()
        if user_input_audio is None:
            speak_text("Maaf, Saya tidak mengerti")
            return jsonify({'user_input_audio': 'Inaudible', 'ai_response': "Maaf, Saya tidak mengerti"})
        print('\nUSER INPUT:\n', user_input_audio, '\n\n')
        ai_response = get_response(user_input_audio)
        speak_text(ai_response)
        return jsonify({'user_input_audio': user_input_audio, 'ai_response': ai_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500 


@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input_chat = request.form['user-input']
        print('\nUSER INPUT:\n', user_input_chat, '\n\n')
        ai_response = get_response(user_input_chat)
        speak_text(ai_response)
        return jsonify({'user_input_audio': user_input_chat, 'ai_response': ai_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
