const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    (req, res, next) => {
        console.log("Entering Google Callback route");
        next();
    },
    passport.authenticate("google", { session: false, failureRedirect: '/login' }),
    (req, res) => {
        console.log("Passport authenticated successfully, user:", req.user.email);
        const token = jwt.sign(
            { id: req.user._id, email: req.user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("Backend redirecting to frontend with token");
        res.redirect(
            `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
        );
    }
);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

