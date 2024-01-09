import mongoose from 'mongoose';

const jobsSchema = new mongoose.Schema({
    approvied:{
        type: Boolean,
        default: false
    },
    phoneNumber:{
        type:String,
    },
    jobLocation:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    cityOfJob:{
        type:String,
    },
    requiredSkillsForJob:{
        type: Array,
    },
    kindOfWorkerNeeded: {
        type: Array,
    },
    possibleToWorkFromLongDistance:{
        type:[],
    },
    educationLevelNeededForJob:{
        type:String,
    },
    amoundOfPeopleToGetHire:{
        type:String,
    },
    languagesNeededForJob:{
        type: Array,
    },
    genderOFApplier:{
        type:String,
    },
    SingleOrMerried:{
        type:String,
    },
    jobDesc:{
        type:String,
        required:true
    },
    nameOfJobPoster:{
        type:String,
    },
    contactNumberOfJobPoster:{
        type:String,
    }
})

const jobModel = mongoose.model('jobs',jobsSchema);
export default jobModel
