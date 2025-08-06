from app import app, db
from models import Product

# Sample stock data
products = [
    {"name": "Jameson Whiskey 700ml", "quantity": 20, "price": 25.99},
    {"name": "Baileys Irish Cream", "quantity": 15, "price": 21.50},
    {"name": "Guinness Draught 6-pack", "quantity": 30, "price": 10.99},
    {"name": "Irish Tweed Scarf", "quantity": 10, "price": 34.00},
    {"name": "Shamrock Mug", "quantity": 25, "price": 12.50},
    {"name": "Claddagh Ring (Silver)", "quantity": 8, "price": 45.00},
    {"name": "Handmade Soap (Lavender)", "quantity": 50, "price": 6.00},
    {"name": "Aran Knit Hat", "quantity": 12, "price": 22.00},
    {"name": "Irish Sea Salt Pack", "quantity": 40, "price": 4.95},
    {"name": "Locally Roasted Coffee", "quantity": 18, "price": 11.75},
]

# Add data to DB
with app.app_context():
    for item in products:
        product = Product(name=item["name"], quantity=item["quantity"], price=item["price"])
        db.session.add(product)
    db.session.commit()
    print(f"{len(products)} products added.")
