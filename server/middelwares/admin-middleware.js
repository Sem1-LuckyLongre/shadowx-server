const adminMiddleware = async (req, res, next) => {
  try {
    // console.log(req.user);
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      res.status(403).json({ message: "Access Denied. User is Not Admin" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = adminMiddleware;
