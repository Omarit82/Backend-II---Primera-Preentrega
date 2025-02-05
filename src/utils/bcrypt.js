import {hashSync,compareSync,genSaltSync} from 'bcrypt';

export const encriptar = (password) => {
    return hashSync(password,genSaltSync(5));
}

export const desencriptar = (password, hashedPassword)=>{
    return compareSync(password, hashedPassword)
}