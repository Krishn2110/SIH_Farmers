// import React from "react";
// import { useNavigate } from "react-router-dom";
// import heroImg from "../assets/hero_img.jpg";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Home = () => {
//     const navigate = useNavigate();
//     const isLoggedIn = false;

//     const handleClick = () => {
//     if (isLoggedIn) {
//       navigate("/"); // redirect to prediction page
//     } else {
//       navigate("/login"); // redirect to login/signup page
//     }
//   };


//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//               <section
//                 className="pt-24 pb-20 relative bg-cover bg-center"
//                 style={{
//                   backgroundImage: `url(${heroImg})`, // replace with your actual image path
//                 }}
//               >
//                 <div className="absolute inset-0 bg-black bg-opacity-45"></div> {/* Overlay for readability */}
//                 <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center min-h-[350px] relative z-10">
//                   <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
//                     Maximize Your Harvest with Precision
//                   </h1>
//                   <p className="text-xl text-white max-w-3xl mx-auto mb-10">
//                     AgriPredict empowers farmers with accurate yield predictions based on soil analysis,
//                     weather patterns, and historical crop data. Make informed decisions, optimize resource
//                     allocation, and boost your productivity.
//                   </p>
//                   {/* ✅ Conditional Button */}
//                 <button
//                     onClick={handleClick}
//                     className="bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-8 rounded-lg text-lg flex items-center gap-2 transition duration-300"
//                     >
//                     {isLoggedIn ? "Predict Your Crop" : "Get Started"}
//                     <span className="text-xl">→</span>
//                 </button>
//                 </div>
//               </section>
      
      
//             {/* How It Works Section */}
//             <section className="py-20 bg-white">
//               <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
//                 <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
//                   Our process is simple and designed to give you actionable insights quickly.
//                 </p>
      
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//                   {/* Step 1 */}
//                   <div className="text-center">
//                     <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Input Your Data</h3>
//                     <p className="text-gray-600">
//                       Enter your farm's data, including soil type, historical weather patterns, and previous crop yields. The more data you provide, the more accurate the prediction.
//                     </p>
//                   </div>
      
//                   {/* Step 2 */}
//                   <div className="text-center">
//                     <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                       </svg>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Prediction</h3>
//                     <p className="text-gray-600">
//                       Our powerful algorithm analyzes your data to generate a detailed crop yield prediction. See the potential of your harvest in just a few clicks.
//                     </p>
//                   </div>
      
//                   {/* Step 3 */}
//                   <div className="text-center">
//                     <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 0 002 2h10a2 2 0 002-2V7a2 2 0 0-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                       </svg>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Apply Recommendations</h3>
//                     <p className="text-gray-600">
//                       Receive data-driven recommendations to optimize your farming practices, from irrigation schedules to fertilizer application, ensuring you get the most out of your land.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>
      
//             {/* Features / Insights Section */}
//             <section className="py-20 bg-gray-50">
//               <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Empowering Farmers with Data-Driven Insights</h2>
//                 <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
//                   AgriPredict provides a suite of tools designed to help farmers make informed decisions and optimize their crop yields.
//                 </p>
      
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                   {/* Feature 1 */}
//                   <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                     <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
//                       <div className="bg-white rounded-lg p-4 w-32 h-24 flex items-center justify-center">
//                         <div className="text-center">
//                           <div className="w-12 h-1 bg-green-500 mb-2"></div>
//                           <div className="w-16 h-1 bg-green-300 mb-2"></div>
//                           <div className="w-10 h-1 bg-green-400 mb-2"></div>
//                           <div className="w-14 h-1 bg-green-500"></div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold text-gray-900 mb-3">Predictive Dashboard</h3>
//                       <p className="text-gray-600">
//                         Visualize future yield projections based on your specific farm conditions, including soil composition, weather forecasts, and past crop performance.
//                       </p>
//                     </div>
//                   </div>
      
//                   {/* Feature 2 */}
//                   <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                     <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
//                       <div className="bg-white rounded-lg p-4 w-32 h-24 flex items-center justify-center">
//                         <div className="text-center">
//                           <div className="flex justify-center mb-2">
//                             <div className="w-6 h-6 rounded-full bg-gray-200 mr-1"></div>
//                             <div className="w-6 h-6 rounded-full bg-gray-200"></div>
//                           </div>
//                           <div className="w-16 h-1 bg-gray-300 mb-2"></div>
//                           <div className="w-12 h-1 bg-gray-200 mb-2"></div>
//                           <div className="w-14 h-1 bg-gray-300"></div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold text-gray-900 mb-3">Historical Data Analysis</h3>
//                       <p className="text-gray-600">
//                         Analyze historical yield data to identify trends, understand the impact of different factors, and refine your farming strategies over time.
//                       </p>
//                     </div>
//                   </div>
      
