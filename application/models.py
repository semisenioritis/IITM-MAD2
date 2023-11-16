from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=True)
    email=db.Column(db.String,nullable=False,unique=True)
    password=db.Column(db.String,nullable=False)
    # fs_uniquifier = db.Column(db.Integer(255),nullable=False,unique=True)
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)
    roles = db.relationship('Role', secondary='roles_users',
                         backref=db.backref('users', lazy='dynamic'))
    approval_stat=db.Column(db.Boolean(),nullable=False, default=False)
    active = db.Column(db.Boolean())

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    name=db.Column(db.String,nullable=False,unique=True)
    description=db.Column(db.String,nullable=False)

class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))



class Section(db.Model):
    __tablename__ = 'section' 
    section_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    section_name=db.Column(db.String,nullable=False,unique=True)
    section_desc=db.Column(db.String,nullable=False)
    approval_stat=db.Column(db.Boolean,nullable=False, default=False)
    


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

