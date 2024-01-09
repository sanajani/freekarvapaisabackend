import jobModel from "../models/jobs.model.js"
import CustomError from "../utils/CustomError.js"

export const createJob = async (req,res,next) => {
    const {
        phoneNumber,
        jobLocation,
        jobTitle,
        cityOfJob,
        requiredSkillsForJob,
        kindOfWorkerNeeded,
        possibleToWorkFromLongDistance,
        educationLevelNeededForJob,
        amoundOfPeopleToGetHire,
        languagesNeededForJob,
        genderOFApplier,
        SingleOrMerried,
        jobDesc,
        nameOfJobPoster,
        contactNumberOfJobPoster,
    } = req.body
    try {
        const createAJob = jobModel({
            phoneNumber,
            jobLocation,
            jobTitle,
            cityOfJob,
            requiredSkillsForJob,
            kindOfWorkerNeeded,
            possibleToWorkFromLongDistance,
            educationLevelNeededForJob,
            amoundOfPeopleToGetHire,
            languagesNeededForJob,
            genderOFApplier,
            SingleOrMerried,
            jobDesc,
            nameOfJobPoster,
            contactNumberOfJobPoster
        })
        const newJob = await createAJob.save();
        
        return res.status(200).json({message:"Job created Successfully", success: true, data:newJob})
    } catch (error) {
        next(new CustomError(error.message,error.statusCode))       
    }
}

export const getAllJobs = async (req,res,next) => {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6
    const jobTitle = req.query.job;
    const cityOfJob = req.query.province 
    try {
        let query = {}
        if(jobTitle && cityOfJob){
            query = {jobTitle:new RegExp(`^${jobTitle}`) ,cityOfJob}
        }else if(jobTitle){
            query = { jobTitle: new RegExp(`^${jobTitle}`) };
        }else if(cityOfJob){
            query = {cityOfJob}
        }else{
            query = {}
        }
        const allJobs = await jobModel.find(query).skip((page - 1) * limit).exec();
        const count = await jobModel.countDocuments(query)
        const totalPages = Math.floor((count + limit - 1) / limit);

        return res.status(200).json({message:"Job created Successfully",totalPages, success: true, data:allJobs})
    } catch (error) {
        next(new CustomError(error.message,error.statusCode))
    }
}

export const getJobByIdAndDelete = async (req,res,next) => {
    const id = req.params.id
    try {
        const deletedJob = await jobModel.findByIdAndDelete(id)
        if(!deletedJob)return res.status(500).json({message:"Something went wrong please try again", success: false})
        return res.status(200).json({message:"Job deleted Successfully", success: true})
    } catch (error) {
        next(new CustomError(error.message, error.statusCode))
    }
}

export const getSingleJobAndShowToUser = async (req,res,next) => {
    const id = req.params.id
    try {
        const singleJobToShow = await jobModel.findOne({_id:id});
        if(!singleJobToShow) return res.status(500).json({message:"Something went wrong",success:false})
        return res.status(200).json({message:"Job Sended to user", success: true, data:singleJobToShow})
    } catch (error) {
        next(new CustomError(error.message,error.statusCode))
    }
}
