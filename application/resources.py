# 🟠🟠  Most probably will contain the apis and fetch calls 🟠🟠
# 🟠🟠  These need to be made to allow the frontend to modify the backend  🟠🟠
# 🟠🟠  A deff question i have is that how do i ensure that thse api calls are restricted to only autorized users  🟠🟠



from flask import jsonify
from flask_restful import Resource,  Api, reqparse, marshal_with, fields, abort     
from .models import Section, Product, db, User, Role, RolesUsers, Cart, Sold
from .sec import datastore
import time
from fuzzywuzzy import fuzz
from sqlalchemy import or_, func
import json
import re

api = Api(prefix='/api')



section_fields = {
    "section_id": fields.Integer,
    "section_name": fields.String,
    "section_desc": fields.String,
    "approval_stat": fields.Boolean,
    "message": fields.String
}

cart_fields = {
    "cart_id": fields.Integer,
    "product_id": fields.Integer,
    "user_id": fields.Integer,
    "prod_count": fields.Integer,
    "message": fields.String
}

product_fields = {
    "product_id": fields.Integer,
    "product_name": fields.String,
    "section_id": fields.Integer,
    "product_desc": fields.String,
    "curr_stock": fields.Integer,
    "in_stock": fields.Boolean,
    "product_price": fields.Integer,
    "per_what": fields.String,
    "product_image": fields.String,
    "mfg_date": fields.String,
    "exp_date": fields.String,
    "creation_date": fields.String,
    "message": fields.String
}

only_message_fields = {
    "message": fields.String
}
class NewSectionSM(Resource):

    @marshal_with(section_fields)
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('section_name', type=str, help='Section Name is req and should be a string', required=True)
            parser.add_argument('section_desc', type=str, help='Section Desc is req and should be a string', required=True)        
            args = parser.parse_args()
            new_sec=Section(**args)
            db.session.add(new_sec)
            db.session.commit()
            retrieved_sec = Section.query.filter_by(section_name=new_sec.section_name).first()

            # if not retrieved_sec:
            if (not retrieved_sec):
                # If the section is not found, raise an exception
                raise Exception("Error retrieving the created section")

            return retrieved_sec

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}



api.add_resource(NewSectionSM, '/newsection_sm')


class NewSectionA(Resource):
   
    @marshal_with(section_fields)
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('section_name', type=str, help='Section Name is req and should be a string', required=True)
            parser.add_argument('section_desc', type=str, help='Section Desc is req and should be a string', required=True)        
            args = parser.parse_args()
            args['approval_stat'] = True
            new_sec=Section(**args)
            db.session.add(new_sec)
            db.session.commit()
            retrieved_sec = Section.query.filter_by(section_name=new_sec.section_name).first()

            # if not retrieved_sec:
            if (not retrieved_sec) :    
                # If the section is not found, raise an exception
                raise Exception("Error retrieving the created section")

            return retrieved_sec

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}
    


api.add_resource(NewSectionA, '/newsection_a')








class NewProd(Resource):

    @marshal_with(product_fields)

    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('product_name', type=str, help='Product Name is req and should be a string', required=True)
            parser.add_argument('section_id', type=int, help='Section Id is req and should be a int', required=True)
            parser.add_argument('product_desc', type=str, help='Product Desc is req and should be a string', required=True)
            parser.add_argument('curr_stock', type=int, help='Current Stock is req and should be a string', required=True)
            parser.add_argument('in_stock', type=bool, help='In stock is req and should be a string')
            parser.add_argument('product_price', type=int, help='Product Price is req and should be a string', required=True)
            parser.add_argument('per_what', type=str, help='Per what is req and should be a string', required=True)
            parser.add_argument('product_image', type=str, help='Product Image is req and should be a string', required=True)
            parser.add_argument('mfg_date', type=str, help='Mfg Date is req and should be a string', required=True)
            parser.add_argument('exp_date', type=str, help='Expiry Date is req and should be a string', required=True)
            parser.add_argument('creation_date', type=str, help='Creation Date is req and should be a string', required=True)

            args = parser.parse_args()
            new_prod=Product(**args)


            check_section = Section.query.get(args['section_id'])
            section_active = getattr(check_section, 'approval_stat')
            if (not section_active):
                return {"message": f"Section not activated"}

            db.session.add(new_prod)
            db.session.commit()


            retrieved_prod = Product.query.filter_by(product_name=new_prod.product_name).first()

            if (not retrieved_prod) :
            # if not retrieved_prod:
                # If the section is not found, raise an exception
                raise Exception("Error retrieving the created product")

            return retrieved_prod

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}
            


