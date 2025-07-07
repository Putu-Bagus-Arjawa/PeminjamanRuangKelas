const otorisasiAdmin =  (req, res, next)=>{
    if(req.user.role !== 'ADMIN') return res.status(403).json({message:"Anda tidak punya akses"})
    next()
}

export default otorisasiAdmin