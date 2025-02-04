var router = require('express').Router();
var auth = require('./../../auth')
var list_product = require('./../../../controller/list_product')

router.get('/',auth.required, async function(req, res, next) {
  console.log(!(req.payload.exp - req.payload.iat))
  if ((req.payload.exp - req.payload.iat) < 0){
    return res.status(401).json({errors: {message: "Token is expired."}});
  }
  if (
    req.query.limit === "" || req.query.limit === null || req.query.limit === undefined ||
    req.query.offset === "" || req.query.offset === null || req.query.offset === undefined
  ){
    return res.status(400).json({
      timestamp: new Date(),
      status: 400,
      error:"missing limit or offset.",
      length: 0,
      payload: "",
      path:req.originalUrl
    })
  }

  try {
    const data = await list_product(
      req.query.size,
      req.query.catagory,
      req.query.gender,
      req.query.limit,
      req.query.offset
    )
    return res.status(200).json({
      timestamp: new Date(),
      status: 200,
      length: data.length[0].LENGTH,
      payload: data.result,
      path:req.originalUrl
    })
  } catch (e) {
    return res.status(500).json({
      timestamp: new Date(),
      status: 500,
      error:"Internal Server Error",
      length: 0,
      payload: e,
      path:req.originalUrl
    })
  }
})

module.exports = router;