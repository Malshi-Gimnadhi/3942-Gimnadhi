const express =require('express');

const router =express.Router();
const ArtController =require('../controllers/art')

const verifyToken=require('../middlewears/verifyToken')

router.post('/',ArtController.create)
router.put('/:id', ArtController.update)
router.delete('/:id', ArtController.delete)
router.get('/all', ArtController.getAll)
router.get('/:id', ArtController.getOne)
router.get('searchResults',ArtController.search)




module.exports =router;
