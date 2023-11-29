# 🟠🟠  Prolly will contain the views and base access to the actual pages. 🟠🟠
# 🟠🟠  The @ decorators will allow me to restrict access to certain pages and paths.  🟠🟠
# 🟠🟠  Login happens here so remember to hash passwords and check passowrd hashes during that.  🟠🟠
# 🟠🟠  Need to make another endpoint for logging users in here. 🟠🟠
 


from flask import current_app as app, jsonify, request, render_template, redirect, url_for
from .models import User, db
from flask_security import login_required, roles_required, roles_accepted, current_user, auth_required
from .sec import datastore
from werkzeug.security import check_password_hash



@app.get("/")
def home():
    return render_template("index.html")


@app.get("/admin")
@auth_required('token')
@roles_required('admin')
def admin():
    return "Hello, Admin!"



@app.get("/activate/sm/<int:sm_id>")
@auth_required('token')
@roles_required('admin')
def activate_storemanager(sm_id):
    store_manager = User.query.get(sm_id)

    if not store_manager or "storemanager" not in store_manager.roles:
        return jsonify({"message": "Store_Manager not found"}), 404

    store_manager.active = True
    db.session.commit()
    return jsonify({"message": "User Activated"})



@app.post('/user-login')
def user_login():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    if not email:
        return jsonify({"message": "Email is required"}), 400
    
    user = datastore.find_user(email=email)

    if not datastore.find_user(email=email):
        return jsonify({"message": "User not found"}), 404
    
    if not datastore.find_user(username=username):
        return jsonify({"message": "User not found"}), 404
       
    # if check_password_hash(user.password, data.get('password')):
        
    #     return user.get_auth_token()   

    if user.password == data.get('password'):
        return jsonify({"token": user.get_auth_token(), "username": user.username, "role": user.roles[0].name, "id": user.id, "email": user.email})
    else:
        return jsonify({"message": "Wrong password"}), 400       
    

@app.post('/user-register')
def user_register():
    data = request.get_json()
    email = str(data.get('email'))
    username = str(data.get('username'))
    password = str(data.get('password'))
    sm = bool(data.get('sm'))
    if not email:
        return jsonify({"message": "Email is required"}), 400
    
    if not username:
        return jsonify({"message": "Username is required"}), 400

    if not password:
        return jsonify({"message": "Password is required"}), 400

    if datastore.find_user(email=email):
        return jsonify({"message": "User already exists"}), 400

    if datastore.find_user(username=username):
        return jsonify({"message": "User already exists"}), 400


    if sm == True:
        datastore.create_user(email=email, username=username, password=password, roles=['storemanager'], active=False)

        db.session.commit()
    else:
        datastore.create_user(email=email, username=username, password=password, roles=['user'])

        db.session.commit()
    return jsonify({"message": "Account created successfully"}), 201

