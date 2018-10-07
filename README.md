# platform-dev
Platform to organize Teams, Tasks, Posts (Prototype Update) and Mentors.

# 🚨DataBase connection files 
since version 1.0.1 we migrated from MongoDB to PostgreSQL;

- create a file name 'db_secret.json' at "platform-dev/app/api/"

```
/* platform-dev/app/api/db_secret.json */

{
    "host": <postgres_host>,
    "user": <postgres_username>,
    "password": <postgres_password>,
    "database": <postgres_database_name>,
    "port": 5432
}

```

# core dependencies
- meteor (requires manual installation)
  mac/linux
  ```
  curl https://install.meteor.com/ | sh
  ```
  
```
cd app
meteor install
meteor run
```
http://localhost:3000
