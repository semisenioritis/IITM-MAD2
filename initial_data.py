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
        datastore.create_user(email="admin@admin.com", password="admin", roles=['admin'], username="admin")

    # one store manager is active and the other is not just for testing purposes
    if not datastore.find_user(email="store@manager1.com"):
        datastore.create_user(email="store@manager1.com", password="storemanager1", roles=['storemanager'], username="storemanager1", active=True)

    if not datastore.find_user(email="store@manager2.com"):
        datastore.create_user(email="store@manager2.com", password="storemanager2", roles=['storemanager'], username="storemanager2", active=False)


    if not datastore.find_user(email="user@user1.com"):
        datastore.create_user(email="user@user1.com", password="user1", roles=['user'], username="user1")
    
    if not datastore.find_user(email="user@user2.com"):
        datastore.create_user(email="user@user2.com", password="user2", roles=['user'], username="user2")
                

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
    
    
    section1 = Section(section_name="Assorted", section_desc="The Assorted Product Section", approval_stat=True)
    section2 = Section(section_name="Fruits", section_desc="A variety of fruits imported and local both!", approval_stat=True)
    section3 = Section(section_name="Vegetable", section_desc="A Juicy selection of organic vegetables!", approval_stat=True)
    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)

    prod1 = Product(product_name="Fuji Apples", section_id=2, product_desc="Fresh Fuji Apples", 
                    in_stock=True,curr_stock=20, product_price=449, per_what="kg", product_image="prod1", mfg_date="2023-10-1", exp_date="2023-12-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod2 = Product(product_name=" 1kg Bag of Potatoes", section_id=3, product_desc="Localy sourced and well curated potatoes", 
                    in_stock=True,curr_stock=40, product_price=40, per_what="kg", product_image="prod2", mfg_date="2023-10-1", exp_date="2021-12-1", creation_date="2023-11-12T:00:00:00.000Z")
    db.session.add(prod1)
    db.session.add(prod2)


    # db.session.commit()
    try:

        db.session.commit()
    except:
        pass
