import project from "../../models/managementSchema/ProjectSchema"
import project from "../../models/managementSchema/ProjectSchema"
import project from "../../models/managementSchema/ProjectSchema"




export const createProject = async (req, res) => {
    try {
        const { clientName, contact, designation, email, startDate, endDate, serviceName, totalAmount } = req.body

        if (!clientName || 
            !contact || 
            !designation || 
            !email || 
            !startDate || 
            !endDate || 
            !serviceName || 
            !totalAmount) 
            {
            return res.status(422).json({ msg: "please fill all the fields" })
        }
        const Project = new project({
            clientName,
            contact,
            designation,
            email,
            startDate,
            endDate,
            serviceName,
            totalAmount
        })
        await Project.save()
        return res.status(201).json({ msg: "project created successfully" })

    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ msg: "Server error" });
    }
}

export const markComplete = async (req, res) => {
    try {
        const { id } = req.params

        const project = await project.findByIdAndUpdate(
            id,
            { status: "completed" },
            { new: true }
        )

        if (!project) {
            return res.status(404).json({ msg: "project not found" })
        }

        return res.status(200).json({
            msg: "project marked as completed",
            project
        })

    } catch (error) {
        console.log("Error", error)
        return res.status(400).json({ msg: "server error" })
    }
}

export const completedProjects = async (req, res) => {
    try {
        const completedProject = await project.find({ status: "completed" })

        if (completedProject.lenght === 0) {
            return res.status(404).json({ msg: "No completed projects found" })
        }
        return res.status(200).json({ count: completedProject.lenght, completedProjects });

    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ msg: "server error" })
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { deadline, assignedTo } = req.body

        if (!deadline && !assignedTo) {
            return res.status(422).json({ msg: "Nothing to update" })
        }

        if (deadline && new Date(deadline) < new Date()) {
            return res.status(400).json({
                msg: "Deadline must be a future date"
            });
        }

        const update = {};
        if(assignedTo) update.assignedTo = assignedTo;
        if(deadline) update.deadline = deadline;

        const Project = await project.findByIdAndUpdate(
            id,
            update,
            {new : true}
        ).populate("assingedTo")

        if(!Project){
            return res.status(404).json({msg:"project not found"})
        }

        return res.status(200).json({
            msg:"project updated",
            Project
        })


    } catch (error) {
        console.log("Error", error)
        return res.status(400).json({ msg: "server error" })
    }
}