//                   {/* Feature 3 */}
//                   <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                     <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
//                       <div className="bg-white rounded-lg p-4 w-32 h-24 flex items-center justify-center">
//                         <div className="text-center">
//                           <div className="w-16 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z" />
//                             </svg>
//                           </div>
//                           <div className="w-16 h-1 bg-gray-300 mb-1"></div>
//                           <div className="w-12 h-1 bg-gray-200 mb-1"></div>
//                           <div className="w-14 h-1 bg-gray-300"></div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Crop Database</h3>
//                       <p className="text-gray-600">
//                         Access a vast database of crop information, including optimal growing conditions, common challenges, and best practices for maximizing yields.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
      
//             {/* Feedback Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What Our Farmers Say</h2>
//           <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
//             Hear from farmers who have transformed their agricultural practices with AgriPredict
//           </p>
      
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Feedback 1 */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
//                   <span className="text-green-500 font-bold">R</span>
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">Rajesh Kumar</h3>
//                   <p className="text-gray-600 text-sm">Wheat Farmer, Punjab</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">
//                 "AgriPredict helped me increase my wheat yield by 25% last season. The soil analysis recommendations were spot on!"
//               </p>
//               {/* Star Rating */}
//               <div className="flex mt-4">
//                 {[...Array(5)].map((_, i) => (
//                   <svg
//                     key={i}
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-yellow-400"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.97 0 1.37 1.24.59 1.81l-2.8 2.034a1 1 0 00-.36 1.118l1.07 3.292c.3.921-.76 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.18 0l-2.8 2.034c-.78.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.36-1.118L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//             </div>
      
//             {/* Feedback 2 */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
//                   <span className="text-green-500 font-bold">P</span>
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">Priya Sharma</h3>
//                   <p className="text-gray-600 text-sm">Organic Farmer, Kerala</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">
//                 "The weather pattern predictions saved my crops during the unexpected monsoon. This tool is a game-changer for modern farming."
//               </p>
//               {/* Star Rating */}
//               <div className="flex mt-4">
//                 {[...Array(4)].map((_, i) => (
//                   <svg
//                     key={i}
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-yellow-400"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.97 0 1.37 1.24.59 1.81l-2.8 2.034a1 1 0 00-.36 1.118l1.07 3.292c.3.921-.76 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.18 0l-2.8 2.034c-.78.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.36-1.118L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//                 {/* Empty star */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-300"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.97 0 1.37 1.24.59 1.81l-2.8 2.034a1 1 0 00-.36 1.118l1.07 3.292c.3.921-.76 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.18 0l-2.8 2.034c-.78.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.36-1.118L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.292z" />
//                   </svg>
//                 </div>
//               </div>
//                 {/* Feedback 3 */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
//                   <span className="text-green-500 font-bold">A</span>
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">Arvind Patel</h3>
//                   <p className="text-gray-600 text-sm">Cotton Farmer, Gujarat</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">
//                 "With AgriPredict, I optimized irrigation and reduced water usage by 30%. It’s saving both money and resources."
//               </p>
//               {/* Star Rating */}
//               <div className="flex mt-4">
//                 {[...Array(5)].map((_, i) => (
//                   <svg
//                     key={i}
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-yellow-400"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.97 0 1.37 1.24.59 1.81l-2.8 2.034a1 1 0 00-.36 1.118l1.07 3.292c.3.921-.76 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.18 0l-2.8 2.034c-.78.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.36-1.118L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
      
