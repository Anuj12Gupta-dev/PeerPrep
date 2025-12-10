import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "talent-iq" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "user/created" },
  async ({ event }) => {
    await connectDB();

    const { id, email, name, profileImage } = event.data;

    const newUser = {
      googleId: id,
      email: email,
      name: name,
      profileImage: profileImage,
    };

    await User.create(newUser);

    await upsertStreamUser({
      id: newUser.googleId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "user/deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ googleId: id });

    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];