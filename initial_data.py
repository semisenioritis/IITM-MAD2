# 🟠🟠  Polulate the basic data within the database for testing and setting up stuff like roles, admin etc.  🟠🟠



from main import app
from application.sec import datastore
from application.models import db, User, Section, Product, Role
from flask_security import hash_password
from werkzeug.security import generate_password_hash


with app.app_context():
    db.create_all()




    datastore.find_or_create_role(name='admin', description='Administrator')
    datastore.find_or_create_role(name='storemanager', description='Store Manager')
    datastore.find_or_create_role(name='user', description='User')
    db.session.commit()

    # if not datastore.find_user(email="admin@admin.com"):
    #     datastore.create_user(email="admin@admin.com", password=generate_password_hash("admin"), roles=['admin'], username="admin",approval_stat=True)

    # if not datastore.find_user(email="store@manager1.com"):
    #     datastore.create_user(email="store@manager1.com", password=generate_password_hash("storemanager1"), roles=['storemanager'], username="storemanager1", approval_stat=True)

    # if not datastore.find_user(email="user@user1.com"):
    #     datastore.create_user(email="user@user.com", password=generate_password_hash("user1"), roles=['user'], username="user1", approval_stat=False)
    

    if not datastore.find_user(email="admin@admin.com"):
        datastore.create_user(email="admin@admin.com", password="admin", roles=['admin'], username="admin",approval_stat=True)

    if not datastore.find_user(email="store@manager1.com"):
        datastore.create_user(email="store@manager1.com", password="storemanager1", roles=['storemanager'], username="storemanager1", approval_stat=True, active=False)

    if not datastore.find_user(email="user@user1.com"):
        datastore.create_user(email="user@user1.com", password="user1", roles=['user'], username="user1", approval_stat=False)
    
    if not datastore.find_user(email="user@user2.com"):
        datastore.create_user(email="user@user2.com", password="user2", roles=['user'], username="user2", approval_stat=False)
                

                                            # admin = Admin(username="admin", email="admin@admin.com", password_hash="admin")
                                            # db.session.add(admin)
                                            # storemanager1 = StoreManager(username="storemanager1", email="storemanager1@shop.com", password_hash="storemanager1", approval_stat=True)
                                            # storemanager2 = StoreManager(username="storemanager2", email="storemanager2@shop.com", password_hash="storemanager2", approval_stat=True)
                                            # db.session.add(storemanager1)
                                            # db.session.add(storemanager2)
                                            # user1 = User(username="user1", email="user1@user.com", password_hash="user1")
                                            # user2 = User(username="user2", email="user2@user.com", password_hash="user2")
                                            # db.session.add(user1)
                                            # db.session.add(user2)



    # ====================================================================================
    
    
    section1 = Section(section_name="Default", section_desc="The Default Section", approval_stat=True)
    section2 = Section(section_name="section1", section_desc="section1", approval_stat=True)
    section3 = Section(section_name="section2", section_desc="section2", approval_stat=True)
    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)

    prod1 = Product(product_name="prod1", section_id=1, product_desc="prod1", in_stock=True,curr_stock=20, product_price=100, per_what="kg", product_image="prod1", mfg_date="1/1/2021", exp_date="1/1/2022", creation_date="12/11/2023")
    prod2 = Product(product_name="prod2", section_id=2, product_desc="prod2", in_stock=True,curr_stock=40, product_price=100, per_what="ltr", product_image="prod2", mfg_date="1/1/2021", exp_date="1/1/2022", creation_date="12/11/2023")
    db.session.add(prod1)
    db.session.add(prod2)


    # db.session.commit()
    try:

        db.session.commit()
    except:
        pass