api.add_resource(NewProd, '/newproduct')


class ProductResource(Resource):
    @marshal_with(product_fields)
    def get(self, product_id):
        try:
            # Find the product by ID
            product = Product.query.get(product_id)

            if (not product):
            # if not product:
                # If the product is not found, return a 404 response
                return {"message": f"Product not found"}


            return product

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}
            
            

api.add_resource(ProductResource, '/product/<int:product_id>')

class SectionResource(Resource):
    @marshal_with(section_fields)
    def get(self, section_id):
        try:
            # Find the product by ID
            product = Section.query.get(section_id)

            if (not product):
            # if not product:
                # If the product is not found, return a 404 response
                return {"message": f"Section not found"}

            section_active = getattr(product, 'approval_stat')
            if (not section_active):
                return {"message": f"Section not activated"}
            return product

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(SectionResource, '/section/<int:section_id>')


class UpdateProduct(Resource):

    @marshal_with(product_fields)
    def put(self, product_id):
        try:
            # Find the existing product by ID
            existing_product = Product.query.get(product_id)



            if (not existing_product):
            # if not existing_product:
                # If the product is not found, return a 404 response
                return {"message": f"Product not found"}


            current_section_id = getattr(existing_product, 'section_id')
            check_section = Section.query.get(current_section_id)
            section_active = getattr(check_section, 'approval_stat')
            if (not section_active):
                return {"message": f"Section not activated"}


            # Parse and update the attributes
            parser = reqparse.RequestParser()
            parser.add_argument('section_id', type=int)
            parser.add_argument('product_desc', type=str)
            parser.add_argument('curr_stock', type=int)
            parser.add_argument('in_stock', type=bool)
            parser.add_argument('product_price', type=int)
            parser.add_argument('per_what', type=str)
            parser.add_argument('product_image', type=str)
            parser.add_argument('mfg_date', type=str)
            parser.add_argument('exp_date', type=str)
            parser.add_argument('creation_date', type=str)

            args = parser.parse_args()


            if args['curr_stock'] is not None:
                if args['curr_stock'] <= 0:
                    args['in_stock'] = False
                    args['curr_stock'] = 0

            # Update the existing product attributes
            for key, value in args.items():
                if value is not None:
                    setattr(existing_product, key, value)



            # Commit the changes to the database
            db.session.commit()

            # Retrieve the updated product
            updated_product = Product.query.get(product_id)

            if (not updated_product):
            # if not existing_product:
                # If the product is not found, return a 404 response
                return {"message": f"Product unable to create"}            




            return updated_product

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(UpdateProduct, '/product_update/<int:product_id>')


class UpdateSectionA(Resource):

    @marshal_with(section_fields)
    def put(self, section_id):
        try:
            # Find the existing product by ID
            existing_section = Section.query.get(section_id)

            if (not existing_section):
            # if not existing_section:
                # If the product is not found, return a 404 response
                return {"message": f"Section not found"}



            section_active = getattr(existing_section, 'approval_stat')
            if (not section_active):
                return {"message": f"Section not activated"}
            

            # Parse and update the attributes
            parser = reqparse.RequestParser()

            parser.add_argument('section_name', type=str)
            parser.add_argument('section_desc', type=str)        
                        

            args = parser.parse_args()

            # Update the existing product attributes
            for key, value in args.items():
                if value is not None:
                    setattr(existing_section, key, value)

            # Commit the changes to the database
            db.session.commit()

            # Retrieve the updated product
            updated_section = Section.query.get(section_id)

            if (not updated_section):
                # If the product is not found, return a 404 response
                return {"message": f"Unable to create Section"}            

            return updated_section

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(UpdateSectionA, '/section_update_a/<int:section_id>')


