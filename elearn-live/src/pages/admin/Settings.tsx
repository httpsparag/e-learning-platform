import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, Globe, Bell, Shield, Users, Mail,
  CreditCard, Database, Palette, Code, Lock,
  Eye, Save, Upload, CheckCircle, AlertCircle,
  Smartphone, Server, Key, Activity, FileText,
  Zap, Video, Layout, Link2, ChevronRight, Download
} from "lucide-react";
import { useState } from "react";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: <SettingsIcon size={20} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "security", label: "Security", icon: <Shield size={20} /> },
    { id: "email", label: "Email", icon: <Mail size={20} /> },
    { id: "payments", label: "Payments", icon: <CreditCard size={20} /> },
    { id: "integrations", label: "Integrations", icon: <Zap size={20} /> },
    { id: "advanced", label: "Advanced", icon: <Code size={20} /> }
  ];

  const handleSave = () => {
    console.log("Saving settings...");
    setHasChanges(false);
  };

  return (
    <div className="p-6 sm:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Settings</h1>
            <p className="text-gray-600">Configure and manage your platform settings</p>
          </div>
          
          {hasChanges && (
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md"
            >
              <Save size={18} />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        
        {/* Left Sidebar - Navigation */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600 pl-3'
                    : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="space-y-6">
          
          {/* General Settings */}
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">General Settings</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      defaultValue="EduLearn Platform"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Platform Description
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Your online learning platform for professional development"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Support Email
                      </label>
                      <input
                        type="email"
                        defaultValue="support@edulearn.com"
                        onChange={() => setHasChanges(true)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        onChange={() => setHasChanges(true)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Default Language
                    </label>
                    <select 
                      defaultValue="en"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select 
                      defaultValue="IST"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      <option value="IST">India Standard Time (IST)</option>
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Standard Time (EST)</option>
                      <option value="PST">Pacific Standard Time (PST)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Registration Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Allow User Registration</p>
                      <p className="text-sm text-gray-600">Let new users sign up for your platform</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Email Verification Required</p>
                      <p className="text-sm text-gray-600">Users must verify email before accessing</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Admin Approval Required</p>
                      <p className="text-sm text-gray-600">Manually approve new user registrations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" onChange={() => setHasChanges(true)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Appearance & Branding</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Logo Upload
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                        <Layout className="text-gray-400" size={32} />
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors">
                        <Upload size={18} />
                        Upload Logo
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        defaultValue="#2563eb"
                        onChange={() => setHasChanges(true)}
                        className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        defaultValue="#2563eb"
                        onChange={() => setHasChanges(true)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Theme Mode
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-colors">
                        Light
                      </button>
                      <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                        Dark
                      </button>
                      <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                        Auto
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Custom CSS
                    </label>
                    <textarea
                      rows={6}
                      placeholder="/* Add your custom CSS here */"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Require 2FA for all admin users</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Force Password Reset</p>
                      <p className="text-sm text-gray-600">Users must change password every 90 days</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" onChange={() => setHasChanges(true)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Session Timeout</p>
                      <p className="text-sm text-gray-600">Auto logout after inactivity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Password Requirements</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimum Password Length
                    </label>
                    <select 
                      defaultValue="8"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      <option value="6">6 characters</option>
                      <option value="8">8 characters</option>
                      <option value="10">10 characters</option>
                      <option value="12">12 characters</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="w-4 h-4" onChange={() => setHasChanges(true)} />
                    <span className="text-sm text-gray-700">Require uppercase letters</span>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="w-4 h-4" onChange={() => setHasChanges(true)} />
                    <span className="text-sm text-gray-700">Require numbers</span>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="w-4 h-4" onChange={() => setHasChanges(true)} />
                    <span className="text-sm text-gray-700">Require special characters</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Settings */}
          {activeTab === "email" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Email Configuration</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      defaultValue="smtp.gmail.com"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        defaultValue="587"
                        onChange={() => setHasChanges(true)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Encryption
                      </label>
                      <select 
                        defaultValue="tls"
                        onChange={() => setHasChanges(true)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      >
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        SMTP Username
                      </label>
                      <input
                        type="email"
                        defaultValue="noreply@edulearn.com"
                        onChange={() => setHasChanges(true)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        onChange={() => setHasChanges(true)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors">
                    Test Email Connection
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Email Templates</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-colors cursor-pointer">
                    <div>
                      <p className="font-semibold text-gray-900">Welcome Email</p>
                      <p className="text-xs text-gray-600">Sent to new users upon registration</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-colors cursor-pointer">
                    <div>
                      <p className="font-semibold text-gray-900">Password Reset</p>
                      <p className="text-xs text-gray-600">Sent when user requests password reset</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-colors cursor-pointer">
                    <div>
                      <p className="font-semibold text-gray-900">Course Enrollment</p>
                      <p className="text-xs text-gray-600">Confirmation email for new enrollments</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Payment Settings */}
          {activeTab === "payments" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Gateway Configuration</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Currency
                    </label>
                    <select 
                      defaultValue="USD"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Enabled Payment Methods
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-blue-600" size={24} />
                          <div>
                            <p className="font-semibold text-gray-900">Stripe</p>
                            <p className="text-xs text-gray-600">Credit/Debit cards</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-purple-600" size={24} />
                          <div>
                            <p className="font-semibold text-gray-900">PayPal</p>
                            <p className="text-xs text-gray-600">PayPal payments</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-green-600" size={24} />
                          <div>
                            <p className="font-semibold text-gray-900">Razorpay</p>
                            <p className="text-xs text-gray-600">Indian payment gateway</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" onChange={() => setHasChanges(true)} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      defaultValue="18"
                      min="0"
                      max="100"
                      step="0.01"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Third-Party Integrations</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Video className="text-white" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Zoom Integration</p>
                        <p className="text-sm text-gray-600">Connect Zoom for live classes</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors">
                      Configure
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                        <Mail className="text-white" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Google Analytics</p>
                        <p className="text-sm text-gray-600">Track website analytics</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-colors">
                      Connect
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <Database className="text-white" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">AWS S3</p>
                        <p className="text-sm text-gray-600">Cloud storage for course content</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Advanced Settings */}
          {activeTab === "advanced" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Advanced Configuration</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      API Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="sk_live_••••••••••••••••••••"
                        readOnly
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 font-mono text-sm"
                      />
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors">
                        Regenerate
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      defaultValue="https://yourdomain.com/api/webhook"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cache Duration (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue="60"
                      onChange={() => setHasChanges(true)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Maintenance Mode</p>
                      <p className="text-sm text-gray-600">Temporarily disable public access</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" onChange={() => setHasChanges(true)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Debug Mode</p>
                      <p className="text-sm text-gray-600">Enable detailed error logging</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" onChange={() => setHasChanges(true)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertCircle size={20} />
                  Danger Zone
                </h3>
                
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-white hover:bg-red-50 text-red-600 rounded-lg font-semibold border-2 border-red-200 transition-colors text-left flex items-center justify-between">
                    <span>Clear All Cache</span>
                    <ChevronRight size={20} />
                  </button>

                  <button className="w-full px-4 py-3 bg-white hover:bg-red-50 text-red-600 rounded-lg font-semibold border-2 border-red-200 transition-colors text-left flex items-center justify-between">
                    <span>Reset to Default Settings</span>
                    <ChevronRight size={20} />
                  </button>

                  <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors text-left flex items-center justify-between">
                    <span>Export Platform Data</span>
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Save Button Fixed at Bottom */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <AlertCircle className="inline mr-2" size={16} />
              You have unsaved changes
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setHasChanges(false)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
