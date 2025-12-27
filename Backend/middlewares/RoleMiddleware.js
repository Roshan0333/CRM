export const isManager = (req, res, next) => {
  if (req.user.role.toLowerCase() !== "manager") {
    return res.status(403).json({ message: "Manager access only" });
  }
  next();
};

export const isTL = (req, res, next) => {
  if (req.user.role.toLowerCase() !== "tl") {
    return res.status(403).json({ message: "Team Leader access only" });
  }
  next();
};

export const isEmployee = (req, res, next) => {
  if (req.user.role.toLowerCase() !== "employee") {
    return res.status(403).json({ message: "Employee access only" });
  }
  next();
};
