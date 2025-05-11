# searchify - SEO Tools

- Google Keyword Tool

## Tech Stack

- Backend: Python, FastAPI, Postgres, Selenium, GoogleAPI, 2Captcha, OpenVPN
- Frontend: Next, React, Tailwind

## Start the app

- Frontend
```
cd frontend
npm install
npm run dev
```

- API
```
python3 -m venv venv
source venv/bin/activate
pip install -r api/requirements.txt
cd api
flask --app main run
```

## Environment variables
- required env variables are mentioned in the `.env.exmaple` file