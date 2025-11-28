import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmails.js";

export const notifyUsers = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const borrowers = await Borrow.find({
        dueDate: { $lt: oneDayAgo ,$type: "date"},
        returnDate: null,
        notified: false,
      });

      for (const element of borrowers) {
        const user = await User.findById(element.user.id);

        if (element.user && element.user.email) {
          await sendEmail({
            email: element.user.email,
            subject: "Book Return Reminder",
            message: `Hello ${element.user.name}, \n\nthis is a reminder that the book you borrowed is overdue. Please return it as soon as possible.`,
          });

          element.notified = true;
          await element.save();

          console.log(`Email sent to ${element.user.email}`);
        }
      }
    } catch (error) {
      console.error(" Some error occurred while notifying users:", error);
    }
  });
};