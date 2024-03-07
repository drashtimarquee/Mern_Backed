const bcrypt = require("bcryptjs")

exports.hashpassword = async(password) =>{
try {
    const round=10;
    const hashpassword = await bcrypt.hash(password,round);
    return hashpassword;

} catch (error) {
    console.log(error)
}
    
}

exports.compare = async(password,hashingpassword)=>{
    return bcrypt.compare(password,hashingpassword);
}
