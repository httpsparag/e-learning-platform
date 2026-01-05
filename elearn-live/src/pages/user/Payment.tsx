import { motion } from "framer-motion";
import { 
  CreditCard, Lock, ShieldCheck, CheckCircle, 
  Tag, Clock, Award, ChevronDown, X
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";

export function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock course data
  const courseData = {
    title: "Advanced React & TypeScript Mastery",
    instructor: "Sarah Chen",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&q=80",
    originalPrice: 199,
    discountedPrice: 99,
    features: [
      "32 hours on-demand video",
      "156 coding exercises",
      "Downloadable resources",
      "Lifetime access",
      "Certificate of completion"
    ]
  };

  const discount = courseData.originalPrice - courseData.discountedPrice;
  const tax = (courseData.discountedPrice * 0.18).toFixed(2); // 18% GST
  const total = (courseData.discountedPrice + parseFloat(tax)).toFixed(2);

  return (
    <>
      <FloatingNavbar />
      
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Complete Your Purchase
            </h1>
            <p className="text-gray-600">
              Secure checkout - Your payment information is protected
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8">
            
            {/* Left Column - Payment Form */}
            <div className="space-y-6">
              
              {/* Payment Method Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
              >
                <h2 className="mb-6 text-xl font-bold text-gray-900">Payment Method</h2>
                
                <div className="mb-6 space-y-3">
                  {/* Card Payment */}
                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "card" 
                      ? "border-blue-600 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <CreditCard className="ml-3 text-gray-700" size={20} />
                    <span className="ml-3 font-semibold text-gray-900">Credit / Debit Card</span>
                    <div className="flex gap-2 ml-auto">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                    </div>
                  </label>

                  {/* UPI Payment */}
                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "upi" 
                      ? "border-blue-600 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="font-semibold text-gray-900 ml-7">UPI</span>
                    <span className="ml-auto text-sm text-gray-600">Google Pay, PhonePe, Paytm</span>
                  </label>

                  {/* Net Banking */}
                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "netbanking" 
                      ? "border-blue-600 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === "netbanking"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="font-semibold text-gray-900 ml-7">Net Banking</span>
                  </label>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-6 space-y-4 border-t-2 border-gray-200"
                  >
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </motion.div>
                )}

                {/* UPI Form */}
                {paymentMethod === "upi" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-6 border-t-2 border-gray-200"
                  >
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </motion.div>
                )}

                {/* Net Banking Form */}
                {paymentMethod === "netbanking" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-6 border-t-2 border-gray-200"
                  >
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Select Your Bank
                    </label>
                    <select className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600">
                      <option>Choose your bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </motion.div>
                )}
              </motion.div>

              {/* Billing Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
              >
                <h2 className="mb-6 text-xl font-bold text-gray-900">Billing Information</h2>
                
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Country
                    </label>
                    <select className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600">
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Security Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 p-4 border-2 border-blue-200 bg-blue-50 rounded-xl"
              >
                <ShieldCheck className="flex-shrink-0 text-blue-600" size={24} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl top-24"
              >
                <h2 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h2>

                {/* Course Details */}
                <div className="flex gap-4 pb-6 mb-6 border-b-2 border-gray-200">
                  <img 
                    src={courseData.thumbnail} 
                    alt={courseData.title}
                    className="object-cover w-24 h-16 rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="mb-1 text-sm font-bold text-gray-900 line-clamp-2">
                      {courseData.title}
                    </h3>
                    <p className="text-xs text-gray-600">by {courseData.instructor}</p>
                  </div>
                </div>

                {/* Course Features */}
                <div className="pb-6 mb-6 border-b-2 border-gray-200">
                  <p className="mb-3 text-sm font-semibold text-gray-700">This course includes:</p>
                  <div className="space-y-2">
                    {courseData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle size={16} className="flex-shrink-0 text-blue-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="pb-6 mb-6 border-b-2 border-gray-200">
                  {!showPromo ? (
                    <button
                      onClick={() => setShowPromo(true)}
                      className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <Tag size={16} />
                      Have a promo code?
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                        <button className="px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Original Price</span>
                    <span className="line-through">${courseData.originalPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>Discount (50% OFF)</span>
                    <span>-${discount}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${courseData.discountedPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (GST 18%)</span>
                    <span className="font-semibold">${tax}</span>
                  </div>
                  <div className="flex justify-between pt-3 text-xl font-bold text-gray-900 border-t-2 border-gray-200">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                {/* Complete Payment Button */}
                <button 
                  onClick={() => {
                    setIsProcessing(true);
                    setTimeout(() => {
                      setIsProcessing(false);
                      navigate('/dashboard', {
                        state: {
                          message: 'Payment successful! You are now enrolled in the course.',
                        },
                      });
                    }, 2000);
                  }}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all mb-4 text-white ${
                    isProcessing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                      Processing Payment...
                    </span>
                  ) : (
                    'Complete Payment'
                  )}
                </button>

                {/* Money Back Guarantee */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Award size={16} className="text-green-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
