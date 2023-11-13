from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=True)
    email=db.Column(db.String,nullable=False,unique=True)
    password_hash=db.Column(db.String,nullable=False)


class StoreManager(db.Model):
    __tablename__ = 'storemanager'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=True)
    email=db.Column(db.String,nullable=False,unique=True)
    password_hash=db.Column(db.String,nullable=False)
    approval_stat=db.Column(db.Boolean,nullable=False)


class Admin(db.Model):
    __tablename__ = 'admin'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=True)
    email=db.Column(db.String,nullable=False,unique=True)
    password_hash=db.Column(db.String,nullable=False)

class Section(db.Model):
    __tablename__ = 'section' 
    section_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    section_name=db.Column(db.String,nullable=False,unique=True)
    section_desc=db.Column(db.String,nullable=False)
    approval_stat=db.Column(db.Boolean,nullable=False)


class Product(db.Model):
    __tablename__ = 'product'
    product_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    product_name=db.Column(db.String,nullable=False,unique=True)

    section_id=db.Column(db.Integer,db.ForeignKey('section.section_id'),nullable=False)
    section=db.relationship('Section')

    product_desc=db.Column(db.String,nullable=False)
    curr_stock=db.Column(db.Integer,nullable=False)
    in_stock=db.Column(db.Boolean,nullable=False)
    product_price=db.Column(db.Integer,nullable=False)
    per_what=db.Column(db.String,nullable=False)
    product_image=db.Column(db.String,nullable=False)
    mfg_date=db.Column(db.String,nullable=False)
    exp_date=db.Column(db.String,nullable=False)
    creation_date=db.Column(db.String,nullable=False)

class Cart(db.Model):
    __tablename__ = 'cart'
    cart_id=db.Column(db.Integer,primary_key=True,autoincrement=True)

    product_id=db.Column(db.Integer,db.ForeignKey('product.product_id'), nullable=False)
    product=db.relationship('Product')

    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user=db.relationship('User')

    prod_count=db.Column(db.Integer,nullable=False)

class Sold(db.Model):
    __tablename__ = 'sold'
    sold_id=db.Column(db.Integer,primary_key=True,autoincrement=True)

    product_id=db.Column(db.Integer,db.ForeignKey('product.product_id'), nullable=False)
    product=db.relationship('Product')

    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user=db.relationship('User')

    prod_count=db.Column(db.Integer,nullable=False)
    timestamp=db.Column(db.String,nullable=False)

