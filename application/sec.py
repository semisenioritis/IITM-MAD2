# 🟠🟠  The actual database is created and initiated here. This is called later elsewhere  🟠🟠

from flask_security import SQLAlchemyUserDatastore
from .models import db, User, Role

datastore = SQLAlchemyUserDatastore(db, User, Role)