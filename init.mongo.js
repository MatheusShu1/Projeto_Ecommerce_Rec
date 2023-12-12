db = db.getSiblingDB('ecommerce');
db.createUser(
    {
        user: "admin",
        pwd: "admin123",
        roles: [
            {
                role: "readWrite",
                db: "ecommerce"
            }
        ]
    }
);