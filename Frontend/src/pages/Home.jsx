import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import heroImg from "../assets/hero_img.jpg";
import farmer1 from "../assets/farmer1.jpg";
import farmer2 from "../assets/farmer2.jpg";
import farmer3 from "../assets/farmer3.jpg";
import dashboardImg from "../assets/dashboard.jpg";
import analysisImg from "../assets/analysis.jpg";
import databaseImg from "../assets/database.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    howItWorks: false,
    features: false,
    feedback: false,
    about: false,
    cta: false
  });
  
  // Refs for horizontal scrolling
  const feedbackContainerRef = useRef(null);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  
  // Typing effect state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const isLoggedIn = false;
  
  // Text for typing effect
  const texts = ["Precision", "AI Technology", "Data Insights", "Smart Farming"];

  useEffect(() => {
    // Load Poppins font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Animation triggers on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setIsVisible({
        hero: true,
        howItWorks: scrollPosition > windowHeight * 0.3,
        features: scrollPosition > windowHeight * 1.2,
        feedback: scrollPosition > windowHeight * 2,
        about: scrollPosition > windowHeight * 2.8,
        cta: scrollPosition > windowHeight * 3.5
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, texts]);

  // Horizontal scroll for feedback on mobile
  const scrollFeedback = (direction) => {
    if (feedbackContainerRef.current) {
      const container = feedbackContainerRef.current;
      const cardWidth = container.querySelector('.feedback-card').offsetWidth + 32; // width + gap
      const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
      
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update current index
      if (direction === 'next') {
        setCurrentFeedbackIndex(prev => Math.min(prev + 1, 2));
      } else {
        setCurrentFeedbackIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      if (isLoggedIn) {
        navigate("/");
        toast.success("Redirecting to your prediction page!");
      } else {
        navigate("/login");
        toast.info("Please login or signup to get started!");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Navbar */}
      <Navbar />

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Hero Section */}
      <section
        className="relative pt-24 pb-20 bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-45"></div>
        <div className={`container mx-auto px-4 text-center flex flex-col items-center justify-center min-h-[350px] relative z-10 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl poppins-extrabold">
            Maximize Your Harvest with <span className="text-[#097A4E]">{text}</span>
            <span className="inline-block w-0.5 h-8 bg-white ml-1 animate-blink">|</span>
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-xl text-white poppins-light">
            AgriPredict empowers farmers with accurate yield predictions based on soil analysis,
            weather patterns, and historical crop data. Make informed decisions, optimize resource
            allocation, and boost your productivity.
          </p>
          <button
            onClick={handleClick}
            disabled={loading}
            className={`bg-[#097A4E] text-white hover:bg-[#066042] font-bold py-3 px-8 rounded-lg text-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl poppins-semibold ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {"Get Started"}
            {!loading && <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>}
          </button>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#097A4E] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#097A4E] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-center text-gray-900 poppins-bold">How It Works</h2>
          <p className="max-w-2xl mx-auto mb-16 text-center text-gray-600 poppins-light">
            Our process is simple and designed to give you actionable insights quickly.
          </p>
  
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <div className={`text-center transition-all duration-700 delay-100 ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-300 transform bg-green-100 rounded-full hover:scale-110">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center text-white">
                  <span className="poppins-bold">1</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 poppins-semibold">Input Your Data</h3>
              <p className="text-gray-600 poppins-light">
                Enter your farm's data, including soil type, historical weather patterns, and previous crop yields. The more data you provide, the more accurate the prediction.
              </p>
            </div>
  
            {/* Step 2 */}
            <div className={`text-center transition-all duration-700 delay-300 ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-300 transform bg-green-100 rounded-full hover:scale-110">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center text-white">
                  <span className="poppins-bold">2</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 poppins-semibold">Get Your Prediction</h3>
              <p className="text-gray-600 poppins-light">
                Our powerful algorithm analyzes your data to generate a detailed crop yield prediction. See the potential of your harvest in just a few clicks.
              </p>
            </div>
  
            {/* Step 3 */}
            <div className={`text-center transition-all duration-700 delay-500 ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-300 transform bg-green-100 rounded-full hover:scale-110">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center text-white">
                  <span className="poppins-bold">3</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 poppins-semibold">Apply Recommendations</h3>
              <p className="text-gray-600 poppins-light">
                Receive data-driven recommendations to optimize your farming practices, from irrigation schedules to fertilizer application, ensuring you get the most out of your land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Insights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-center text-gray-900 poppins-bold">Empowering Farmers with Data-Driven Insights</h2>
          <p className="max-w-2xl mx-auto mb-16 text-center text-gray-600 poppins-light">
            AgriPredict provides a suite of tools designed to help farmers make informed decisions and optimize their crop yields.
          </p>
  
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 - Predictive Dashboard */}
            <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={dashboardImg} 
                  alt="Predictive Dashboard" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="text-5xl text-white">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 poppins-semibold">Predictive Dashboard</h3>
                <p className="text-gray-600 poppins-light">
                  Visualize future yield projections based on your specific farm conditions, including soil composition, weather forecasts, and past crop performance.
                </p>
              </div>
            </div>
  
            {/* Feature 2 - Historical Data Analysis */}
            <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 delay-100 ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={analysisImg} 
                  alt="Historical Data Analysis" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="text-5xl text-white">
                    <i className="fas fa-database"></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 poppins-semibold">Historical Data Analysis</h3>
                <p className="text-gray-600 poppins-light">
                  Analyze historical yield data to identify trends, understand the impact of different factors, and refine your farming strategies over time.
                </p>
              </div>
            </div>
  
            {/* Feature 3 - Comprehensive Crop Database */}
            <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 delay-200 ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={databaseImg} 
                  alt="Comprehensive Crop Database" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="text-5xl text-white">
                    <i className="fas fa-book"></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 poppins-semibold">Comprehensive Crop Database</h3>
                <p className="text-gray-600 poppins-light">
                  Access a vast database of crop information, including optimal growing conditions, common challenges, and best practices for maximizing yields.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-center text-gray-900 poppins-bold">What Our Farmers Say</h2>
          <p className="max-w-2xl mx-auto mb-8 text-center text-gray-600 poppins-light">
            Hear from farmers who have transformed their agricultural practices with AgriPredict
          </p>
          
          {/* Mobile navigation arrows */}
          <div className="flex justify-center mb-6 space-x-4 md:hidden">
            <button 
              onClick={() => scrollFeedback('prev')}
              disabled={currentFeedbackIndex === 0}
              className={`p-2 rounded-full ${currentFeedbackIndex === 0 ? 'bg-gray-300 text-gray-500' : 'bg-[#097A4E] text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scrollFeedback('next')}
              disabled={currentFeedbackIndex === 2}
              className={`p-2 rounded-full ${currentFeedbackIndex === 2 ? 'bg-gray-300 text-gray-500' : 'bg-[#097A4E] text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div 
            ref={feedbackContainerRef}
            className="flex gap-8 pb-6 overflow-x-auto md:grid md:grid-cols-3 md:pb-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Feedback 1 */}
            <div className={`feedback-card flex-shrink-0 w-5/6 md:w-auto bg-white rounded-lg shadow-md p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${isVisible.feedback ? 'opacity-100' : 'opacity-0'} mx-4 md:mx-0`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center mr-4 text-white font-bold poppins-bold">
                  R
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 poppins-semibold">Rajesh Kumar</h3>
                  <p className="text-sm text-gray-600 poppins-light">Wheat Farmer, Punjab</p>
                </div>
              </div>
              <p className="italic text-gray-600 poppins-light">
                "AgriPredict helped me increase my wheat yield by 25% last season. The soil analysis recommendations were spot on!"
              </p>
             
            </div>
            
            {/* Feedback 2 */}
            <div className={`feedback-card flex-shrink-0 w-5/6 md:w-auto bg-white rounded-lg shadow-md p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 delay-100 ${isVisible.feedback ? 'opacity-100' : 'opacity-0'} mx-4 md:mx-0`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center mr-4 text-white font-bold poppins-bold">
                  P
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 poppins-semibold">Priya Sharma</h3>
                  <p className="text-sm text-gray-600 poppins-light">Organic Farmer, Kerala</p>
                </div>
              </div>
              <p className="italic text-gray-600 poppins-light">
                "The weather pattern predictions saved my crops during the unexpected monsoon. This tool is a game-changer for modern farming."
              </p>
             
            </div>
            
            {/* Feedback 3 */}
             <div className={`feedback-card flex-shrink-0 w-5/6 md:w-auto bg-white rounded-lg shadow-md p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 delay-100 ${isVisible.feedback ? 'opacity-100' : 'opacity-0'} mx-4 md:mx-0`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center mr-4 text-white font-bold poppins-bold">
                  P
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 poppins-semibold">Priya Sharma</h3>
                  <p className="text-sm text-gray-600 poppins-light">Organic Farmer, Kerala</p>
                </div>
              </div>
              <p className="italic text-gray-600 poppins-light">
                "The weather pattern predictions saved my crops during the unexpected monsoon. This tool is a game-changer for modern farming."
              </p>
             
              
            </div>
          </div>
          
          {/* Mobile indicator dots */}
          <div className="flex justify-center mt-6 space-x-2 md:hidden">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${currentFeedbackIndex === index ? 'bg-[#097A4E]' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className={`flex flex-col md:flex-row items-center transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-10 md:w-1/2 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-gray-极900 mb-6 poppins-bold">About AgriPredict</h2>
              <p className="mb-6 text-gray-600 poppins-light">
                AgriPredict was founded in 2018 with a mission to revolutionize farming through data-driven insights. 
                Our team of agronomists, data scientists, and software engineers work together to create cutting-edge 
                solutions that help farmers maximize their yields while minimizing environmental impact.
              </p>
              <p className="mb-6 text-gray-600 poppins-light">
                We believe that technology should be accessible to all farmers, regardless of the size of their operation. 
                That's why we've designed our platform to be intuitive, affordable, and tailored to the specific needs of 
                modern agriculture.
              </p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#097A4E] poppins-bold">5K+</div>
                  <div className="text-gray-600 poppins-light">Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#097A4E] poppins-bold">12+</div>
                  <div className="text-gray-600 poppins-light">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#097A4E] poppins-bold">98%</div>
                  <div className="text-gray-600 poppins-light">Accuracy</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:w-1/2">
              <div className="overflow-hidden transition duration-500 transform rounded-lg shadow-lg hover:scale-105">
                <img src={farmer1} alt="Farmer in field" className="object-cover w-full h-64" />
               
              </div>
              <div className="mt-8 overflow-hidden transition duration-500 transform rounded-lg shadow-lg hover:scale-105">
                <img src={farmer2} alt="Harvest season" className="object-cover w-full h-64" />
                
              </div>
              <div className="overflow-hidden transition duration-500 transform rounded-lg shadow-lg hover:scale-105">
                <img src={farmer3} alt="Farmers discussing" className="object-cover w-full h-64" />
                
              </div>
              <div className="bg-[#097A4E] rounded-lg flex items-center justify-center text-white poppins-bold text-center p-4 transform hover:scale-105 transition duration-500">
                <div>
                  <div className="text-2xl">Join Our Community</div>
                  <div className="mt-2 text-sm poppins-light">Connect with farmers worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <Footer />

      {/* Add blink animation */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s step-start infinite;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Home;