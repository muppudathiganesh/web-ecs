# ==== api.py ====
from flask import jsonify, request
from app import app
from models import db, Product

@app.route('/api/products')
def api_get_products():
    products = Product.query.all()
    return jsonify([{ 'id': p.id, 'name': p.name, 'price': p.price, 'stock': p.stock } for p in products])

@app.route('/api/cart/add', methods=['POST'])
def api_add_to_cart():
    data = request.json
    return jsonify({"message": f"Added {data['product_id']} to cart"})