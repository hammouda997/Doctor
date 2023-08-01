import {Schema, model} from "mongoose";

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  brand?: string;
  supplier?: string;
  stock: number;
  stockAlert?: number;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  isDeleted: boolean;
}

const productModel = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
    },
    stockAlert: {
      type: Number,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
    },
    supplier: {
      type: String,
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);
productModel.set("toJSON", {
  // @ts-ignore
  transform: (post: IProduct, {__v, password, ...rest}: IProduct) => rest,
});
const ProductModel = model<IProduct>("Product", productModel);

export default ProductModel;
