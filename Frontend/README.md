frontend/
│── public/
│   ├── index.html                # Root HTML
│   ├── favicon.ico               # App icon
│   ├── manifest.json             # PWA support
│   └── robots.txt                # SEO
│
│── src/
│   ├── assets/                   # Images, icons, logos
│   │   ├── logos/
│   │   │   └── logo-green.png
│   │   ├── icons/
│   │   │   └── crop.svg
│   │   └── illustrations/
│   │       └── farmer-dashboard.svg
│   │
│   ├── components/               # Reusable UI components
│   │   ├── common/               # Shared UI elements
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/               # Layout related
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── charts/               # Charts for data visualization
│   │       ├── YieldChart.jsx
│   │       ├── TrendChart.jsx
│   │       └── PieChart.jsx
│   │
│   ├── pages/                    # Main pages
│   │   ├── Auth/                 # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ForgotPassword. 
│   │   ├── Farmer/               # Farmer dashboard
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   └── Insights.jsx
│   │   ├── Admin/                # Admin dashboard
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── DataUpload.jsx
│   │   │   └── UserManagement.jsx
│   │   ├── Landing/              # Landing page before login
│   │   │   └── LandingPage.jsx
│   │   ├── Profile/              # User profile
│   │   │   └── ProfilePage.jsx
│   │   └── Error/                # Error pages
│   │       └── NotFound.jsx
│   │
│   ├── services/                 # API calls
│   │   ├── api.js                # Axios instance (baseURL, interceptors)
│   │   ├── authService.js        # Login, signup APIs
│   │   ├── predictionService.js  # Prediction & ML model APIs
│   │   ├── userService.js        # Profile & user APIs
│   │   └── adminService.js       # Admin related APIs
│   │
│   ├── context/                  # Global context (React Context API)
│   │   ├── AuthContext.jsx       # User authentication state
│   │   ├── ThemeContext.jsx      # Dark/Light (green + white theme)
│   │   └── PredictionContext.jsx # Store prediction results globally
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.js            # Authentication hook
│   │   ├── useTheme.js           # Theme switch hook
│   │   └── usePrediction.js      # Prediction logic hook
│   │
│   ├── utils/                    # Utility functions
│   │   ├── constants.js          # App-wide constants
│   │   ├── validators.js         # Form validation
│   │   ├── formatters.js         # Format numbers, dates, etc.
│   │   └── storage.js            # LocalStorage helpers
│   │
│   ├── styles/                   # Global styles
│   │   ├── index.css             # Tailwind entry file
│   │   ├── variables.css         # Custom theme variables (green + white)
│   │   └── animations.css        # Extra animations
│   │
│   ├── App.jsx                   # Main App component
│   ├── index.js                  # React entry point
│   ├── routes.js                 # All routes (React Router)
│   ├── tailwind.config.js        # Tailwind config
│   ├── postcss.config.js         # PostCSS config
│   └── .env                      # API keys & environment variables
│
├── package.json
└── README.md



































🌱 Complete Features Breakdown
🔐 Authentication (Common)

Signup

Farmers: Name, Email, Phone, Location, Password.

Admins: Email, Password (pre-approved in DB).

OTP/Email verification (optional, if time permits).

Login

JWT-based authentication.

Role-based access: Farmer vs Admin.

Session persistence using LocalStorage.

Forgot Password

Send reset link to email OR security question.

Profile Management

Update name, email, phone, location, password.

Upload profile picture (optional).

👨‍🌾 Farmer Features
1. Dashboard

Welcome message with farmer’s name.

Quick access cards:

“Predict Yield”

“Recommendations”

“Insights”

2. Crop Yield Prediction

Form inputs:

Crop type (dropdown: rice, wheat, maize, etc.)

Soil type (dropdown: sandy, clay, loamy, etc.)

Rainfall (numeric or fetched via API based on location).

Temperature (numeric or auto-fetched).

Fertilizer usage (optional input).

Submit → Backend → ML Model → Predicted Yield (tons/hectare).

Display result:

Predicted yield value.

Confidence level (accuracy score).

3. Recommendations

Suggested crops for better yield (based on soil & season).

Fertilizer recommendations (type & quantity).

Irrigation schedule suggestions.

Best sowing/harvesting time.

4. Insights & Analytics

Visual graphs (Recharts/Chart.js):

Yield trends (line graph).

Comparison of crops (bar chart).

Soil vs Yield correlation (scatter chart).

Historical predictions stored per farmer.

Downloadable report (PDF/CSV).

5. Notifications

Alerts for best sowing time.

Updates about weather changes (if integrated with API).

👩‍💻 Admin Features
1. Admin Dashboard

Overview cards:

Total registered farmers.

Number of predictions made.

Most popular crops.

Quick access to dataset management.

2. User Management

View all farmers (list).

Deactivate/activate farmers.

Reset farmer passwords (if needed).

3. Dataset Management

Upload new datasets (CSV/Excel).

Approve/reject dataset updates.

Track dataset usage statistics.

4. System Insights

See total prediction requests.

Monitor model performance (accuracy, RMSE).

Regional yield trends (map/heatmap).

🌍 Common Features
Landing Page (before login)

Project intro: "AI-Powered Crop Yield Prediction"

Green + White themed hero section with illustration.

Buttons: “Login” and “Signup”.

Short description of features (cards/infographics).

Navbar

Logo (green + white theme).

Links: Home, About Us, Contact Us.

Login/Signup OR Profile (if logged in).

Profile Section (after login)

User details.

Past activity (prediction history).

Logout button.

Error Handling

404 Page (Not Found).

Error messages on forms.

Accessibility & Responsiveness

Fully responsive (desktop, tablet, mobile).

Language toggle (optional, if time permits).

📊 Advanced Features (if time allows)

Integration with Weather API (OpenWeatherMap) → Auto-fill rainfall & temperature.

Live Chat Support → Farmers can ask queries.

Multi-language Support → English + regional languages.

Gamification → Badges for number of predictions made.

Report Export → Farmers can download yield predictions as PDF.

🔄 User Flows
Farmer Flow

Signup/Login → Dashboard.

Enter details in Prediction Form → Get result.

View Recommendations & Insights.

Check past history in Profile.

Admin Flow

Login as Admin → Admin Dashboard.

Manage farmers and datasets.

Track overall insights.

🎨 UI Design Guidelines (Green + White Theme)

Farmer View → Friendly, minimal, simple UI.

Admin View → Professional dashboard look.

Colors:

Primary Green: #2E7D32

White: #FFFFFF

Accent Green: #A5D6A7

Dark Gray: #333333 (text)