const {Router} = require("express")
const controller = require("../controllers/auth.cont.js")
const router = Router()
router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.post("/signout", controller.signOut);

module.exports = router;