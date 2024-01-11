import User from "./models/UserSchema.js";
import bcrypt from "bcrypt"

export const resolvers = {
  Query: {
    welcome: () => {
      return "Welcome to Authentication";
    },
    getUsers: async () => {
      const All_User = await User.find({});
      return All_User;
    },
    getUser: async (root, args) => {
      console.log(args.id);
      try {
        const find = await User.findById(args.id);
        return find;
      } catch (error) {
        console.log(error);
      }
    },
  },
 
Mutation: {
  addUser: async (root, args) => {
    try {
      const { name, email, password } = args;
      console.log(name);
      console.log("data aara ha yahan tak");

      const emailExist = await User.findOne({ email });

      if (emailExist) {
        return "User_exist";
      } else {

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });

        await newUser.save();
        console.log(newUser);
        return newUser;
      }
    } catch (error) {
      console.error(error);
    }
  },
  SignUser: async (root, args) => {
    const { email, password } = args;
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (user) {

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          return user;
        } else {
          return "Invalid password";
        }
      } else {
        return "User not found";
      }
    } catch (error) {
      console.log(error);
    }
  }
},
};
