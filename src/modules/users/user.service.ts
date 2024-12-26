import { TUser } from "./user.interface";
import { User } from "./user.model";

const getAllUsersFromDB = async (role: string) => {
  let query = {};
  if (role) {
    query = { role };
  }

  const result = await User.find(query);
  return result;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email })
    .populate("followers")
    .populate("following");
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const followUser = async (payload: {
  userId: string;
  targetedUserId: string;
}) => {
  const { userId, targetedUserId } = payload;

  // update the user who will be followed
  const result = await User.findByIdAndUpdate(
    targetedUserId,
    {
      $push: { followers: userId },
    },
    { new: true }
  );

  // update the user who requested to follow
  if (result) {
    const response = await User.findByIdAndUpdate(
      userId,
      {
        $push: { following: targetedUserId },
      },
      { new: true }
    );
    return response;
  }
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  followUser,
};
