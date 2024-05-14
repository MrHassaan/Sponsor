import validator from 'validator';

const loginvalidation = (values) => {
    let errors = {}

    if (validator.isEmpty(validator.trim(values.email))) {
        errors.email = "*Email is missing.";
    } else if(!validator.isEmail(values.email)) {
        errors.email = "*Email is not valid."
    }
    if (validator.isEmpty(validator.trim(values.password))) {
        errors.password = "*Password is missing.";
    } 
    return errors; 
}

const adminloginvalidation = (values) => {
    let errors = {}

    if (validator.isEmpty(validator.trim(values.email))) {
        errors.email = "*Email is missing.";
    } else if(!validator.isEmail(values.email)) {
        errors.email = "*Email is not valid."
    }
    if (validator.isEmpty(validator.trim(values.password))) {
        errors.password = "*Password is missing.";
    } 
    return errors; 
}

const signupvalidation = (values) => {
    let errors = {}
    
    if(validator.isEmpty(validator.trim(values.fname))) {
        errors.fname = "*Full Name is missing.";
    } else {
        if(!validator.isLength(validator.trim(values.fname), { min: 3 })){
            errors.fname = "*Full Name must contain at least 10 characters.";
        } else if (!validator.isLength(validator.trim(values.fname), { max: 30 })) {
            errors.fname = "*Full Name must be less than 30 characters.";
        } else if (!validator.isAlpha(validator.trim(values.fname), 'en-US', { ignore: ' ' })) {
            errors.fname = "*Full Name cannot contain numbers or special characters.";
        }  else if (!validator.isAlpha(validator.trim(values.fname), 'en-US', { ignore: ' ' })) {
            errors.fname = "*Full Name cannot contain numbers or special characters.";
        }
    }
    if (validator.isEmpty(validator.trim(values.email))) {
        errors.email = "*Email is missing.";
    } else if(!validator.isEmail(validator.trim(values.email))) {
        errors.email = "*Email is not valid."
    }
    if (validator.isEmpty(validator.trim(values.password))) {
        errors.password = "*Password is missing.";
    } else if (!validator.isLength(validator.trim(values.password), { min: 6})) {
        errors.password = "*Password must contain at least 6 characters.";
    } else if (!validator.isLength(validator.trim(values.password), { max: 50})) {
        errors.password = "*Password must be less than 50.";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(values.password)) {
        errors.password = "*Password must contain at least one special character.";
    }

    if (validator.isEmpty(values.usertype)) {
        errors.usertype = "*Please select an option."
    }
    
    return errors; 
}


const isValidImage = (fileOrString) => {
    if (typeof fileOrString === 'string') {
        // Check if the string is a valid URL
        const urlPattern = /\.(jpeg|jpg|png)$/i;
        return urlPattern.test(fileOrString);
    } else if (fileOrString instanceof File) {
        // Check if the file is a valid image type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return allowedTypes.includes(fileOrString.type);
    }
    return false; // Return false for other types or invalid inputs
};


const createeventvalidation = (values) => {
    let errors = {}
   
    if(validator.isEmpty(validator.trim(values.title))) {
        errors.title = "*Event name is required.";
    } else if (!validator.isLength(validator.trim(values.title), { max: 30 })) {
        errors.title = "*Event title must be at most 30 characters long.";
    } 

    if (validator.isEmpty(validator.trim(values.eventdesc))) {
        errors.eventdesc = "*Event description is required.";
    } else if (!validator.isLength(validator.trim(values.eventdesc), { max: 250 })) {
        errors.eventdesc = "*Event description must be at most 150 characters long.";
    }

    if (validator.isEmpty(validator.trim(values.location))) {
        errors.location = "*Location is required.";
    } else if (!validator.isLength(validator.trim(values.location), { max: 30 })) {
        errors.location = "*Event location must be at most 30 characters long.";
    }

    if (values.eventlogo===null) {
        errors.eventlogo = "*Logo is required.";
    } else if (!isValidImage(values.eventlogo)) {
         errors.eventlogo = "*Only jpg, jpeg and png are allowed.";
    }
    
    if (validator.isEmpty(values.eventtype)) {
        errors.eventtype = "*Please select an option."
    }

    if (validator.isEmpty(values.startdate)) {
        errors.startdate = "*Start Date is required."
    } else if (new Date(values.startdate) < new Date()) {
        errors.startdate = "*Start Date cannot be in the past.";
    }

    if (validator.isEmpty(values.enddate)) {
        errors.enddate = "*End Date is required."
    } else if (new Date(values.enddate) < new Date()) {
        errors.enddate = "*End Date cannot be in the past.";
    }
    
    if (!errors.startdate && !errors.enddate && new Date(values.startdate) > new Date(values.enddate)) {
        errors.enddate = "*End Date must be after Start Date.";
    }

    if (values.numPackages === 0) {
        errors.numPackages= "*Please select an option."
    }
    
    for (let i = 0; i < values.numPackages; i++) {  
        if (validator.isEmpty(values.packages[i].amount)) {
            errors.packages = errors.packages || [];
            errors.packages[i] = { ...errors.packages[i], amount: `*Amount for Package ${i + 1} is required.` };
        } 
     
        if (validator.isEmpty(values.packages[i].desc)) {
            errors.packages = errors.packages || [];
            errors.packages[i] = { ...errors.packages[i], desc: `*Description for Package ${i + 1} is required.` };}
        // } else if (validator.isLength(validator.trim(values.packages[i].desc), { max: 100 })) {
        //     errors.packages[i] = { ...errors.packages[i], desc: `*Description for Package ${i + 1} must be at most 100 characters long.`};
        // }
    }

    return errors; 
}

