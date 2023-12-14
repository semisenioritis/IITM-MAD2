# 🟠🟠  Main initialization of the flask application 🟠🟠


from flask import Flask
from flask_security import SQLAlchemyUserDatastore, Security

from application.models import db, User, Role
from config import DevelopmentConfig
from application.sec import datastore
from application.resources import api
from application.worker import celery_init_app
import flask_excel as excel
from celery.schedules import crontab
from application.tasks import monthly_summary, daily_reminder
from application.instances import cache


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app) # this line tells the app that we are using the flasksql alchemy database
    api.init_app(app)

    # datastore = SQLAlchemyUserDatastore(db, User, Role)
    excel.init_excel(app)
    app.security = Security(app, datastore)
    cache.init_app(app)
    with app.app_context():
        import application.views


    return app

app = create_app()
celery_app = celery_init_app(app)

@celery_app.on_after_configure.connect
def send_email(sender, **kwargs):

    sender.add_periodic_task(
        crontab(hour=7, minute=25, day_of_month=1),
        monthly_summary.s(),
    )


@celery_app.on_after_configure.connect
def send_reminder(sender, **kwargs):

    sender.add_periodic_task(
        crontab(hour=7, minute=25),
        daily_reminder.s(),
    )



if __name__ == "__main__":
    app.run(debug=True)