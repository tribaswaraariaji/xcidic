const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const {generateToken} = require('../verifyJWT');

class userController {
    static getAllUser(req,res,next){
        User.find({}).then((data)=> {
            res.status(200).json({message:"Data ditemukan!",data})
        })
    }

    static async createUser (req,res,next){
        const {username,password,role,name,nip} = req.body;
        if(await User.exists({username})){
            res.status(400).json({
                message: "Username telah terdaftar!",
                status:400
            });
        }else{
        await User.create({
           username,
           password,
           role,
           name,
           nip
        }).then((data) => {
            return res.status(200).json({message: "Berhasil menambahkan data!", data})
        }).catch(err => res.status(400).json('Error : ' + err))
    }
    }

    static async login(req,res,next){
        const {username,password} = req.body;
        if (username){
            User.findOne({username})
                .then((user) => {
                    if(!user){
                        res.json({status:400,message:"Username Tidak Terdaftar!"})
                    }
                    else if(bcrypt.compareSync(password, user.password)){
                    const token = generateToken({id: user.id, user: user.username, iat: Date.now()})
                    res.json({status:200,message:"Login berhasil!",user,token:token})
                    }else{
                        res.json({status:400, message:"Password Salah!"})
                    }
                })
        }else{
            res.json({status:400,message:"Username & Password Tidak Boleh Kosong!"})
        }
    }
}

module.exports = userController;