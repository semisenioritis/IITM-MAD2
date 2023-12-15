# IITM-MAD2
The github repo for my IITM MAD 2 project based on vuejs, flask, redis and celery

To run the project:

1. start 5 wsl terminals:
2.  
    A. 
    cd '/mnt/c/My Files/git/Github/iitm mad2/IITM-MAD2'
    source venv1/bin/activate
    python initial_data.py
    python initial_data_part2.py
    python main.py

    B.
    redis-server

    C.
    cd '/mnt/c/My Files/git/Github/iitm mad2/IITM-MAD2'
    source venv1/bin/activate
    celery -A main:celery_app worker --loglevel INFO --uid=redisuer

    D.
    cd '/mnt/c/My Files/git/Github/iitm mad2/IITM-MAD2'
    source venv1/bin/activate
    celery -A main:celery_app beat --loglevel INFO --uid=redisuer

    E. 
    ~/go/bin/MailHog

3. Open http://127.0.0.1:5000/ for the websit

4. Open http://127.0.0.1:8025/# for monitoring the emails 

5. Done!


