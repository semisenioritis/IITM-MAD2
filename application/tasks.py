from celery import shared_task
from .models import Section, User, Product, Role, Sold, Cart
import flask_excel as excel
from datetime import datetime, timedelta
from dateutil import parser

from .mail_service import send_message



@shared_task(ignore_result=False)
def create_resource_csv(sec_id):

    prod_deets = Product.query.filter_by(section_id=sec_id).all()

    csv_output = excel.make_response_from_query_sets(
        prod_deets, ["product_id", "product_name","section_id","product_desc","curr_stock","in_stock","product_price","per_what","mfg_date","exp_date","creation_date"], "csv")
    filename = "test.csv"
 
    with open(filename, 'wb') as f:
        f.write(csv_output.data)

    return filename


@shared_task(ignore_result=False)
def daily_reminder():
    users = User.query.all()
    for user in users:
        if user.has_role("user"):
            prods_in_cart = Cart.query.filter_by(user_id=user.id).all()
            if prods_in_cart != []:
                prod_name_list = []
                prod_price_list = []
                prod_quant_list = []
                for prod in prods_in_cart:
                    this_prod = Product.query.filter_by(product_id=prod.product_id).first()
                    prod_name_list.append(this_prod.product_name)
                    prod_price_list.append(this_prod.product_price)
                    prod_quant_list.append(prod.prod_count)
                content = f'''
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Daily Reminder</title>
                </head>
                
                <body>
                Hello {user.username},
                <br>
                You seem to have the following products in you cart:
                <br>
                <h2>Product Information</h2>
                
                <table border="1">

                <thead>
                <tr><th>Product Name:</th><th>Product Price:</th><th>Product Quantity:</th></tr>
                </thead>
                
                <tbody>
                '''
                for i in range(len(prod_name_list)):
                    content += f"<tr><td>{prod_name_list[i]}</td><td>{prod_price_list[i]}</td><td>{prod_quant_list[i]}</td></tr>"
                content += f'''
                </tbody>
                
                </table>
                </body>
                </html>
                '''
                send_message(user.email, "Daily Reminder from GrocerKing", content)
            else:
                content = f'''
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Daily Reminder</title>
                </head>
                
                <body>
                Hello {user.username},
                <br>
                You dont seem to have bought any products today... 
                <br>
                The King would like to cheer you up!
                <br>
                Head over to the <a href="http://127.0.0.1:5000/">Grocer King</a> and checkout todays limited time offers!!

                <br>

                

                <br>
                The King awaits you!
                </body>
                </html>
                '''
                send_message(user.email, "Daily Reminder from GrocerKing", content)
    return "Daily Reminder Sent"



@shared_task(ignore_result=False)
def monthly_summary():
    subject = "Monthly Purchase Summary from GrocerKing"
    content= "hello world"

    users = User.query.all()
    curr_time = datetime.now()
    one_month_ago = curr_time - timedelta(days=30) 
    for user in users:
        if user.has_role("user"):
            prod_bought = Sold.query.filter_by(user_id=user.id).all()
            if prod_bought != []:
                prod_name_list = []
                prod_price_list = []
                prod_quant_list = []
                total_cost=0
                for prod in prod_bought:
                    js_datetime = parser.parse(prod.timestamp)
                    if js_datetime > one_month_ago:
                        this_prod = Product.query.filter_by(product_id=prod.product_id).first()                        
                        prod_name_list.append(this_prod.product_name)
                        prod_price_list.append(this_prod.product_price)
                        prod_quant_list.append(prod.prod_count)
                        total_cost += this_prod.product_price*prod.prod_count
                if prod_name_list != []:
                    content = f'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>Hello {user.username},<br>Here is your monthly purchase summary:<br><h2>Product Information</h2><table border="1"><thead><tr><th>Product Name:</th><th>Product Price:</th><th>Product Quantity:</th></tr></thead><tbody>'
                    for i in range(len(prod_name_list)):
                        content += f"<tr><td>{prod_name_list[i]}</td><td>{prod_price_list[i]}</td><td>{prod_quant_list[i]}</td></tr>"
                    content += f'</tbody></table><h2>Total Cost: {total_cost}</h2></body></html>'
                    send_message(user.email, subject, content)
    return "ok"