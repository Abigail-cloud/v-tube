import bcrypt from 'bcrypt';
import config from "config"


const encryptPassword = (plainPassword: string)=>{
    const salt_rounds = config.get<number>('saltWorkToken');
   const salt= bcrypt.genSaltSync(salt_rounds);
   const hashEncrypt = bcrypt.hashSync(plainPassword, salt);
   return hashEncrypt;
}

const comparePassword = (plainPassword: string, hashedPassword: string)=>{
    const match = bcrypt.compareSync(plainPassword, hashedPassword)
    return match;
}




export  {
    encryptPassword,
    comparePassword
}