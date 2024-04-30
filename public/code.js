(function () {
    const socket = io();
    const app = document.querySelector('.app');

    let uname;

    app.querySelector('.join-screen #join-user').addEventListener('click', function () {
        let Username = app.querySelector('.join-screen #username').value;
        if (Username.length === 0) {
            return;
        }
        socket.emit('newuser', Username);
        uname = Username;
        app.querySelector('.join-screen').classList.remove('active');
        app.querySelector('.chat-screen').classList.add('active');
    });

    app.querySelector('.chat-screen #send-message').addEventListener('click', function () {
        let message = app.querySelector('.chat-screen #message').value;
        if (message.length === 0) {
            return;
        }
        socket.emit('chat', { Username: uname, text: message }); // Emit chat message with username
        app.querySelector('.chat-screen #message').value = ''; // Clear message input after sending
    });

    app.querySelector('.chat-screen #exit-chat').addEventListener('click', function(){
        socket.emit('exitUser', uname);
        window.location.reload(); // Reload the page to exit the chat
    });

    socket.on('update', function(update){
        renderMessage('update', update);
    });
    
    socket.on('chat', function(message){
        renderMessage('other-message', message);
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector('.chat-screen .messages');
        if (type === 'my') {
            let el = document.createElement('div');
            el.className = 'message my-message';
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                    <button class="delete-message-btn" data-message-id="${message.id}">Delete</button>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type === 'other-message') {
            let el = document.createElement('div');
            el.className = 'message other-message';
            el.innerHTML = `
                <div>
                    <div class="name">${message.Username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type === 'update') {
            let el = document.createElement('div');
            el.className = 'update';
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        // Scroll chat to end
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();

