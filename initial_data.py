from main import app
from application.models import db, Admin, StoreManager, User, Section, Product


with app.app_context():
    db.create_all()
    admin = Admin(username="admin", email="admin@admin.com", password_hash="admin")
    db.session.add(admin)
    storemanager1 = StoreManager(username="storemanager1", email="storemanager1@shop.com", password_hash="storemanager1", approval_stat=True)
    storemanager2 = StoreManager(username="storemanager2", email="storemanager2@shop.com", password_hash="storemanager2", approval_stat=True)
    db.session.add(storemanager1)
    db.session.add(storemanager2)
    user1 = User(username="user1", email="user1@user.com", password_hash="user1")
    user2 = User(username="user2", email="user2@user.com", password_hash="user2")
    db.session.add(user1)
    db.session.add(user2)



    # ====================================================================================
    
    
    
    section1 = Section(section_name="section1", section_desc="section1", approval_stat=True)
    section2 = Section(section_name="section2", section_desc="section2", approval_stat=True)
    db.session.add(section1)
    db.session.add(section2)

    prod1 = Product(product_name="prod1", section_id=1, product_desc="prod1", in_stock=True, product_price=100, per_what="kg", product_image="prod1", mfg_date="1/1/2021", exp_date="1/1/2022", creation_date="12/11/2023")
    prod2 = Product(product_name="prod2", section_id=2, product_desc="prod2", in_stock=True, product_price=100, per_what="ltr", product_image="prod2", mfg_date="1/1/2021", exp_date="1/1/2022", creation_date="12/11/2023")
    db.session.add(prod1)
    db.session.add(prod2)

    try:
        db.session.commit()
    except:
        pass
