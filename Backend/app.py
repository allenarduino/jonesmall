#Importing the python modules and libraries
from flask import Flask,render_template,redirect,request,flash,url_for,jsonify,make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask_bcrypt import Bcrypt 




from flask_mysqldb import MySQL

import MySQLdb.cursors
#jwt for json web token authentication
import jwt
import os









app=Flask(__name__)
CORS(app)
bcrypt=Bcrypt(app)

############Uploaded files eg. image

UPLOAD_FOLDER="/media/allen/SIMBAD/Flaskprojects/mystore/Jones_Mall/Backend/static/"
ALLOWED_EXTENSIONS=set(["jpeg","jpg","png"])
app.config["UPLOAD_FOLDER"]=UPLOAD_FOLDER
app.config["ALLOWED_EXTENSIONS"]=ALLOWED_EXTENSIONS

secret="eeeeertbmbmmmmmmmmmmm"







#############Database connection details

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='FRIENDSNASH$'
app.config['MYSQL_DB']='ellyon_mall'
app.config["CHARSET"]='utf8mb4'
app.config["COLLATION"]='utf8mb4_ci'


##Initializing MySQL
mysql=MySQL(app)








secret="eeeeertbmbmmmmmmmmmmm"



   

#Admin signup 

@app.route('/adminsignup',methods=["POST","GET"])
def adminsignup():
    if request.method=='POST':
        #Receiving input values
        name=request.form['name']
        email=request.form['email']
        password=request.form['password']
        #SQL query
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT email from Users WHERE email=%s",(email,))
        account=cursor.fetchone()
        
        
        if account:
            return jsonify({"error":"Admin with email already exists!"})
        else:
            admin_img="/static/slider-1.jpg"
            
             
            sql="INSERT INTO admin(name,email,password,user_img) VALUES (%s,%s,%s,%s)"
            data=(name,email,password,admin_img,)
            cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute(sql,data)
            mysql.connection.commit()
            
            return jsonify({"message":"You're successfully registered"})
              
        

#Admin login
@app.route('/admin_login', methods=["POST","GET"])
def adminlogin():
    if request.method=="POST":
        email=request.form['email']
        password=request.form['password']
        sql="SELECT* FROM admin WHERE email=%s AND password=%s"
        data=(email,password,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        account=cursor.fetchone()
        
        if account:
            admin_id=account["id"]  #id in admin table==admin_id
            email=account["email"]
            payload={
                'admin_id':admin_id   
                
            }
            admin_token=jwt.encode(payload,secret)
            return jsonify(admin_token.decode("UTF-8"))

        else:
            
            return jsonify({"error":"Invalid credentials"})
       

          
###For admin to delete a product
@app.route("/delete_product/<int:product_id>",methods=["DELETE"])
def delete_product(product_id):
    sql="DELETE FROM products WHERE id=%s"
    data=(product_id,)
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql,data)
    return jsonify("Product deleted")

####For admin to delete product category
@app.route("/delete_category/<string:category_id>",methods=["DELETE"])
def delete_category(category_id):
    sql="DELETE FROM categories WHERE cat_name=%s"
    data=(category_id,)
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql,data)
    return jsonify("Category deleted")

###For admin to fetch_customers
@app.route("/my_customers",methods=["GET"])
def my_customers():
    sql="SELECT* FROM customers"
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql)
    customers=cursor.fetchall()
    return jsonify(customers)


#####For admin to display orders
@app.route("/orders",methods=["GET"])
def orders():
    sql="SELECT* FROM orders,customers WHERE customers.id=orders.customer_id"
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql)
    orders=cursor.fetchall()
    return jsonify(orders)

####For admin to fetch specific order
@app.route("/orders/<int:order_id>",methods=["GET"])
def single_order(order_id):
    sql="SELECT* FROM orders WHERE id=%s"
    data=(order_id,)
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql,data)
    details=cursor.fetchall()
    return jsonify(details)
   




