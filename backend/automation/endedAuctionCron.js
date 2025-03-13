import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("🔄 Cron for ended auction running...");
    
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });

    console.log(`✅ Found ${endedAuctions.length} ended auctions`);

    for (const auction of endedAuctions) {
      try {
        console.log(`📢 Processing auction: ${auction.title} (ID: ${auction._id})`);

        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;

        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });

        const auctioneer = await User.findById(auction.createdBy);
        console.log(`👤 Auctioneer: ${auctioneer.email}`);

        auctioneer.unpaidCommission = commissionAmount;

        if (highestBidder) {
          console.log("🏆 Highest bidder found:", highestBidder.bidder.id);
          
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();

          const bidder = await User.findById(highestBidder.bidder.id);
          console.log(`📩 Preparing email for ${bidder.email}`);

          const subject = `Congratulations! You won the auction for ${auction.title}`;
          const message = `Dear ${bidder.userName}, \n\nCongratulations! You have won the auction for ${auction.title}. \n\nBefore proceeding for payment contact your auctioneer via your auctioneer email:${auctioneer.email} \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**: \n- Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName} \n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber} \n- Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **Easypaise**:\n- You can send payment via Easypaise: ${auctioneer.paymentMethods.easypaisa.easypaisaAccountNumber}\n\n3. **PayPal**:\n- Send payment to: ${auctioneer.paymentMethods.paypal.paypalEmail}\n\n4. **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.\n- The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this: ${auctioneer.email}\n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!\n\nBest regards,\nbidout Auction Team`;

          console.log("📨 SENDING EMAIL TO HIGHEST BIDDER...");
          const emailResponse = await sendEmail({ email: bidder.email, subject, message });

          console.log("✅ EMAIL SENT SUCCESSFULLY!", emailResponse);

          
        } else {
          console.log("⚠️ No highest bidder found for auction:", auction.title);
          await auction.save();
        }
      } catch (error) {
        console.error("❌ ERROR in ended auction cron:", error);
      }
    }
  });
};
