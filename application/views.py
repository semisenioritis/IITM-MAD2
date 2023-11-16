from flask import current_app as app, jsonify, request, render_template
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



@app.get("/activate/inst/<int:sm_id>")
# @auth_required('token')
@roles_required('admin')
def activate_storemanager(sm_id):
    print("hiiiiii")
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
    if not email:
        return jsonify({"message": "Email is required"}), 400
    
    user = datastore.find_user(email=email)

    if not datastore.find_user(email=email):
        return jsonify({"message": "User not found"}), 404
    
    # if check_password_hash(user.password, data.get('password')):
        
    #     return user.get_auth_token()   
    
    if user.password == data.get('password'):
        return user.get_auth_token() 
    else:
        return jsonify({"message": "Wrong password"}), 400       