const editeventvalidation = (values) => {
    let errors = {}
   
    if(validator.isEmpty(validator.trim(values.title))) {
        errors.title = "*Event name is required.";
    } 
    if (validator.isEmpty(validator.trim(values.eventdesc))) {
        errors.eventdesc = "*Event description is required.";
    } 
    if (validator.isEmpty(validator.trim(values.location))) {
        errors.location = "*Location is required.";
    }
    if (values.eventlogo===null) {
        errors.eventlogo = "*Logo is required.";
    } else if (!isValidImage(values.eventlogo)) {
         errors.eventlogo = "*Only jpg, jpeg and png are allowed.";
    }

    if (validator.isEmpty(values.eventtype)) {
        errors.eventtype = "*Please select an option."
    }

    if (validator.isEmpty(values.startdate)) {
        errors.startdate = "*Start Date is required."
    } else if (new Date(values.startdate) < new Date()) {
        errors.startdate = "*Start Date cannot be in the past.";
    }

    if (validator.isEmpty(values.enddate)) {
        errors.enddate = "*End Date is required."
    } else if (new Date(values.enddate) < new Date()) {
        errors.enddate = "*End Date cannot be in the past.";
    }
    
    if (!errors.startdate && !errors.enddate && new Date(values.startdate) > new Date(values.enddate)) {
        errors.enddate = "*End Date must be after Start Date.";
    }

    if (values.numPackages === 0) {
        errors.numPackages= "*Please select an option."
    }
    
    for (let i = 0; i < values.numPackages; i++) {  
        if (validator.isEmpty(values.packages[i].amount)) {
            errors.packages = errors.packages || [];
            errors.packages[i] = { ...errors.packages[i], amount: `*Amount for Package ${i + 1} is required.` };
        } 
     
        if (validator.isEmpty(values.packages[i].desc)) {
            errors.packages = errors.packages || [];
            errors.packages[i] = { ...errors.packages[i], desc: `*Description for Package ${i + 1} is required.` };
        } 
    }

    return errors; 
}

const proposalvalidation = (values) => {
    let errors = {}
   
    if(validator.isEmpty(validator.trim(values.proposalName))) {
        errors.proposalName = "*Proposal name is required.";
    } else if (!validator.isLength(validator.trim(values.proposalName), { max: 20 })) {
        errors.proposalName = "*Proposal name must be at most 20 characters long.";
    } 

    if (validator.isEmpty(validator.trim(values.proposalText))) {
        errors.proposalText = "*Proposal is required.";
    } 

    return errors; 
}

const uservalidation = (values) => {
    let errors = {}
    if(validator.isEmpty(validator.trim(values.fname))) {
        errors.fname = "*Full Name is missing.";
    } else {
        if(!validator.isLength(validator.trim(values.fname), { min: 10 })){
            errors.fname = "*Full Name must contain at least than 10 characters.";
        } else if (!validator.isLength(validator.trim(values.fname), { max: 30 })) {
            errors.fname = "*Full Name must be less than 30 characters.";
        } else if (!validator.isAlpha(validator.trim(values.fname), 'en-US', { ignore: ' ' })) {
            errors.fname = "*Full Name cannot contain numbers or special characters.";
        }
    }
    if (validator.isEmpty(validator.trim(values.email))) {
        errors.email = "*Email is missing.";
    } else if(!validator.isEmail(validator.trim(values.email))) {
        errors.email = "*Email is not valid."
    }
    return errors;
}

const passwordvalidation = (password) => {
    let errors = {}
    if (validator.isEmpty(validator.trim(password))) {
        errors.password = "*Password is missing.";
    } else if (!validator.isLength(validator.trim(password), { min: 6})) {
        errors.password = "*Password must contain at least 6 characters.";
    } else if (!validator.isLength(validator.trim(password), { max: 50})) {
        errors.password = "*Password must be less than 50.";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        errors.password = "*Password must contain at least one special character.";
    }
    return errors;
}

const contactvalidation = (values) => {
    let errors = {}
    if(validator.isEmpty(validator.trim(values.fname))) {
        errors.fname = "*Full Name is missing.";
    } else {
        if(!validator.isLength(validator.trim(values.fname), { min: 10 })){
            errors.fname = "*Name must contain at least than 10 characters.";
        } else if (!validator.isLength(validator.trim(values.fname), { max: 30 })) {
            errors.fname = "*Name must be less than 30 characters.";
        } else if (!validator.isAlpha(validator.trim(values.fname), 'en-US', { ignore: ' ' })) {
            errors.fname = "*Name cannot contain numbers or special characters.";
        }
    }
    if (validator.isEmpty(validator.trim(values.email))) {
        errors.email = "*Email is missing.";
    } else if(!validator.isEmail(validator.trim(values.email))) {
        errors.email = "*Email is not valid."
    }

    if (validator.isEmpty(validator.trim(values.subject))) {
        errors.subject = "*Subject is missing.";
    }
    
    if (validator.isEmpty(validator.trim(values.message))) {
        errors.message = "*Message is missing.";
    } else if (!validator.isLength(validator.trim(values.message), { max: 100 })) {
        errors.message = "*Name must be less than 100 characters.";
    } 
    
    
    return errors;
}


export { loginvalidation,adminloginvalidation, signupvalidation, createeventvalidation, editeventvalidation,proposalvalidation,uservalidation,passwordvalidation,contactvalidation};