//       {/* Call-to-Action */}
//       <section className="py-20 bg-green-500 text-center text-white">
//         <h2 className="text-3xl font-bold mb-4">
//           Ready to Transform Your Farming?
//         </h2>
//         <p className="text-lg max-w-2xl mx-auto mb-8">
//           Join AgriPredict today and make smarter crop decisions with AI.
//         </p>
//         <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
//           Explore Features
//         </button>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import heroImg from "../assets/hero_img.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = false;

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => { // simulate short delay
      if (isLoggedIn) {
        navigate("/"); // redirect to prediction page
        toast.success("Redirecting to your prediction page!");
      } else {
        navigate("/login"); // redirect to login/signup page
        toast.info("Please login or signup to get started!");
      }
      setLoading(false);
    }, 500); // 0.5s delay for smoother UX
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Hero Section */}
      <section
        className="pt-24 pb-20 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-45"></div>
        <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center min-h-[350px] relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Maximize Your Harvest with Precision
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-10">
            AgriPredict empowers farmers with accurate yield predictions based on soil analysis,
            weather patterns, and historical crop data. Make informed decisions, optimize resource
            allocation, and boost your productivity.
          </p>
          <button
            onClick={handleClick}
            disabled={loading}
            className={`bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-8 rounded-lg text-lg flex items-center gap-2 transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
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
            {isLoggedIn ? "Predict Your Crop" : "Get Started"}
            {!loading && <span className="text-xl">→</span>}
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Our process is simple and designed to give you actionable insights quickly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Input Your Data</h3>
              <p className="text-gray-600">
                Enter your farm's data, including soil type, historical weather patterns, and previous crop yields. The more data you provide, the more accurate the prediction.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Prediction</h3>
              <p className="text-gray-600">
                Our powerful algorithm analyzes your data to generate a detailed crop yield prediction. See the potential of your harvest in just a few clicks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 0 002 2h10a2 2 0 002-2V7a2 2 0 0-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apply Recommendations</h3>
              <p className="text-gray-600">
                Receive data-driven recommendations to optimize your farming practices, from irrigation schedules to fertilizer application, ensuring you get the most out of your land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Insights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Empowering Farmers with Data-Driven Insights</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            AgriPredict provides a suite of tools designed to help farmers make informed decisions and optimize their crop yields.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 w-32 h-24 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-1 bg-green-500 mb-2"></div>
                    <div className="w-16 h-1 bg-green-300 mb-2"></div>
                    <div className="w-10 h-1 bg-green-400 mb-2"></div>
                    <div className="w-14 h-1 bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Predictive Dashboard</h3>
                <p className="text-gray-600">
                  Visualize future yield projections based on your specific farm conditions, including soil composition, weather forecasts, and past crop performance.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 w-32 h-24 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-1"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="w-16 h-1 bg-gray-300 mb-2"></div>
                    <div className="w-12 h-1 bg-gray-200 mb-2"></div>
                    <div className="w-14 h-1 bg-gray-300"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Historical Data Analysis</h3>
                <p className="text-gray-600">
                  Analyze historical yield data to identify trends, understand the impact of different factors, and refine your farming strategies over time.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 w-32 h-24 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="w-16 h-1 bg-gray-300 mb-1"></div>
                    <div className="w-12 h-1 bg-gray-200 mb-1"></div>
                    <div className="w-14 h-1 bg-gray-300"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Crop Database</h3>
                <p className="text-gray-600">
                  Access a vast database of crop information, including optimal growing conditions, common challenges, and best practices for maximizing yields.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What Our Farmers Say</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Hear from farmers who have transformed their agricultural practices with AgriPredict
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feedback 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-500 font-bold">R</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Rajesh Kumar</h3>
                  <p className="text-gray-600 text-sm">Wheat Farmer, Punjab</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "AgriPredict helped me increase my wheat yield by 25% last season. The soil analysis recommendations were spot on!"
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.97 0 1.37 1.24.59 1.81l-2.8 2.034a1 1 0 00-.36 1.118l1.07 3.292c.3.921-.76 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.18 0l-2.8 2.034c-.78.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.36-1.118L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            {/* Feedback 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-500 font-bold">P</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Priya Sharma</h3>
                  <p className="text-gray-600 text-sm">Organic Farmer, Kerala</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The weather pattern predictions saved my crops during the unexpected monsoon. This tool is a game-changer for modern farming."
              </p>
              <div className="flex mt-4">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.97 0 1.37 1.24.59 1.81l-2.8 2.034a1 1 0 00-.36 1.118l1.07 3.292c.3.921-.76 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.18 0l-2.8 2.034c-.78.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.36-1.118L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.97 0 1.37 1.24.59 1.81l-2.8 2.034a1 1 0 00-.36 1.118l1.07 3.292c.3.921-.76 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.18 0l-2.8 2.034c-.78.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.36-1.118L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            {/* Feedback 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-500 font-bold">A</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Arvind Patel</h3>
                  <p className="text-gray-600 text-sm">Cotton Farmer, Gujarat</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "With AgriPredict, I optimized irrigation and reduced water usage by 30%. It’s saving both money and resources."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.97 0 1.37 1.24.59 1.81l-2.8 2.034a1 1 0 00-.36 1.118l1.07 3.292c.3.921-.76 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.18 0l-2.8 2.034c-.78.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.36-1.118L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-green-500 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Farming?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Join AgriPredict today and make smarter crop decisions with AI.
        </p>
        <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
          Explore Features
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