class ValidateCreateSectionA(Resource): 
    
        @marshal_with(section_fields)
        def put(self, section_id):
            try:
                # Find the existing product by ID
                existing_section = Section.query.get(section_id)
    

                if (not existing_section):
                # if not existing_section:
                    # If the product is not found, return a 404 response
                    return {"message": f"Section not found"}
    
                # Parse and update the attributes
                parser = reqparse.RequestParser()
    
    
                args = parser.parse_args()
                args['approval_stat'] = True
    
                # Update the existing product attributes
                for key, value in args.items():
                    if value is not None:
                        setattr(existing_section, key, value)
    
                # Commit the changes to the database
                db.session.commit()
    
                # Retrieve the updated product
                updated_section = Section.query.get(section_id)
    

                if (not updated_section):
                    # If the product is not found, return a 404 response
                    return {"message": f"Unable to update Section"}
                
                return updated_section
    
            except Exception as e:
                # Handle the exception and return a custom JSON error response
                return {"message": f"Some error occured"}
api.add_resource(ValidateCreateSectionA, '/validate_section_update_a/<int:section_id>')

class UpdateSectionSM(Resource):

    @marshal_with(section_fields)
    def put(self, section_id):
        try:
            # Find the existing product by ID
            existing_section = Section.query.get(section_id)

            if (not existing_section):
            # if not existing_section:
                # If the product is not found, return a 404 response
                return {"message": f"Section not found"}


            section_active = getattr(existing_section, 'approval_stat')
            if (not section_active):
                return {"message": f"Section not activated"}
            

            # Parse and update the attributes
            parser = reqparse.RequestParser()

            parser.add_argument('section_name', type=str)
            parser.add_argument('section_desc', type=str)        

            args = parser.parse_args()
            args['approval_stat'] = False

            # Update the existing product attributes
            for key, value in args.items():
                if value is not None:
                    setattr(existing_section, key, value)

            # Commit the changes to the database
            db.session.commit()

            # Retrieve the updated product
            updated_section = Section.query.get(section_id)

            if (not updated_section):
                # If the product is not found, return a 404 response
                return {"message": f"Unable to update Section"}

            return updated_section

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(UpdateSectionSM, '/section_update_sm/<int:section_id>')


class DeleteProduct(Resource):
    # @marshal_with(product_fields)
    @marshal_with(only_message_fields)    
    # @marshal_with(cart_fields)
    def delete(self, product_id):
        try:
            # Find the existing product by ID
            existing_product = Product.query.get(product_id)

            if (not existing_product):
            # if not existing_product:
                # If the product is not found, return a 404 response
                return {"message": f"Product not found"}


            carts_of_this_prod = Cart.query.filter_by(product_id=product_id).all()

            if (carts_of_this_prod):
                for row in carts_of_this_prod:
                    db.session.delete(row)

            # Delete the product from the database
            db.session.delete(existing_product)
            db.session.commit()

            # return carts_of_this_prod
            return {"message": f"Product with ID {product_id} deleted successfully"}

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(DeleteProduct, '/deleteprod/<int:product_id>')


class DeleteSection(Resource):
    @marshal_with(only_message_fields)    
    # @marshal_with(section_fields)
    def delete(self, section_id):
        try:
            # Find the existing product by ID
            existing_section = Section.query.get(section_id)
                
            if (not existing_section):
            # if not existing_section:
                # If the product is not found, return a 404 response
                return {"message": f"Section not found"}

            prods_of_this_section = Product.query.filter_by(section_id=section_id).all()

            if (not prods_of_this_section):
            # if not existing_section:
                # If the product is not found, return a 404 response
                pass
            else:
                col_to_change='section_id'
                for row in prods_of_this_section:
                    setattr(row, col_to_change, 1)

            

            # Delete the product from the database
            db.session.delete(existing_section)
            db.session.commit()

            return {"message": f"Section with ID {section_id} deleted successfully"}

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(DeleteSection, '/deletesec/<int:section_id>')



class ValidateUpdateSectionA(Resource):

    @marshal_with(section_fields)
    def put(self, section_id):
        try:
            # Find the existing product by ID
            existing_section = Section.query.get(section_id)

            if (not existing_section):
            # if not existing_section:
                # If the product is not found, return a 404 response
                return {"message": f"Section not found"}

            # Parse and update the attributes
            parser = reqparse.RequestParser()


            args = parser.parse_args()
            args['approval_stat'] = True

            # Update the existing product attributes
            for key, value in args.items():
                if value is not None:
                    setattr(existing_section, key, value)

            # Commit the changes to the database
            db.session.commit()

            # Retrieve the updated product
            updated_section = Section.query.get(section_id)

            if (not updated_section):
            # if not existing_section:
                # If the product is not found, return a 404 response
                return {"message": f"Updated Section not found"}

            return updated_section

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(ValidateUpdateSectionA, '/validate_section_update_a/<int:section_id>')





