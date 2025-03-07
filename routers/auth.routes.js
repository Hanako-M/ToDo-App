const {Router} = require("express")
const router = Router()
const controller = require("../controllers/auth.cont.js")

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.get("/signout", controller.signOut);

module.exports = router;