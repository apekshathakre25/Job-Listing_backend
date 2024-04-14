const Job = require("../models/job");
const createJobPost = async (req, res) => {
  console.log(req.body);
  try {
    const {
      companyName,
      title,
      logoUrl,
      description,
      salary,
      location,
      locationType,
      duration,
      skills,
    } = req.body;

    // if (
    //   !companyName ||
    //   !title ||
    //   !logoUrl ||
    //   !description ||
    //   !salary ||
    //   !location ||
    //   !locationType ||
    //   !duration ||
    //   !skills
    // ) {
    //   return res.status(401).json({ errorMessage: "all feild are required" });
    // }

    const jobDetails = new Job({
      companyName,
      title,
      logoUrl,
      description,
      salary,
      location,
      locationType,
      duration,
      skills,
    });
    console.log("jobdetails", jobDetails);

    await jobDetails.save();
    res.status(200).json({ message: "Job created successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getJobById = async (req, res) => {
  const jobId = req.params.jobId;
  if (!jobId) {
    return res.status(400).json({
      errorMessage: "Bad Request",
    });
  }
  const jobDetails = await Job.findById(jobId);
  return res.send(jobDetails);
};

const updateJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const {
      companyName,
      title,
      logoUrl,
      description,
      salary,
      location,
      locationType,
      duration,
      skills,
    } = req.body;

    if (
      !companyName ||
      !title ||
      !logoUrl ||
      !description ||
      !salary ||
      !location ||
      !locationType ||
      !duration ||
      !skills
    ) {
      return res.status(400).json({ errorMessage: "All fields are required" });
    }

    // Update job details
    await Job.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          title,
          logoUrl,
          description,
          salary,
          location,
          locationType,
          duration,
          skills,
        },
      }
    );

    res.json({ message: "Job details updated successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const title = req.query.title || "";
    const skills = req.query.skills;

    let formattedSkills;
    if (skills) {
      formattedSkills = skills.split(",");
    }

    const jobList = await Job.find(
      {
        title: { $regex: title, $options: "i" },
        skills: { $in: formattedSkills },
      },
      {
        companyName: 1,
        title: 1,
        salary: 1,
        logoUrl: 1,
        location: 1,
        skills: 1,
      }
    );
    res.json({ data: jobList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createJobPost,
  getJobById,
  updateJobById,
  getAllJobs,
};
