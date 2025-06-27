//מונגו
// const Supplier = require('./SupplierRoute')
const Product = require('./ProductRoute')
const Order = require('./OrderRoute')
const users = require('./UsersRoute')



exports.routeInit=(app)=>{
    app.use('/api/Users',users)
    // app.use('/api/Supplier',Supplier)
    app.use('/api/Product',Product)
    app.use('/api/Order',Order)

}