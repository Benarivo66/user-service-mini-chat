const jwt = require("jsonwebtoken");
const { hash, verify } = require("./helper/auth");
const { create, getByEmail } = require("./service");

let isSignup = false;
let isLogin = false;
let socketObject = { isSignup, isLogin, email: "" }

const tokenKey = process.env.TOKEN_KEY;

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await getByEmail(email);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password);
    user = await create({ email, password: hashedPassword });

    const token = jwt.sign({ email, id: user._id }, tokenKey, {
      expiresIn: "3h",
    });

    user.token = token;
    socketObject.isSignup = true;
    socketObject.email = user.email;
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await getByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isVerified = await verify(password, user.password);

    if (!isVerified) {
      return res.status(403).json({ message: "enter a valid password" });
    }

    const token = jwt.sign({ email, id: user._id }, tokenKey, {
      expiresIn: "3h",
    });

    user.token = token;
    socketObject.isLogin = true;
    socketObject.email = user.email;
    res.status(200).json({ message: "Login successful", data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  signup,
  login,
  socketObject,
};
