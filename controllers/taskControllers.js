const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Task = require('../models/taskModels');

class taskController {
    static async createTask (req,res,next){
        const userid = req.decoded.id;
        const {task,note} = req.body;
        if(task){
        await Task.create({
            user:userid,
            task,
            note
        }).then((data) => {
            res.status(200).json({message:"Berhasil menambahkan Task!",data});
        }).catch(next)
    }else{
        res.status(400).json({message:"Task & Note tidak boleh kosong!"});
    }
    }

    // static async createBroadcast (req,res,error){
    //     const {task,note} = req.body;
    //     User.find({role:"employee"})
    //     .then((userData) => {
    //     // console.log(userData._id)
    //     userData.forEach((element,index) => {
    //         let _id = element._id;
    //         console.log(_id)
    //         Task.insertMany({
    //             user:_id,
    //             task,
    //             note
    //         }).then((data) => {
    //             res.status(200).json({message: "Berhasil buat broadcast!"});
    //         }).catch(error, 'Error is : '+error);
    //     })
    // }).catch(error, 'Error is : '+error);
    // }

    static async readAllTask (req,res,next){
        Task.find({}).then((data) => {
            res.status(200).json({message:"Data ditemukan!",data})
        })
    }

    static async readTask (req,res,next){
        const userid = req.decoded.id;
        
        Task.find({user:userid})
            .then((data) => {
                res.status(200).json({message:"Berhasil menemukan data!",data});
            }).catch(next)
    }

    static async editTask (req,res,next){
        const userid = req.decoded.id
        const {id,task} = req.body
        
        Task.findByIdAndUpdate({_id: id},{task},{omitUndefined: true,new:true})
            .then((data) => {
                if(data.user != userid){
                    return res.status(400).json({message:"Task tidak ditemukan di akun anda!"});
                }else{
                return res.status(200).json({message:"Update Task berhasil!", data});
                }
            }).catch(next)
    }

    static async deleteTask (req,res,next){
        const userid = req.decoded.id
        const {id} = req.body

        Task.findByIdAndDelete({_id:id})
            .then((data) => {
                if(data.user != userid){
                    return res.status(400).json({message:"Task tidak ditemukan di akun anda!"});
                }else{
                return res.status(200).json({message:"Hapus Task berhasil!"});
                }
            })
    }
}

module.exports = taskController