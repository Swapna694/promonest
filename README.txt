Building the PromoNest campaign tracker allowed me to strengthen my full-stack web development skills by integrating a Flask backend with JSON-based data storage and a dynamic JavaScript frontend. I learned how to implement real-time CRUD operations, create an intuitive user interface, and ensure smooth user interactions, all while maintaining clean and maintainable code.



PROMONEST – Campaign Tracker

PromoNest is a web application designed to help businesses and marketers
track, manage, and grow their campaigns efficiently. It integrates a Flask
backend with JSON-based storage and a dynamic frontend built with HTML, CSS,
and JavaScript.

Features

1. Add, edit, and delete campaigns.
2.Track campaign start date, manager, budget, description, and status.
3. Real-time updates reflected in the campaign table.
4. Smooth scrolling and responsive, user-friendly interface.
5. Organized dashboard for easy campaign management.

Tech Stack

1.Backend: Python, Flask
2.Frontend: HTML, CSS, JavaScript
3.Data Storage: JSON (campaigns.json)
4.Server: Local Flask development server

Project Structure

promonest/
│
├─ app.py                  # Flask application
├─ campaigns.json          # JSON database for campaigns
├─ requirements.txt        # Python dependencies
├─ templates/
│   └─ index.html          # HTML frontend
└─ static/
    ├─ style.css           # CSS styling
    └─ script.js           # JavaScript frontend logic

Setup Instructions
1. Clone the repository:
   git clone https://github.com/Swapna694/promonest.git
   cd promonest

2. Create and activate a Python virtual environment:
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate

3. Install dependencies:
   pip install -r requirements.txt

4. Run the Flask app:
   python app.py

   Open your browser and go to: http://127.0.0.1:5000/

Usage

1.Click "+ Add New Campaign" to create a campaign.
2.Edit or delete existing campaigns using the buttons in the table.
3.View all campaigns in the organized table with their status, budget, and other details.

