
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Plus } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  senderName?: string;
  senderAvatar?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there! Welcome to our chat. How can I help you today?",
      sender: "other",
      senderName: "KimMiso",
      senderAvatar: "/lovable-uploads/539de762-71b5-4183-9e88-1071a8c6ea5c.png",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userName = localStorage.getItem("userName") || "Guest";

  useEffect(() => {
    // Check if user is authenticated
    const userAuth = localStorage.getItem("isUserAuthenticated");
    setIsAuthenticated(userAuth === "true");
    
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      senderName: userName,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I'll get back to you soon.",
        "That's interesting! Would you like to know more about my content?",
        "I appreciate your message! I read all my fan messages.",
        "Thank you for connecting! I try to respond to everyone when I can.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "other",
        timestamp: new Date(),
        senderName: "KimMiso",
        senderAvatar: "/lovable-uploads/539de762-71b5-4183-9e88-1071a8c6ea5c.png",
      };

      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p className="mb-6 text-gray-400">
            Please log in to access the chat feature.
          </p>
          <div className="space-x-4">
            <Button onClick={() => window.location.href = "/login"}>
              Login
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/signup"}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Chat with KimMiso</h1>
        
        {/* Messages container */}
        <div className="flex-1 flex flex-col space-y-4 overflow-y-auto p-4 bg-gray-900 rounded-lg mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === "other" && message.senderAvatar && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      <AvatarFallback>KM</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="text-xs opacity-70">
                    {message.senderName || "You"}
                  </span>
                </div>
                <p className="break-words">{message.content}</p>
                <div className="text-xs opacity-50 text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <div className="flex space-x-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="shrink-0"
            onClick={() => toast({
              title: "Feature coming soon",
              description: "Attachments will be available in a future update."
            })}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            type="button"
            size="icon"
            className="shrink-0"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
