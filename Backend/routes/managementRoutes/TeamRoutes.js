const express = require("express");
const router = express.Router();

const TeamHierarchy = require("../models/TeamHierarchy");
const { isAuth } = require("../middlewares/authMiddleware");
const { isManager, isTL } = require("../middlewares/roleMiddleware");



//  MANAGER  CAN CREATE / UPDATE TEAM

router.post("/", isAuth, isManager, async (req, res) => {
    try {
      const { teamLeader, employees } = req.body;

      // check if team already exists for TL
      let team = await TeamHierarchy.findOne({ teamLeader });

      if (team) {
        // update employees
        team.employees = employees;
        await team.save();
        return res.json({ message: "Team updated", team });
      }

      // create new team
      team = await TeamHierarchy.create({
        manager: req.user._id,
        teamLeader,
        employees
      });

      res.status(201).json({ message: "Team created", team });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);




//  TL  who can get own team 

router.get( "/my-team", isAuth, isTL, async (req, res) => {
    try {
      const team = await TeamHierarchy
        .findOne({ teamLeader: req.user._id })
        .populate("employees", "name email role");

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);




// manager who can see all teams

router.get( "/", isAuth, isManager, async (req, res) => {
    try {
      const teams = await TeamHierarchy
        .find({ manager: req.user._id })
        .populate("teamLeader", "name email")
        .populate("employees", "name email");

      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
