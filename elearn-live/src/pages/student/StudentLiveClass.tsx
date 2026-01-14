import { motion } from "framer-motion";
import {
  Video,
  Mic,
  MicOff,
  Phone,
  MessageSquare,
  Settings,
  Users,
  Hand,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ClassParticipant {
  id: string;
  name: string;
  role: "instructor" | "student";
  isOnline: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
}

export const StudentLiveClass = () => {
  useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; sender: string; text: string; timestamp: string }>
  >([
    {
      id: "1",
      sender: "Sarah Chen",
      text: "Welcome everyone! Let's begin the session.",
      timestamp: "2:00 PM",
    },
    {
      id: "2",
      sender: "John Doe",
      text: "Thanks for hosting!",
      timestamp: "2:01 PM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [participants] = useState<ClassParticipant[]>([
    {
      id: "1",
      name: "Sarah Chen",
      role: "instructor",
      isOnline: true,
      hasVideo: true,
      hasAudio: true,
    },
    {
      id: "2",
      name: "You",
      role: "student",
      isOnline: true,
      hasVideo: false,
      hasAudio: false,
    },
    {
      id: "3",
      name: "John Doe",
      role: "student",
      isOnline: true,
      hasVideo: false,
      hasAudio: true,
    },
    {
      id: "4",
      name: "Jane Smith",
      role: "student",
      isOnline: true,
      hasVideo: true,
      hasAudio: true,
    },
    {
      id: "5",
      name: "Alex Wilson",
      role: "student",
      isOnline: false,
      hasVideo: false,
      hasAudio: false,
    },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: (messages.length + 1).toString(),
        sender: "You",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleEndClass = () => {
    if (window.confirm("Are you sure you want to leave this class?")) {
      navigate("/student");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Video Grid */}
        <div className="flex-1 p-4 space-y-4">
          {/* Instructor Video (Large) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-2/3 bg-gray-800 rounded-lg relative overflow-hidden group"
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Video size={64} className="text-white/50 mx-auto mb-4" />
                <p className="text-white">Sarah Chen (Instructor)</p>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Sarah Chen</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/20 rounded-full transition-all">
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Student Videos Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-800 rounded-lg relative overflow-hidden aspect-video group"
              >
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(64 + idx + 1)}
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 text-xs text-white font-semibold bg-black/50 px-2 py-1 rounded">
                  Student {idx}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 border-t border-gray-700 p-4"
        >
          <div className="flex items-center justify-center gap-4">
            {/* Microphone */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all ${
                isMuted
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isMuted ? (
                <MicOff size={24} className="text-white" />
              ) : (
                <Mic size={24} className="text-white" />
              )}
            </button>

            {/* Camera */}
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-all ${
                isVideoOn
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <Video size={24} className="text-white" />
            </button>

            {/* Hand Raise */}
            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-all">
              <Hand size={24} className="text-white" />
            </button>

            {/* Chat */}
            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-4 rounded-full transition-all ${
                showChat
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <MessageSquare size={24} className="text-white" />
            </button>

            {/* Participants */}
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className={`p-4 rounded-full transition-all ${
                showParticipants
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <Users size={24} className="text-white" />
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-all"
            >
              <Settings size={24} className="text-white" />
            </button>

            {/* Leave */}
            <button
              onClick={handleEndClass}
              className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-all ml-auto"
            >
              <Phone size={24} className="text-white" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold">Chat</h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    {msg.sender}
                  </p>
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-gray-300 bg-gray-700 rounded p-2">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage()
                }
                placeholder="Send a message..."
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Participants Sidebar */}
      {showParticipants && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold">
                  Participants ({participants.length})
                </h2>
              </div>
              <button
                onClick={() => setShowParticipants(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Participants List */}
          <div className="flex-1 overflow-y-auto">
            {/* Instructor */}
            <div className="p-4 border-b border-gray-700">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
                Instructor
              </p>
              {participants
                .filter((p) => p.role === "instructor")
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-700 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                        {p.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {p.name}
                        </p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                ))}
            </div>

            {/* Students */}
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
                Students ({participants.filter((p) => p.role === "student").length})
              </p>
              <div className="space-y-2">
                {participants
                  .filter((p) => p.role === "student")
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-700 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                          {p.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {p.name}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          p.isOnline ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