class NewCartResource(Resource):
    @marshal_with(only_message_fields)    
    # @marshal_with(cart_fields)
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('product_id', type=int, help='Product Id is req and should be a int', required=True)
            parser.add_argument('user_id', type=int, help='User Id is req and should be a int', required=True)        
            
            args = parser.parse_args()

            # Access the relationships to check if the corresponding records exist
            product = Product.query.get(args['product_id'])
            user = User.query.get(args['user_id'])

            if (not product) :
            # if not product:
                return {"message": f"Product with ID {args['product_id']} does not exist"}


            if (not user):
            # if not user:
                return {"message": f"User with ID {args['user_id']} does not exist"}

            does_cart_exist = Cart.query.filter_by(product_id=args['product_id'], user_id=args['user_id']).first()
            
            if (does_cart_exist):            
            # if does_cart_exist:
                return {"message": f"Product with ID {args['product_id']} already exists in the cart"}

            new_sec=Cart(**args)
            db.session.add(new_sec)
            db.session.commit()
            return {"message": f"Added to Cart successfully"}

        except Exception as e:
            # Handle the exception and return a custom JSON error response   
            return {"message": f"Some error occured"}


api.add_resource(NewCartResource, '/addtocart')

class CartAddResource(Resource):
    @marshal_with(cart_fields)
    def put(self,cart_id):
        try:
            # Find the existing product by ID
            existing_cart = Cart.query.get(cart_id)

            if (not existing_cart):
            # if not existing_cart:
                # If the product is not found, return a 404 response
                return {"message": f"Cart not found"}

            # Find the specific column to increment (e.g., 'curr_stock')
            column_to_increment = 'prod_count'
            
            print(cart_id)
            respective_prod = getattr(existing_cart, 'product_id')

            this_prod = Product.query.get(respective_prod)

            if (not this_prod):
            # if not existing_cart:
                # If the product is not found, return a 404 response
                return {"message": f"Product not found"}

            curr_stock= getattr(this_prod, 'curr_stock')

            # Increment the specific column by one
            current_value = getattr(existing_cart, column_to_increment)

            if current_value >= curr_stock:

                setattr(existing_cart, column_to_increment, curr_stock)
                db.session.commit()
                return {"message": f"Cannot add more to cart as stock is not available. Amount in cart is now at max possible stock"}



            setattr(existing_cart, column_to_increment, current_value + 1)

            # Commit the changes to the database
            db.session.commit()
            new_existing_cart = Cart.query.get(cart_id)

            if (not new_existing_cart):
            # if not existing_cart:
                # If the product is not found, return a 404 response
                return {"message": f"Cart not found or unable to create"}

            return  new_existing_cart 
            # return {"message": f"Added to Cart successfully"}
            # 🟡🟡🟡🟡 i cn actually return teh cart here. above i couldnt because it was teh first time it was being creaetd


        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}


api.add_resource(CartAddResource, '/addonecart/<int:cart_id>')

class CartRemResource(Resource):
    @marshal_with(cart_fields)
    def put(self,cart_id):
        try:
            # Find the existing product by ID
            existing_cart = Cart.query.get(cart_id)


            if (not existing_cart):
            # if not existing_cart:
                # If the product is not found, return a 404 response
                return {"message": f"Cart not found"}

            # Find the specific column to increment (e.g., 'curr_stock')
            column_to_increment = 'prod_count'

            respective_prod = getattr(existing_cart, 'product_id')

            this_prod = Product.query.get(respective_prod)

            if (not this_prod):
            # if not existing_cart:
                # If the product is not found, return a 404 response
                return {"message": f"Product not found"}

            curr_stock= getattr(this_prod, 'curr_stock')

            # Increment the specific column by one
            current_value = getattr(existing_cart, column_to_increment)

            if current_value > curr_stock:

                setattr(existing_cart, column_to_increment, curr_stock)
                db.session.commit()
                return {"message": f"This ammount of stock is not available. Amount in cart is now at max possible stock"}

            if current_value == curr_stock:

                setattr(existing_cart, column_to_increment, curr_stock -1)
                db.session.commit()

            if current_value == 1:
                return {"message": f"Cannot remove more from cart as amount in cart is 1"}

            setattr(existing_cart, column_to_increment, current_value - 1)

            # Commit the changes to the database
            db.session.commit()
            new_existing_cart = Cart.query.get(cart_id)

            if (not new_existing_cart):
            # if not existing_cart:
                # If the product is not found, return a 404 response
                return {"message": f"Cart not found or unable to create"}

            return  new_existing_cart 



        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}


