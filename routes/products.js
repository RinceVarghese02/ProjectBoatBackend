const express = require('express');
const {ProductDetail,categoriesandimages,} = require('../models/productdetails'); // Import the model
const router = express.Router();

// Route to create a new product
router.post('/productdetails', (req, res) => {
    try {
        const {tags,image,playback,rating,name,salePrice,offerPrice,discount,colorAvailableCount,} = req.body;

        // Create a new product
        const newProduct = new ProductDetail({
            tags,
            image,
            playback,
            rating,
            name,
            salePrice,
            offerPrice,
            discount,
            colorAvailableCount,
        });

        // Save the product to the database
        const savedProduct = newProduct.save().then(()=>{
 res.status(201).json({
            success: true,
            message: 'Product created successfully!',
            product: savedProduct,
        });
        })
        .catch((err)=>{
            res.status(201).json({
                success: false,
                message: 'error',
                error:err
                // product: savedProduct,
            });
        })

       
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create the product.',
            error: error.message,
        });
    }
});

router.post('/categoriesdetails',function(req,res){
    try{
    // console.log(req.body.image)
    const {image,name}=req.body;
    const newcategories=new categoriesandimages({
        image,
        name,
    })
    const savednewcategories=newcategories.save()
    .then(()=>{
        res.status(201).json({
                   success: true,
                   message: 'category created successfully!',
                   product: savednewcategories,
               });
               })
               .catch((err)=>{
                   res.status(201).json({
                       success: false,
                       message: 'error',
                       error:err
                       // product: savedProduct,
                   });
               })
}catch (error) {
    res.status(500).json({
        success: false,
        message: 'Failed to create the category.',
        error: error.message,
    });
}
})


router.get('/allproductdata',function(req,res){
    const alldata=ProductDetail.find()
    .then((data)=>{
        res.send({message:'Products retrieved successfully!', success:true, allproduct:data })
    })
    .catch((err)=>{
        res.send({message:'Products retrieved unsuccessfully!', success:false })
    })
})
router.get('/allcategoriesdata',function(req,res){
    const allcategoriesdata=categoriesandimages.find()
    .then((data)=>{
        res.send({message:'Categories retrieved successfully!', success:true, allcategories:data })
    })
    .catch((err)=>{
        res.send({message:'Categories retrieved unsuccessfully!', success:false })
    })
})

router.get('/deleteproduct/:id',function(req,res){
    const id=req.params.id;
    // console.log(id)
    ProductDetail.findByIdAndDelete(id)
    .then(()=>{
        res.send({message:'product id deleted',idDeleted:true,})
        console.log('product id deleted')
    })
    .catch((err)=>{
        res.send({message:'product id not deleted',idDeleted:false,})
        console.log('product id could not be deleted')
    })
})

router.get('/deletecategory/:id',function(req,res){
    const id=req.params.id;
    // console.log(id)
    categoriesandimages.findByIdAndDelete(id)
    .then(()=>{
        res.send({message:'category id deleted',idDeleted:true,})
        // console.log('id deleted')
    })
    .catch((err)=>{
        res.send({message:'category id not deleted',idDeleted:false,})
        console.log('category id could not be deleted')
    })
})

router.post('/getonecategory',function(req,res){
    const id=req.body.id;
    // console.log(id)
    categoriesandimages.findById(id)
    .then((data)=>{
        res.send({message:'id found',success:true,data:data})
    })
    .catch((err)=>{
        res.send({message:'id not found',success:false,err:err})
    })
})

router.post('/editcategory',function(req,res){
    const {_id,image,name}=req.body;
    // console.log(image,name,_id)
    categoriesandimages.findByIdAndUpdate(_id,{image,name})
    .then(()=>{
        res.send({message:'id updated',success:true})
    })
    .catch((err)=>{
        res.send({message:'id not updated',success:false})
    })
})



module.exports = router;
