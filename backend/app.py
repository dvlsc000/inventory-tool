from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Product, Sale

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
db.init_app(app)
CORS(app)

# Explicitly create tables before the app starts
def create_tables():
    with app.app_context():
        db.create_all()

@app.route('/products', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'POST':
        data = request.json
        new_product = Product(
            name=data['name'],
            quantity=data['quantity'],
            price=data['price']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product added'}), 201

    products = Product.query.all()
    return jsonify([
        {'id': p.id, 'name': p.name, 'quantity': p.quantity, 'price': p.price}
        for p in products
    ])

@app.route('/sales', methods=['POST'])
def record_sale():
    data = request.json
    product = Product.query.get(data['product_id'])

    if not product or product.quantity < data['quantity_sold']:
        return jsonify({'error': 'Invalid sale'}), 400

    product.quantity -= data['quantity_sold']
    sale = Sale(product_id=product.id, quantity_sold=data['quantity_sold'])
    db.session.add(sale)
    db.session.commit()

    return jsonify({'message': 'Sale recorded'})

@app.route('/low-stock', methods=['GET'])
def low_stock():
    low_stock_items = Product.query.filter(Product.quantity < 5).all()
    return jsonify([
        {'id': p.id, 'name': p.name, 'quantity': p.quantity}
        for p in low_stock_items
    ])

@app.route('/analytics', methods=['GET'])
def analytics():
    products = Product.query.all()
    total_inventory_value = sum(p.price * p.quantity for p in products)
    total_sales = Sale.query.count()
    return jsonify({
        'total_inventory_value': total_inventory_value,
        'total_sales': total_sales
    })

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