api.add_resource(CartRemResource, '/remonecart/<int:cart_id>')


class DeleteCart(Resource):
    # @marshal_with(cart_fields)
    @marshal_with(only_message_fields)    
    def delete(self, cart_id):
        try:
            # Find the existing product by ID
            existing_cart = Cart.query.get(cart_id)

            if (not existing_cart):
            # if not existing_cart:
                # If the product is not found, return a 404 response
                return {"message": f"Cart not found or doesnt exist."}

            # Delete the product from the database
            db.session.delete(existing_cart)
            db.session.commit()

            return {"message": f"Cart with ID {cart_id} deleted successfully"}

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(DeleteCart, '/deletecart/<int:cart_id>')


class CartVerificationResource(Resource):
    # @marshal_with(cart_fields)
    @marshal_with(only_message_fields)    
    def post(self, user_id):
        try:
            # Find the product by ID
            cart = Cart.query.filter_by(user_id=user_id).all()


            if (not cart):
            # if not cart:
                # If the product is not found, return a 404 response
                return {"message": f"Cart not found or user has no cart items"}

            for row in cart:
                # ======================================================
                prod_id = getattr(row, 'product_id')
                prod = Product.query.get(prod_id)

                if (not prod):                
                # if not prod:
                    # If the product is not found, return a 404 response
                    db.session.delete(row)
                    db.session.commit()
                    break                    
                    # abort(404, message="Product not found")
                else:
                    if getattr(prod, 'in_stock') == False:
                        db.session.delete(row)
                        db.session.commit()
                        break

                    if getattr(prod, 'curr_stock') == 0:
                        setattr(prod, 'in_stock', False)
                        setattr(row, 'prod_count', 0)
                        db.session.delete(row)
                        db.session.commit()
                        break

                    if getattr(row, 'prod_count') > getattr(prod, 'curr_stock'):
                        setattr(row, 'prod_count', getattr(prod, 'curr_stock'))
                        db.session.commit()
                        break
                # =======================================================
            return {"message": f"Verification Complete"}

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(CartVerificationResource, '/cartverification/<int:user_id>')            


class CartPurchaser(Resource):
    @marshal_with(only_message_fields)    
    # @marshal_with(cart_fields)
    def post(self, user_id):
        try:
            # Delete the user's cart items
            delete_rows = Cart.query.filter_by(user_id=user_id)
            
            if (not delete_rows):
            # if delete_rows.count() == 0:
                # If no rows were deleted, the user might not have items in the cart
                return {"message": "No items found in the user's cart"}
            
            for row in delete_rows:
                row_prod_id=getattr(row, 'product_id')
                row_user_id=getattr(row, 'user_id')
                row_prod_count=getattr(row, 'prod_count')
                row_timestamp=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
                
                new_sold_entry = Sold(
                product_id=row_prod_id,
                user_id=row_user_id,
                prod_count=row_prod_count,
                timestamp=row_timestamp
                )
                db.session.add(new_sold_entry)
                db.session.commit()

                prod_row=Product.query.get(row_prod_id)

                if (not prod_row):
                    db.session.delete(row)
                    break

                
                curr_stock=getattr(prod_row, 'curr_stock')
                res_stock=curr_stock-row_prod_count
                if res_stock>0:
                    setattr(prod_row, 'curr_stock', res_stock)
                    db.session.commit()

                else:
                    setattr(prod_row, 'curr_stock', 0)
                    setattr(prod_row, 'in_stock', False)
                    db.session.commit()
                    return {"message": f"Purchase Unsuccessful"}

                
                db.session.delete(row)
                db.session.commit()





            # Commit the changes to the database
            db.session.commit()

            return {"message": f"Purchase successful"}

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(CartPurchaser, '/cartpurchaser/<int:user_id>')                

# ======================================================

