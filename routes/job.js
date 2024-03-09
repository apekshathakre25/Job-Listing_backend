const express = require("express");
const router = express.Router();
const { createJobPost } = require("../controller/job");
const { getJobById } = require("../controller/job");
const { updateJobById } = require("../controller/job");
const { getAllJobs } = require("../controller/job");
const jwtVerify = require("../middleWare/authMiddleWare");

router.post("/create", jwtVerify, createJobPost);
router.get("/details/:jobId", getJobById);
router.put("/edit/:jobId", jwtVerify, updateJobById);
router.get("/all-jobs", getAllJobs);
module.exports = router;
