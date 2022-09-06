# Bitcoin API & Mailing

Get current bitcoin price straight to your inbox!

## Prerequirements

To run this project yourself you need to install Docker and Docker Compose.

### Installation tutorials listed below.
- 🔗[Docker](https://docs.docker.com/engine/install/)
- 🔗[Docker Compose](https://docs.docker.com/compose/install/)


## Step 1: Create `.env` file in root directory

Use `.env.example` as a refference. 

You can leave SMTP settings empty but you won't be able to send any emails.

```bash
HOSTNAME=localhost
DB_PATH=db
EMAILS_FN=subscribers.txt
PORT=8000
SMTP_HOST=_YOUR_SMTP_HOST
SMTP_PORT=_YOUR_SMTP_PORT_
SMTP_SECURE=_SECURE_true/false_
SMTP_USER=_SMTP_USER_EMAIL_
SMTP_PASS=_SMTP_USER_PASSWORD_
```

## Step 2: Build and Run Application

```bash
>> docker-compose up --build -d
```

Done! Now API is Up & Running.

## Step 3: Learn more about API using Swagger UI
🔗 **[http://localhost:8000/docs](http://localhost:8000/docs)**

Once you're done with it, don't forget to turn everthing off.

## Step 4: Stop & Remove Containers

List of subscribers **will not** be deleted.

```bash
>> docker-compose down
```