class FreshProds(Resource):
    @marshal_with(product_fields)
    def get(self):
        try:
            # Find the product by ID
            prods = Product.query.filter_by(in_stock=True).all() #.sort(key=lambda x: x.product_id, reverse=True)
            
            if (not prods):            
            # if not prods:
                # If the product is not found, return a 404 response
                return {"message": f"No products found"}
            prods = sorted(prods, key=lambda x: x.product_price, reverse=True)
            prods = prods[:12]
            return prods
        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(FreshProds, '/freshprods')


class UserPastProds(Resource):
    @marshal_with(product_fields)
    def get(self,user_id):
        try:
            # Find the product by ID
            prods = Sold.query.filter_by(user_id=user_id).all() #.sort(key=lambda x: x.product_id, reverse=True)
            
            if (not prods):
            # if not prods:
                # If the product is not found, return a 404 response
                return {"message": f"No products found"}
            prods = sorted(prods, key=lambda x: x.timestamp, reverse=True)
            prods = prods[:12]
            return prods
        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(UserPastProds, '/userpastprods/<int:user_id>')


class ProdsOfSection(Resource):
    @marshal_with(product_fields)
    def get(self,section_id):
        try:

            sect = Section.query.get(section_id)

            if (not sect):
                return {"message": f"No section found"}

            # Find the product by ID
            prods = Product.query.filter_by(section_id=section_id).all() 
            
            if (not prods):
            # if not prods:
                # If the product is not found, return a 404 response
                return {"message": f"No products found"}

            return prods
        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(ProdsOfSection, '/prodsofsection/<int:section_id>')            

class AllSections(Resource):
    @marshal_with(section_fields)
    def get(self):
        try:
            # Find the product by ID
            sections = Section.query.all() 

            if (not sections):            
            # if not sections:
                # If the product is not found, return a 404 response
                return {"message": f"No sections found"}

            return sections
        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(AllSections, '/allsections')


class CartResource(Resource):
    @marshal_with(cart_fields)
    def get(self, user_id):
        try:
            # Find the product by ID
            cart = Cart.query.filter_by(user_id=user_id).all()

            if (not cart):
                # If the product is not found, return a 404 response
                return {"message": f"Cart not found"}


            return cart

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(CartResource, '/cart/<int:user_id>')


class IsThisBought(Resource):
    @marshal_with(only_message_fields)
    def post(self):
        try:

            parser=reqparse.RequestParser()
            parser.add_argument('user_id', type=int, help='Current user id', required=True)
            parser.add_argument('product_id', type=int, help='Current product id', required=True)
            args = parser.parse_args()

            # Access the parsed data
            user_id = args['user_id']       
            product_id = args['product_id']       

            # Find the product by ID
            product_found = Cart.query.filter_by(product_id=product_id,user_id=user_id).all()

            if (not product_found):
                # If the product is not found, return a 404 response
                return {"message": False}
            else:
                return {"message": True}

        except Exception as e:
            # Handle the exception and return a custom JSON error response
            return {"message": f"Some error occured"}

api.add_resource(IsThisBought, '/isthisbought')       




class SearchProductsMain(Resource):
    @marshal_with(product_fields)
    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('query', type=str)
        parser.add_argument('sections', type=str,action='split')



        args = parser.parse_args()        
        search_query = args.get('query')
        sections = args.get('sections')
        sections = [int(section) for section in args.get('sections', [])]

        sections_list = sections
        # sections_list = list(map(int, sections.split(','))) if sections else []
        
        # Get the foreign key values from the related table
        section_ids = [section.section_id for section in Section.query.filter(Section.section_id.in_(sections_list)).all()]


        # Filter the table based on foreign key values
        filtered_rows = Product.query.filter(Product.section_id.in_(section_ids)).all()



        # Perform exact substring matching
        exact_matches = {row for row in filtered_rows if search_query.lower() in row.product_name.lower()}

        # Perform fuzzy string matching for non-exact matches
        fuzzy_matches = {
            row for row in filtered_rows 
            if  fuzz.partial_ratio(search_query.lower(), row.product_name.lower()) > 50
        }


        # fuzzy_matches = {    
        # row for row in filtered_rows 
        # if re.search(re.escape(search_query.lower()), row.product_name.lower())
        # }   
        # Combine exact and fuzzy matches, convert to a list to eliminate duplicates
        results = list(exact_matches.union(fuzzy_matches))


        return results

api.add_resource(SearchProductsMain, '/search')

