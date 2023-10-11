    const formData = new FormData();
    formData.append('user-input', userMessage);

    fetch('/chat', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) 
    .then(data => {
        updateChatHistoryUser(data.user_input);
        updateChatHistoryAI(data.ai_response);
    });
}