export const isManager = (req, res, next) => {
  try {
    if (!req.user) {
      console.log("user", req.user);
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const role = req.user.role?.toLowerCase().trim();

    if (!role || (!role.includes("manager"))) {
      return res.status(403).json({ message: "Manager access only" });
    }

    next();
  } catch (error) {
    console.log("role error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const isTL = (req, res, next) => {
  if (!req.user || req.user.role?.toLowerCase().trim() !== "team leader") {
    return res.status(403).json({ message: "Team Leader access only" });
  }
  next();
};

export const isEmployee = (req, res, next) => {
  const role = req.user?.role?.toLowerCase().trim();

  if (!role || (role !== "employee" && role !== "feedback employee")) {
    return res.status(403).json({ message: "Employee access only" });
  }
  next();
};
