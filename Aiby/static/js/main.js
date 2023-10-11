const formm = document.getElementById('user-input-form');
const userInput = document.getElementById('user-input');
const chatHistory = document.getElementById('chat-history');

const userHistory = document.getElementById('user-history')
const aiHistory = document.getElementById('ai-history')

let lastMessageTimestamp = 0;
const messageCooldown = 3000; 

formm.addEventListener('submit', function(event) {
    event.preventDefault();
    const userMessage = userInput.value;
    if (userMessage === ""){
        return;
    }
    const now = Date.now();
    if (now - lastMessageTimestamp < messageCooldown) {
        console.log('Please wait before sending another message.');
        return;
    }
    lastMessageTimestamp = now;
    sendUserMessageToServer(userMessage);
    userInput.value = '';
});

function updateChatHistoryUser(message, imagePath) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('userrr');
    messageDiv.innerHTML = `
        <div class="user-message">
        <span class="message-text">${message}</span>
            <div class="chat-img">
                <img src="${userImageUrl}" alt="User Image" class="message-image">
            </div>
        </div>
    `;
    chatHistory.appendChild(messageDiv);
}

function updateChatHistoryAI(message, imagePath) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.innerHTML = `
        <div class="ai-message">
            <div class="chat-img">
                <img src="${userImageUrl2}" alt="AI Image" class="message-image">
                </div>
            <span class="message-text">${message}</span>
        </div>
    `;
    chatHistory.appendChild(messageDiv);
}

function sendUserMessageToServer(userMessage) {
    const formData = new FormData();
    formData.append('user-input', userMessage);

    fetch('/chat', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) 
    .then(data => {
        updateChatHistoryUser(data.user_input_audio);
        updateChatHistoryAI(data.ai_response);
    });
}

// =========
const recordButton = document.getElementById('record-button');

        recordButton.addEventListener('click', () => {
            const now = Date.now();
            if (now - lastMessageTimestamp < messageCooldown) {
                console.log('Please wait before sending another message.');
                return;
            }
            lastMessageTimestamp = now;

            recordButton.classList.toggle('recording');

            // Make an AJAX request to trigger the Python function
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/chat_using_audio', true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // console.log(xhr.responseText);
                    const responseData = JSON.parse(xhr.responseText);
                    updateChatHistoryUser(responseData.user_input_audio);
                    updateChatHistoryAI(responseData.ai_response);
                }
                recordButton.classList.remove('recording');
            };
            xhr.send();
            
        });

// === Switch
const toggleSwitch = document.getElementById('toggleSwitch');
const voiceInput = document.querySelector('.voice-input');
const textInput = document.querySelector('.text-input');

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    voiceInput.style.display = 'none';
    textInput.style.display = 'block';
  } else {
    voiceInput.style.display = 'block';
    textInput.style.display = 'none';
  }
});


// function togglePopup() {
//     var popup = document.getElementById('popup');
//     popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
//   }
  