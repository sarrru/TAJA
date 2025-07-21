import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";

// Utility function
export const pricewithDiscount = (price, dis = 1) => {
  const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);
  const actualPrice = Number(price) - Number(discountAmount);
  return actualPrice;
};

// Cash on Delivery Controller
export async function CashOnDeliveryOrderController(request, response) {
  try {
    const userId = request.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

    if (!Array.isArray(list_items) || list_items.length === 0) {
      return response.status(400).json({
        message: "list_items is missing or empty",
        error: true,
        success: false,
      });
    }

    const payload = list_items.map((el) => {
      const product = el.productId || el;

      return {
        userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: product._id,
        product_details: {
          name: product.name,
          image: product.image,
        },
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: addressId,
        subTotalAmt,
        totalAmt,
      };
    });

    const generatedOrder = await OrderModel.insertMany(payload);

    // Clear cart only if order was placed from cart
    const removeCartItems = await CartProductModel.deleteMany({ userId });
    await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

    return response.json({
      message: "Order placed successfully",
      error: false,
      success: true,
      data: generatedOrder,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Stripe Online Payment
export async function paymentController(request, response) {
  try {
    const userId = request.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

    console.log("💡 list_items:", list_items);

    const user = await UserModel.findById(userId);

    const line_items =
      Array.isArray(list_items) && list_items.length > 0
        ? list_items.map((item) => {
            const product = item.productId || item;

            if (!product || !product.name || !product.price) {
              throw new Error("Invalid product data");
            }

            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: product.name,
                  images: Array.isArray(product.image)
                    ? product.image
                    : [product.image],
                  metadata: {
                    productId: product._id,
                  },
                },
                unit_amount:
                  pricewithDiscount(product.price, product.discount) * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity || 1,
            };
          })
        : [];

    if (!line_items || line_items.length === 0) {
      return response.status(400).json({
        message: "Invalid or empty line_items",
        error: true,
        success: false,
      });
    }

    const session = await Stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId,
        addressId,
      },
      line_items,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    return response.status(200).json(session);
  } catch (error) {
    console.error("💥 Stripe error:", error);
    return response.status(500).json({
      message: error.message || "Stripe session creation failed",
      error: true,
      success: false,
    });
  }
}

// Webhook handler for Stripe
const getOrderProductItems = async ({
  lineItems,
  userId,
  addressId,
  paymentId,
  payment_status,
}) => {
  const productList = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await Stripe.products.retrieve(item.price.product);

      const payload = {
        userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: product.metadata.productId,
        product_details: {
          name: product.name,
          image: product.images,
        },
        paymentId,
        payment_status,
        delivery_address: addressId,
        subTotalAmt: Number(item.amount_total / 100),
        totalAmt: Number(item.amount_total / 100),
      };

      productList.push(payload);
    }
  }

  return productList;
};

export async function webhookStripe(request, response) {
  const event = request.body;

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(
        session.id
      );
      const userId = session.metadata.userId;

      const orderProduct = await getOrderProductItems({
        lineItems,
        userId,
        addressId: session.metadata.addressId,
        paymentId: session.payment_intent,
        payment_status: session.payment_status,
      });

      const order = await OrderModel.insertMany(orderProduct);

      if (order?.[0]) {
        await UserModel.findByIdAndUpdate(userId, {
          shopping_cart: [],
        });
        await CartProductModel.deleteMany({ userId });
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  response.json({ received: true });
}

// Get order history
export async function getOrderDetailsController(request, response) {
  try {
    const userId = request.userId;

    const orderlist = await OrderModel.find({ userId })
      .sort({ createdAt: -1 })
      .populate("delivery_address");

    return response.json({
      message: "Order list fetched",
      data: orderlist,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
