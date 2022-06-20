export const jwtVerify = (req: any, res: any, next: any) => {

    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        status: "warning",
        message: "No token provided!"
      });
    }
    next();

    // jwt.verify(token, config.secret, (err, decoded) => {
    //   if (err) {
    //     return res.status(401).send({
    //       message: "Unauthorized!"
    //     });
    //   }
    //   req.userId = decoded.id;
    //   next();
    // });
};