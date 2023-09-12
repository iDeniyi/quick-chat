const { connect } = require("getstream");
const StreamChat = require("stream-chat").StreamChat;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);
        const { users } = await client.queryUsers({ name: username });

        if (!users) return res.status(400).json({ message: "user not found" });

        const success = await bcrypt.compare(password, users[0].hashedPassword);
        const token = serverClient.createUserToken(users[0].id);

        if (success) {
            res.status(200).json({
                token,
                fulllName: users[0].fulllName,
                username,
                userId: users[0].id,
            });
        } else {
            res.status(500).json({ message: "Incorrect Password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

const signup = async (req, res) => {
    try {
        const { fulllName, username, password, phoneNumber } = req.body;
        const userId = crypto.randomBytes(16).toString("hex");
        const serverClient = connect(api_key, api_secret, app_id);
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createUserToken(userId);

        res.status(200).json({
            token,
            fulllName,
            username,
            userId,
            hashedPassword,
            phoneNumber,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

module.exports = { signup, login };
