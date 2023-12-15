
from main import app
from application.sec import datastore
from application.models import db, Section, Product


with app.app_context():
    db.create_all()



    mobiles = Section(section_name="Mobiles", section_desc="Varied range of Smartphones and Mobile Handsets", approval_stat=True)
    laptops = Section(section_name="Laptops", section_desc="Curated selection of Branded and Reliable Laptops for daily and casual use", approval_stat=True)
    bakery = Section(section_name="Bakery", section_desc="Fresh inhouse Baked products ", approval_stat=True)
    milk_prods = Section(section_name="Milk Prods", section_desc="Milk and milk based products", approval_stat=True)
    frozen_foods = Section(section_name="Frozen Food", section_desc="Quick frozen foods when you are low on time", approval_stat=True)
    beverages = Section(section_name="Beverages", section_desc="Beverages and packaged soft drinks", approval_stat=True)
    snacks = Section(section_name="Snacks", section_desc="Assorted selection of favourite timepass snacks", approval_stat=True)
    staples = Section(section_name="Staples", section_desc="Daily go to staples such as rice, lentils and flour", approval_stat=True)

    db.session.add(staples)
    db.session.add(bakery)
    db.session.add(milk_prods)
    db.session.add(frozen_foods)
    db.session.add(beverages)
    db.session.add(snacks)
    db.session.add(mobiles)
    db.session.add(laptops)
            


    prod0 = Product(product_name="Erasers (Pack of 6)", section_id=1, product_desc="Camlion erasers dust free and clean erasing. Last for uptp 10000 erases", 
                    in_stock=True,curr_stock=200, product_price=18, per_what="1 pack", product_image="erasers", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod_1 = Product(product_name="Canonbolt Camera DCLR", section_id=1, product_desc="Capture every moment with movie grade precision!", 
                    in_stock=True,curr_stock=200, product_price=18000, per_what="1 unit", product_image="cameras", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")

    prod1 = Product(product_name="Nagpur Oranges", section_id=2, product_desc="Well selected oranges from the groves of Nagpur brought straight to your doorstep! Enjoy!", 
                    in_stock=True,curr_stock=200, product_price=89, per_what="kg", product_image="oranges", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod2 = Product(product_name="New Zealand Kiwis", section_id=2, product_desc="The famous newzealand kiwis (not to be mistaken for the bird or the people either ;) ) kiwis are a wonderfull addition to any meal given their sweet-and-sour taste", 
                    in_stock=True,curr_stock=40, product_price=240, per_what="kg", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod3 = Product(product_name="Kahmir Lychees", section_id=2, product_desc="Straight from the valleys of Kashmir, these lychees are filled with vitamins and essential nutrients making them a perfect mid-day snack", 
                    in_stock=True,curr_stock=200, product_price=230, per_what="kg", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod4 = Product(product_name="Nashik Grapes", section_id=2, product_desc="A perfect combo of sweet and sour, light yet filling, a juicy burst of joy in every bite!", 
                    in_stock=True,curr_stock=80, product_price=129, per_what="kg", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod5 = Product(product_name="Alphonso Mangos", section_id=2, product_desc="A national pride, imported straight from Devgad, behold the true king of fruits!", 
                    in_stock=True,curr_stock=300, product_price=899, per_what="kg", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod6 = Product(product_name="Spanish Peaches", section_id=2, product_desc="Juicy fresh imported spanish peaches", 
                    in_stock=True,curr_stock=100, product_price=499, per_what="kg", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod7 = Product(product_name="Brazilian Avacados", section_id=2, product_desc="Packing high in fiber and vitamins, a perfect dose for a morning meal", 
                    in_stock=True,curr_stock=410, product_price=214, per_what="kg", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")



    prod8 = Product(product_name="Basmati Rice", section_id=4, product_desc="Basmati, is a variety of long, slender-grained aromatic rice which is traditionally grown in the Indian subcontinent, mainly India, Pakistan, Sri Lanka and Nepal.", 
                    in_stock=True,curr_stock=40, product_price=100, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod82 = Product(product_name="Atta Flour", section_id=4, product_desc="Atta/Ata or chakki atta is a wholegrain wheat flour, originating from the Indian subcontinent, used to make flatbreads such as chapati, roti, naan, paratha and puri.", 
                    in_stock=True,curr_stock=40, product_price=80, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")

    prod9 = Product(product_name="Sponge Cake", section_id=5, product_desc="Sponge cake is a light cake made with egg whites, flour and sugar, sometimes leavened with baking powder.", 
                    in_stock=True,curr_stock=40, product_price=40, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod10 = Product(product_name="1ltr Cow Milk", section_id=6, product_desc="Sourced from farms in kolhapur, this is fresh cow milk with heavy layers of fats.", 
                     in_stock=True,curr_stock=40, product_price=45, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod11 = Product(product_name="Chocolate Icecream", section_id=7, product_desc="Scrumptious chocolate mixed into heavenly icecream, take your taste buds for a ride!", 
                     in_stock=True,curr_stock=40, product_price=250, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod12 = Product(product_name="Bottled Lemonade", section_id=8, product_desc="Local hygenic lemonade now available for your enjoyment", 
                     in_stock=True,curr_stock=40, product_price=58, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod13 = Product(product_name="Bikaner Bhujia", section_id=9, product_desc="A snack from the corners of Rajasthan, bikaneria bhujia are a spicy sev made of lentils and pepper", 
                     in_stock=True,curr_stock=40, product_price=100, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod14 = Product(product_name="Sinsing M5", section_id=10, product_desc="A 128gb storage with a ram of 6gb made for those who love life big", 
                     in_stock=True,curr_stock=40, product_price=19000, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    prod15 = Product(product_name="Orange N3 Pro", section_id=11, product_desc="Orange N1 Pro blasts forward with the N3, N3 Pro and N3 Max chips. Built on 3‑nanometre technology and featuring an all-new GPU architecture, they’re the most advanced chips ever built for a personal computer. ", 
                     in_stock=True,curr_stock=40, product_price=289900, per_what="ltr", product_image="nothing", mfg_date="2021-1-1", exp_date="2021-1-1", creation_date="2023-11-12T:00:00:00.000Z")
    
    db.session.add(prod0)
    db.session.add(prod_1)        
    db.session.add(prod1)
    db.session.add(prod2)
    db.session.add(prod3)
    db.session.add(prod4)
    db.session.add(prod5)
    db.session.add(prod6)
    db.session.add(prod7)
    db.session.add(prod8)
    db.session.add(prod82)
    db.session.add(prod9)
    db.session.add(prod10)
    db.session.add(prod11)
    db.session.add(prod12)
    db.session.add(prod13)
    db.session.add(prod14)
    db.session.add(prod15)  

    try:

        db.session.commit()
    except:
        print("didnt work sike")
        pass
