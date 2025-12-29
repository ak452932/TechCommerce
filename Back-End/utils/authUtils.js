const jwt=require("jsonwebtoken");
const jwt_Secret="helloakhilesh";

function generatejwttoken(userId)
{
    return jwt.sign({userId},jwt_Secret,{expiresIn: "1h"});
}

module.exports={generatejwttoken};