//
import React, { useState , useEffect } from 'react'; 
import Navbar from './Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';



function Chat() { 
	const userstate = useSelector((state) => state);
	const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
	const [contacts, setContacts] = useState([]);
	const [messages, setMessages] = useState([]);
	const [selectedContact, setSelectedContact] = useState(null);
    const [message, setMessage] = useState('');
	const [receiverName, setReceiverName] = useState('');
	const [onlineUsers,setOnlineUsers] = useState([]);
	const receiver = searchParams.get('organizerId');
useEffect(() => {
	fetchContacts();
	const socket = io('http://localhost:5000',{
		query:{
			userId:userstate.userId,
		},
	});
	socket.on('connect', () => {
		console.log('Connected to Socket.IO server');
		socket.emit('user_connected', userstate.userName);
	  });
	  socket.on('disconnect', () => {
		console.log('Disconnected from Socket.IO server');
	  });

	  socket.on("getOnlineUsers",(users)=>{
		setOnlineUsers(users);
	  });

	  socket.on('newMessage',(newMessage)=>{
		// setMessages(prevMessages => [...prevMessages, newMessage]);
		fetchMessages();
	  })

	  return () => {
		socket.disconnect(); // Disconnect from Socket.IO server when component unmounts
	  };
	// Fetch contacts from your API
	
}, []);


const fetchContacts = () => {
	// Make a request to fetch contacts
	const url = receiver ? `/mycontacts?organizerId=${receiver}` : '/mycontacts';
	fetch(url)
		.then(response => response.json())
		.then(data => {
			setContacts(data);
		})
		.catch(error => console.error('Error fetching contacts:', error));
		
};

const sendMessage = () => {

        // Make a request to your API endpoint
        fetch('send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // You might need to include authorization headers if required
            },
            body: JSON.stringify({ receiver,message }),
        })
        .then(response => {
            // Handle the response, you can show a success message or handle errors
            if (response.ok) {
                console.log('Message sent successfully');
                // Optionally, clear the message input after sending
                setMessage('');
				fetchMessages();
            } else {
                console.error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    };

    const fetchMessages = async ()=>{
		try {
            const response = await fetch(`/messages?receiverId=${selectedContact}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
			// console.log(data);
            // setReceiverName(contact.receiverFullName);
			setMessages(data);
            // setSelectedContact(contact.receiverId);

        } catch (error) {
            console.error(error);
        }

	}

	const handleClick = async (contact) => {
        // Fetch messages related to the selected contact
        // You can implement the logic to fetch messages here
        // console.log('Fetching messages for receiverId:', receiverId);
        // setSelectedContact(receiverId);
		try {
            const response = await fetch(`/messages?receiverId=${contact.receiverId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
			// console.log(data);
            setReceiverName(contact.receiverFullName);
			setMessages(data);
            setSelectedContact(contact.receiverId);

        } catch (error) {
            console.error(error);
        }

    };
	// const receiverIdExists = contacts.some(contact => contact.receiverId === receiver);
    return (
        <div class="container-xxl p-0">
                     <Navbar/>
                     <main class="content">
    <div class="container p-0">

		<h1 class="h3 my-3">Messages</h1>
        {console.log(onlineUsers)}
		<div class="card mb-4">
			<div class="row g-0">
				<div class="col-12 col-lg-5 col-xl-3 col-md-4 col-sm-5 col-xs-5 border-end">

					<div class="px-4 d-none d-md-block">
						<div class="d-flex align-items-center">
							<div class="flex-grow-1">
								<input type="text" class="form-control my-3" placeholder="Search..."/>
							</div>
						</div>
					</div>

                             {contacts && contacts.map(contact => (
                                    <Link
									to={`/chat?organizerId=${contact.receiverId}`}
									className={`list-group-item list-group-item-action border-0 ${contact.receiverId === receiver ? 'active' : ''}`}
									onClick={() => handleClick(contact)}
								>
									<div class="d-flex align-items-start">
										<div class="chat-avatar rounded-circle mx-1 bg-danger">
											{contact.receiverFullName.split(' ').map(namePart => namePart[0].toUpperCase()).join('')}
										</div>
										<div class="flex-grow-1 my-1">
											{contact.receiverFullName}

											{onlineUsers && onlineUsers.includes(contact.receiverId) && ( // Check if receiverId is in onlineUsers array
        <span class="fas fa-circle chat-online small mx-2">Online</span>)}
										</div>
									</div>
								</Link>
								
                                ))}
					
					

					
				</div>
				<div class="col-12 col-lg-7 col-xl-9 col-md-8 col-sm-7 col-xs-7">
					<div class="py-2 px-4 border-bottom d-none d-lg-block">
					{receiverName && (
    <div class="d-flex align-items-center py-1">
        <div class="position-relative">
            <div class="chat-avatar rounded-circle mx-1 bg-danger">{receiverName.split(' ').map(namePart => namePart[0].toUpperCase()).join('')}</div>
        </div>
        <div class="flex-grow-1 px-2">
            <strong>{receiverName}</strong>
        </div>
        <div>
            <button class="btn px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
            </button>
        </div>
    </div>
)}
					</div>

					<div class="position-relative">
						<div class="chat-messages p-4">

							
							{/* {messages.map(message => (
								
                                            <div key={message._id} className={`chat-message-${message.sender === selectedContact ? 'right' : 'left'} pb-4`}>
                                                <div>
                                                    <div className="chat-avatar rounded-circle mx-2 bg-danger">name</div>
                                                    <div className="text-muted small text-nowrap mt-2">{message.timestamp}</div>
                                                </div>
                                                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mx-2">
                                                    <div className="font-weight-bold mb-1">{message.sender === selectedContact ? 'You' : message.sender}</div>
                                                    {message.message}
                                                </div>
                                            </div>
                            ))} */}

{messages.map(message => {
            // Find the contact with the matching receiver id
		
            const contact = contacts.find(contact => {
				if (userstate.userType === "event organizer") {
					
					return contact.receiverId === message.sender;
				} else {
					return contact.receiverId === message.receiver;
					
				}
			});
            
		
            return (
                <div key={message._id} className={`chat-message-${message.sender === selectedContact ? 'left' : 'right'} pb-4`}>
                    
                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 mx-2">
                        <div className="font-weight-bold mb-1">{message.sender !== selectedContact ? 'You' : (contact && contact.receiverFullName)}</div>
                        {message.message}
						<span className="text-muted small text-nowrap mt-2 px-3 pe-0">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span> 
                    </div>
					
                </div>
            );
        })}
							
						</div>
					</div>

					<div class="flex-grow-0 py-3 px-4 border-top">
						<div class="input-group">
							<input 
							type="text" 
							class="form-control" 
							placeholder="Type your message"
							value={message}
                            onChange={(e) => setMessage(e.target.value)}
							/>
							<button class="btn btn-primary" onClick={sendMessage}>Send</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</main>    
        </div>
        
       );
}

export default Chat;
