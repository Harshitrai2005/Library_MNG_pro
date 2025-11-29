export const sendToken = (user, statusCode, message, res) => {
    const token = user.generateToken();

    res
    .status(statusCode)
    .cookie("token", token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,      // ensures cookie works on HTTPS
        sameSite: "None",  // allows cross-origin cookie (Vercel frontend → Render backend)
    })
    .json({
        success: true,
        user,
        message,
        token,
    });
};
