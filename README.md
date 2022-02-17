assignment-3

# Express Logger Application
This application is to understand how one micro service can communicate with other micro services using sync/async manner. Also how data can be stored and retrieved in MongoDB in different formats.

# Following services builds the entire application
- Data tracker service
- User authentication service
- Data pusher service
- Data validator service

# Config
The application expects the following environment variables:
```bash 
AUTH_PORT
TRACK_PORT
PUSH_PORT
VAL_PORT
REDIS_PORT
REDIS_HOST
REDIS_URL
JWT_SECRET
MONGODB_URL

```

The develompent, and test environment variables should be placed into the following files:
- Development - ``` /config/dev.env```
- Test - ``` /config/test.env```

# Installation
1. Clone or download the repository.
2. Install all the dependencies using the following command.
```bash 
npm install
```

# Usage
Run the application using the following command.
```bash 
npm run dev
```

Or you can test the application using the following command.
```bash 
npm run test
```
