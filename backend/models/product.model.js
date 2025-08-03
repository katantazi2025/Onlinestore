import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: string,
        required: true
    },
}, {
    timestamps: true //createdAt, updatedAt
        
});

const product = mongoose.model('product', productschema);

export default product;