#users or customers signup below
@app.route('/customer_signup',methods=["POST"])
def customer_signup():
    if request.method=='POST':
        name=request.form["name"]
        email=request.form["email"]
        password=request.form["password"]
        ###Hashing customer's password
        password=bcrypt.generate_password_hash(password)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        sql="SELECT email from customers WHERE email=%s"
        data=(email,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        result=cursor.execute(sql,data)
        account=cursor.fetchone()
        
        
        if account:
            return jsonify({"error":"customer with email already exists!"})
        else:
            
        
             
            sql="INSERT INTO customers(name,email,password) VALUES (%s,%s,%s)"
            data=(name,email,password,)
            cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute(sql,data)
            mysql.connection.commit()  
            
            return jsonify({"message":"You're successfully registered"})
              
        
                

#users or customers login below

#User login
@app.route('/customer_login', methods=["POST","GET"])
def customer_login():
    if request.method=="POST":
        email=request.form['email']
        password=request.form['password']
       
        sql="SELECT* FROM customers WHERE email=%s"
        data=(email,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        account=cursor.fetchone()
        #If email exists in database, continue authentication else throw error message
        if account:
            hashed_password=account["password"]
            authenticated_user=bcrypt.check_password_hash(hashed_password,password)

        #If password is correct,encode log customer in/else throw error message
            if authenticated_user:

                customer_id=account["id"]  
                email=account["email"]
                payload={
                'customer_id':customer_id 
                }
    
                token=jwt.encode(payload,secret)
                return jsonify(token.decode("UTF-8"))

            else:
                return jsonify({"error":"Invalid Email or password"})


                
    

        else:
            return jsonify({"error":"Email is not in our database"})
     

########################Admin Profile#######################################

@app.route('/admin_profile', methods=['GET'])
def student_profile():
    if request.method=="GET":

        jwt_decoded=request.headers.get("Authorization")
        decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        admin_id=decoded['admin_id']

        sql="SELECT* FROM admin WHERE students.id=%s"
        data=(admin_id,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        profile_info=cursor.fetchall()
        sql2="SELECT* FROM products"
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql)
        products=cursor.fetchall()
        return jsonify({"profile_info":profile_info,"products":products})




##########################For admin to create category########
@app.route("/create_category", methods=["POST"])
def create_category():
    if request.method=="POST":
        cat_name=request.form["cat_name"]
        file=request.files["cat_image"]
        file.save(os.path.join(app.config["UPLOAD_FOLDER"],secure_filename(file.filename)))
        cat_image= "/static/"+file.filename 

        sql="INSERT INTO categories(cat_name,cat_image) VALUES (%s,%s)"
        data=(cat_name,cat_image)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        mysql.connection.commit()
        return jsonify("Category created")

    

   









@app.route("/create_product",methods=["POST"])
def create_product():
    if request.method=="POST":
        #jwt_decoded=request.headers.get("Authorization")
        #decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        #admin_id=decoded['admin_id']

        name=request.form["product_name"]
        price=request.form["price"]
        description=request.form["description"]
        category=request.form["category"]
        file=request.files["product_img"]
        file.save(os.path.join(app.config["UPLOAD_FOLDER"],secure_filename(file.filename)))
        product_img= "/static/"+file.filename 
        quantity=1
        
        

        sql="INSERT INTO products(name,product_img,price,description,category,quantity) VALUES(%s,%s,%s,%s,%s,%s)"
        data=(name,product_img,price,description,category,quantity,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        mysql.connection.commit()
        return jsonify({"message":"Product created sucessfully"})



#################This will fetch categories in a drop down form######
@app.route("/fetch_cat",methods=["GET"])
def fetch_cat():
    sql="SELECT cat_name FROM categories"
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql)
    cat=cursor.fetchall()
    return jsonify(cat)



##This route is for product fetching from the database

@app.route("/products",methods=["GET"])
def courses():
    if request.method=="GET":
        sql="SELECT* FROM products ORDER BY products.created_at DESC"
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql)
        products=cursor.fetchall()
        return jsonify(products)


####For fetching product categories
@app.route("/categories",methods=["GET"])
def categories():
    if request.method=="GET":
        sql="SELECT* FROM categories"
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql)
        categories=cursor.fetchall()
        return jsonify(categories)


######For fetching product categories
@app.route("/categories/<string:category_id>",methods=["GET"])
def itmes(category_id):
    if request.method=="GET":
        sql="SELECT* FROM products WHERE category=%s"
        data=(category_id,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        items=cursor.fetchall()
        return jsonify(items)


##For customer to place order
@app.route("/place_order",methods=["POST"])
def place_order():
        #Getting user_id from token 
        jwt_decoded=request.headers.get("Authorization")
        decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        customer_id=decoded['customer_id']
        #Getting cart items from the client or front end
        order_items=request.form["Cart_items"]
        address=request.form["address"]
        telephone_number=request.form["telephone_number"]
        sql="INSERT INTO orders(customer_id,oder_items,address,telephone_number) VALUES (%s,%s,%s,%s) "
        data=(customer_id,order_items,address,telephone_number,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        mysql.connection.commit()
        return jsonify("Order placed sucessfully")


'''This will fetch customer's info and display it in message 
after placing an order'''
@app.route("/display",methods=["GET"])
def display():
    if request.method=="GET":
        jwt_decoded=request.headers.get("Authorization")
        decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        customer_id=decoded['customer_id']

        sql="SELECT name FROM customers WHERE id=%s"
        data=(customer_id,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        info=cursor.fetchall()
        return jsonify(info)

###Route for user to fetch and view his/her orders
@app.route("/my_orders",methods=["GET"])
def my_orders():
    if request.method=="GET":
        #Receiving and decoding customer_id from token sent in header
        jwt_decoded=request.headers.get("Authorization")
        decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        customer_id=decoded['customer_id']

        sql="SELECT order_items FROM orders WHERE customer_id=%s"
        data=(customer_id,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        my_orders=cursor.fetchall()
        return jsonify(orders)






###For user to search products
@app.route("/search_products",methods=["POST"])
def search_products():
    if request.method=="POST":
        name=request.form["name"]
        sql="SELECT* FROM products WHERE name like %s"
        data=("%"+name+"%",)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        products=cursor.fetchall()
        if len(products)==0:
            return jsonify({"message":"No result"})
        else:
            return jsonify({"products":products})    
       
















'''
The
code below is for debugging.
The server automatically reloads as changes are made to the code
'''



if __name__=="__main__":
    app.run(debug='true')