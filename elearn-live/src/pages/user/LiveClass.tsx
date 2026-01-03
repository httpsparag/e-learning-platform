import { motion } from "framer-motion";
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, 
  Maximize, Minimize, Volume2, VolumeX, Send,
  Settings, MoreVertical, User
} from "lucide-react";
import { useState } from "react";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";

export function LiveClass() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [message, setMessage] = useState("");

  const chatMessages = [
    { 
      id: 1, 
      user: "Sarah Chen", 
      message: "Welcome everyone! Today we'll cover React Performance Optimization.", 
      time: "3:00 PM", 
      isInstructor: true 
    },
    { 
      id: 2, 
      user: "Alex Kumar", 
      message: "Hello! Excited for today's session.", 
      time: "3:01 PM" 
    },
    { 
      id: 3, 
      user: "Maria Garcia", 
      message: "Can we cover useMemo in detail?", 
      time: "3:02 PM" 
    },
    { 
      id: 4, 
      user: "Sarah Chen", 
      message: "Absolutely! We'll dive deep into useMemo and useCallback today.", 
      time: "3:03 PM", 
      isInstructor: true 
    },
    { 
      id: 5, 
      user: "John Smith", 
      message: "Great! Looking forward to it.", 
      time: "3:04 PM" 
    },
  ];

  return (
    <>
      <FloatingNavbar />
      
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="h-[calc(100vh-5rem)] max-w-[2000px] mx-auto p-4 flex flex-col">
          
          {/* Main Content Grid */}
          <div className="flex-1 grid lg:grid-cols-[1fr_400px] gap-4 min-h-0">
            
            {/* Left: Video Section */}
            <div className="flex flex-col gap-4 min-h-0">
              
              {/* Video Container */}
              <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden relative group shadow-lg">
                {/* Live Indicator */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-lg shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white text-sm font-bold">LIVE</span>
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setIsSoundOn(!isSoundOn)}
                    className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>
                  <button className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-colors">
                    <Settings size={20} />
                  </button>
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </button>
                </div>

                {/* Main Video Feed */}
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80"
                    alt="Instructor"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Instructor Info - Bottom */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      SC
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Sarah Chen</p>
                    <p className="text-xs text-gray-600">Instructor</p>
                  </div>
                </div>

                {/* Class Title - Bottom Center */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-white text-sm font-semibold">Advanced React Patterns - Session 12</p>
                </div>
              </div>

              {/* Control Bar */}
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  
                  {/* Left: Media Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        isMuted 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>

                    <button
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        isVideoOff 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={isVideoOff ? "Start Video" : "Stop Video"}
                    >
                      {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                    </button>
                  </div>

                  {/* Center: Class Info */}
                  <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span className="font-semibold">45 students</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300" />
                    <span className="font-semibold">Duration: 1h 15m</span>
                  </div>

                  {/* Right: Leave */}
                  <button className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all flex items-center gap-2 shadow-md">
                    <PhoneOff size={18} />
                    <span>Leave Class</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Live Chat */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
              
              {/* Chat Header */}
              <div className="bg-gray-50 border-b-2 border-gray-200 px-5 py-4">
                <h3 className="font-bold text-gray-900 text-lg">Live Chat</h3>
                <p className="text-sm text-gray-600">45 participants</p>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        msg.isInstructor ? 'bg-blue-600' : 'bg-gray-400'
                      }`}>
                        {msg.user.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold text-sm ${
                          msg.isInstructor ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {msg.user}
                        </span>
                        {msg.isInstructor && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                            Instructor
                          </span>
                        )}
                        <span className="text-xs text-gray-500 ml-auto">{msg.time}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed break-words">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && message.trim()) {
                        // Handle send message
                        setMessage("");
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900 placeholder:text-gray-400"
                  />
                  <button 
                    onClick={() => {
                      if (message.trim()) {
                        // Handle send message
                        setMessage("");
                      }
                    }}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center shadow-md"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
