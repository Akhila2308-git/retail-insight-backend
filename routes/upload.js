const express = require('express');
const multer = require('multer');
const { parse } = require('csv-parse');
const fs = require('fs');
const Product = require('../models/productModel');
const Sale = require('../models/Sale');
const Inventory = require('../models/Inventory');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/role');
const router = express.Router();

const upload = multer({ dest: 'tmp/' });

router.post('/sales', auth, role(['manager']), upload.single('file'), async (req,res)=>{
  const records = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({columns:true,trim:true}))
    .on('data', row => records.push(row))
    .on('end', async ()=>{
      for(const r of records){
        const p = await Product.findOne({sku:r.sku});
        await Sale.create({
          product:p?._id, sku:r.sku, quantity:Number(r.quantity),
          price:Number(r.price), date:new Date(r.date||Date.now()), store:r.store
        });
      }
      fs.unlinkSync(req.file.path);
      res.json({msg:'Sales uploaded',count:records.length});
    });
});

router.post('/inventory', auth, role(['manager']), upload.single('file'), async (req,res)=>{
  const records = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({columns:true,trim:true}))
    .on('data', row => records.push(row))
    .on('end', async ()=>{
      for(const r of records){
        let p = await Product.findOne({sku:r.sku});
        if(!p){
          p = await Product.create({sku:r.sku,name:r.name,category:r.category,price:Number(r.price),stock:Number(r.quantity)});
        }else{
          p.stock = Number(r.quantity);
          await p.save();
        }
        await Inventory.findOneAndUpdate({sku:r.sku},{sku:r.sku,product:p._id,quantity:Number(r.quantity),lastUpdated:new Date()},{upsert:true});
      }
      fs.unlinkSync(req.file.path);
      res.json({msg:'Inventory uploaded',count:records.length});
    });
});
module.exports = router;
