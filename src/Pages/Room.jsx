import React , {useState , useEffect}from "react";
import client, {COLLECTION_ID, DATABASE_ID, databases} from "../appwriteConfig";
import {ID, Query,Role,Permission} from "appwrite";
import {Trash2} from "react-feather";
import  Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

const Room = () => {

    const {user} = useAuth()

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState("");

    useEffect(() => {
        getMessages()
        const unsubscribe =  client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`, response => {
    
            if(response.events.includes("databases.*.collections.*.documents.*.create")) {
                console.log("MESSAGE WAS CREATED")
                setMessages(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")) {
                console.log("MESSAGE WAS DELETED!!")
                setMessages(prevState => messages.filter(message => message.$id !== response.payload.$id))
            }
        });
        return () => {
            unsubscribe();
        }
    }, [])

    const handleSumbit = async (e) => {
        e.preventDefault();
        
        let payload = {
            user_id: user.$id,
            username: user.name,
            body:messageBody
        }

        const permissions = [ 
            Permission.write(Role.user(user.$id))
        ]

        let response = await databases.createDocument(DATABASE_ID, COLLECTION_ID,ID.unique(), payload, permissions)
        console.log("Created!", response)

        // setMessages(prevState => [response, ...messages])

        setMessageBody('')
    }

  


    const getMessages = async () => {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID,[
            Query.orderDesc('$createdAt'),
            Query.limit(100)
        ])
        console.log("Response", response)
        setMessages(response.documents)
    }  
    const deleteMessage = async (message_id) => {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, message_id)
        // setMessages(prevState => messages.filter(message => message.$id !== message_id))
    }
    return (
        <main className="container">
             <Header/>
            <div className="room--container">
           

            <form onSubmit={handleSumbit} id= "message--form">
                <div>
                    <textarea 
                    required
                    maxLength="1000"
                    placeholder="Say something.."
                    onChange={(e) => setMessageBody(e.target.value)}
                    value={messageBody}
                   > </textarea>
                </div>
                <div className="send-btn--wrapper">
                    <input className="btn btn--secondary" type="submit" value="send" />
                </div>
            </form>

            {messages.map(message => (
                <div key = {message.$id} className="message--wrapper">

                    <div className="message--header">
                        <p>
                            {message?.username ?(
                                <span className="message--username">{message.username}</span>
                            ):(
                                <span className="message--username">Anonymous user</span>)}
                                 <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
                        </p>

                        {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                        <Trash2 
                        className="delete--btn"
                        onClick={() => {deleteMessage(message.$id)}}></Trash2>
                        )}
                    </div>
                        <div className="message--body">
                            <span>{message.body}</span>
                        </div>
                </div>
            ))}
            </div>
        </main>
    )
}

export default Room;