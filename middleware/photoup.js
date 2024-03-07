const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null,"./uploads/Decor/Crystel")
        // cb(null,"./uploads/Decor/Candlestand")
        // cb(null,"./uploads/Decor/Decorplates")
        // cb(null,"./uploads/Decor/Decorstorage")
        // cb(null,"./uploads/Decor/Fineporcelain")
        // cb(null,"./uploads/Decor/Flowerarrang")
        // cb(null,"./uploads/Decor/Gingerjar")
        // cb(null,"./uploads/Decor/Photofram")
        // cb(null,"./uploads/Decor/Planter")
        // cb(null,"./uploads/Decor/Tabletopdecor")
        //  cb(null,"./uploads/Decor/Clock")
        // cb(null,"./uploads/Decor/Animal")
        // cb(null,"./uploads/Decor/Castiron")
        cb(null, "./uploads/Decor/Incenseholder")
        // cb(null,"./uploads/Newarrive/Newdecor")
        // cb(null,"./uploads/Newarrive/Newligting")
        // cb(null,"./uploads/Newarrive/Newkitchne")
        // cb(null,"./uploads/Kitchen/Cakestand")
        // cb(null,"./uploads/Kitchen/Dinnerplates")
        // cb(null,"./uploads/Kitchen/Doubleglass")
        // cb(null,"./uploads/Kitchen/Drinkglass")
        // cb(null,"./uploads/Kitchen/Jar")
        // cb(null,"./uploads/Kitchen/Mug")
        // cb(null,"./uploads/Kitchen/Teaware")
        // cb(null, "./uploads/Light/Bedroomlight")
        // cb(null,"./uploads/Light/Ceilinglight")
        // cb(null,"./uploads/Light/Crystallight")
        // cb(null,"./uploads/Light/Livingroom")
        // cb(null,"./uploads/Light/Tablelamp")
        // cb(null, "./uploads/Light/Bedroomlight")
        // cb(null,"./uploads/Light/Woodlamp")
        // cb(null, "./uploads/Light/Wallsconses")
        // cb(null,"./uploads/Walldecor/Wallplates")
        // cb(null,"./uploads/Walldecor/Olipaint")
        // cb(null,"./uploads/Walldecor/Wallmirror")
        // cb(null,"./uploads/Walldecor/Framedart")
        // cb(null,"./uploads/Walldecor/Wallvases")
        // cb(null,"./uploads/Furniture/Chair")
        // cb(null,"./uploads/Furniture/Tables")
        // cb(null,"./uploads/Furniture/Ottomans")
        // cb(null,"./uploads/Bathdecor/Bathset")
        // cb(null,"./uploads/Bathdecor/Basin")
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`)
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false)
        cb(new Error("images allowed only"))
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filefilter
})

module.exports = upload